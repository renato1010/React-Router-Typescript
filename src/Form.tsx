import React, { ChangeEvent } from "react";

type DefaultValues = {
  name: string;
  email: string;
  reason: string;
  notes: string;
};

export type Values = {
  [K in keyof DefaultValues]: string;
};

type FieldProps = {
  name: string;
  label: string;
  type?: "Text" | "Email" | "Select" | "TextArea";
  options?: string[];
};

type FormProps = { defaultValues: DefaultValues };

type FormState = { values: Values };

type TFormContext = {
  values: Values;
  setValue?: (fieldName: string, value: any) => void;
};

const FormContext = React.createContext<TFormContext>({
  values: { name: "", email: "", notes: "", reason: "Support" }
});

export class Form extends React.Component<FormProps, FormState> {
  state = { values: this.props.defaultValues };
  static Field: React.FC<FieldProps> = props => {
    const { name, label, type, options } = props;
    const handleChange = (
      e:
        | ChangeEvent<HTMLInputElement>
        | ChangeEvent<HTMLTextAreaElement>
        | ChangeEvent<HTMLSelectElement>,
      context: TFormContext
    ): void => {
      if (context.setValue) {
        context.setValue(name, e.currentTarget.value);
      }
    };
    const editorReducer = (
      type: "Text" | "Email" | "Select" | "TextArea",
      ctx: TFormContext
    ): JSX.Element => {
      switch (type) {
        case "Text" || "Email": {
          const fn = type === "Text" ? "name" : "email";
          return (
            <input
              onChange={e => handleChange(e, ctx)}
              type={type.toLowerCase()}
              id={name}
              value={ctx.values[fn]}
            />
          );
        }
        case "TextArea": {
          return (
            <textarea
              id={name}
              value={ctx.values.notes}
              onChange={e => handleChange(e, ctx)}
            />
          );
        }
        case "Select": {
          return (
            <select
              onChange={e => handleChange(e, ctx)}
              value={ctx.values.reason}
            >
              {options &&
                options.map(option => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
            </select>
          );
        }
        default:
          return (
            <input type="text" id={name} onChange={e => handleChange(e, ctx)} />
          );
      }
    };
    return (
      <FormContext.Consumer>
        {context => (
          <div className="form-group">
            <label htmlFor={name}>{label}</label>
            {!!type && editorReducer(type, context)}
          </div>
        )}
      </FormContext.Consumer>
    );
  };
  componentDidUpdate() {
    console.log("State: ", JSON.stringify(this.state, null, 2));
  }

  private setValues = (fieldName: string, value: any) => {
    const newValues = { ...this.state.values, [fieldName]: value };
    this.setState({ values: newValues });
  };
  render() {
    const context: TFormContext = {
      values: this.state.values,
      setValue: this.setValues
    };
    return (
      <FormContext.Provider value={context}>
        <form className="form" noValidate>
          {this.props.children}
        </form>
      </FormContext.Provider>
    );
  }
}

Form.Field.defaultProps = {
  type: "Text"
};
