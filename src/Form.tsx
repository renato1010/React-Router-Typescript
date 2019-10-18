import React, { ChangeEvent, FocusEvent } from "react";

type FieldNames = "name" | "email" | "reason" | "notes";

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
  name: keyof Values;
  label: string;
  type?: "Text" | "Email" | "Select" | "TextArea";
  options?: string[];
};

type TFormContext = {
  values: Values;
  setValue?: (fieldName: string, value: any) => void;
  errors: Errors;
  validate?: (fieldName: FieldNames, value: any) => void;
};

/* Validation */
export type Validator = (
  fieldName: keyof Values,
  values: Values,
  args?: any
) => string;

export const required: Validator = (
  fieldName: keyof Values,
  values: Values
): string => {
  return values[fieldName] === undefined ||
    values[fieldName] === null ||
    values[fieldName] === ""
    ? "This must be populated"
    : "";
};

export const minLength: Validator = (
  fieldName: keyof Values,
  values: Values,
  length: number
): string => {
  return values[fieldName] && values[fieldName].length < length
    ? `This must be at least ${length} characters`
    : "";
};

type Validation = {
  validator: Validator;
  arg?: any;
};

type ValidationProp = {
  [Key in FieldNames]?: Validation | Validation[];
};

/*  Errors */

type Errors = {
  [Key in FieldNames]?: string[];
};

type FormProps = {
  defaultValues: Values;
  validationRules: ValidationProp;
};

type FormState = { values: Values; errors: Errors };

const FormContext = React.createContext<TFormContext>({
  values: { name: "", email: "", notes: "", reason: "Support" },
  errors: {}
});

export class Form extends React.Component<FormProps, FormState> {
  constructor(props: FormProps) {
    super(props);
    const errors: Errors = {};
    Object.keys(props.defaultValues).forEach(fn => {
      errors[fn as FieldNames] = [];
    });
    this.state = { values: this.props.defaultValues, errors };
  }

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
    const handleBlur = (
      e:
        | FocusEvent<HTMLInputElement>
        | FocusEvent<HTMLTextAreaElement>
        | FocusEvent<HTMLSelectElement>,
      context: TFormContext
    ) => {
      if (context.validate) {
        context.validate(name, e.currentTarget.value);
      }
    };
    const editorReducer = (
      type: "Text" | "Email" | "Select" | "TextArea",
      ctx: TFormContext
    ): JSX.Element => {
      const renderError = (): JSX.Element | JSX.Element[] | null => {
        if (!(ctx.errors[name] as string[]).length) {
          return null;
        }
        return (ctx.errors[name] as string[]).map(error => (
          <span key={error} className="form-error">
            {error}
          </span>
        ));
      };
      switch (type) {
        case "Text" || "Email": {
          const fn = type === "Text" ? "name" : "email";
          return (
            <>
              <input
                onChange={e => handleChange(e, ctx)}
                onBlur={e => handleBlur(e, ctx)}
                type={type.toLowerCase()}
                id={name}
                value={ctx.values[fn]}
              />
              {renderError()}
            </>
          );
        }
        case "TextArea": {
          return (
            <>
              <textarea
                id={name}
                value={ctx.values.notes}
                onChange={e => handleChange(e, ctx)}
                onBlur={e => handleBlur(e, ctx)}
              />
              {renderError()}
            </>
          );
        }
        case "Select": {
          return (
            <>
              <select
                onChange={e => handleChange(e, ctx)}
                onBlur={e => handleBlur(e, ctx)}
                value={ctx.values.reason}
              >
                {options &&
                  options.map(option => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
              </select>
              {renderError()}
            </>
          );
        }
        default:
          return (
            <>
              <input
                type="text"
                id={name}
                onChange={e => handleChange(e, ctx)}
                onBlur={e => handleBlur(e, ctx)}
              />
              {renderError()}
            </>
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

  private validate = (fieldName: FieldNames, value: any): string[] => {
    const rules = this.props.validationRules[fieldName];
    let errors: string[] = [];
    if (!rules) {
      return errors;
    }
    if (Array.isArray(rules)) {
      const ruleErrors = rules.reduce((acc: string[], rule) => {
        const currentError = rule["validator"](
          fieldName,
          this.state.values,
          rule["arg"]
        );
        if (!currentError) {
          return [...acc];
        }
        return [...acc, currentError];
      }, []);
      errors = ruleErrors;
    } else {
      errors = [
        ...errors,
        rules["validator"](fieldName, this.state.values, rules["arg"])
      ];
    }
    const newErrors = { ...this.state.errors, [fieldName]: errors };
    this.setState<"errors">((prevState, props) => ({ errors: newErrors }));
    return errors;
  };

  private setValues = (fieldName: string, value: any) => {
    const newValues = { ...this.state.values, [fieldName]: value };
    this.setState({ values: newValues });
  };
  render() {
    const context: TFormContext = {
      values: this.state.values,
      setValue: this.setValues,
      errors: this.state.errors,
      validate: this.validate
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
