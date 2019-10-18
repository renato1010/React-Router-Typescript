import React from "react";
import { Form, minLength, required, SubmitResult, Values } from "./Form";

type Props = {
  onSubmit: (values: Values) => Promise<SubmitResult>;
};

const ContactUs: React.FC<Props> = props => {
  const handleSubmit = async (values: Values): Promise<SubmitResult> => {
    const result = await props.onSubmit(values);
    return result;
  };
  return (
    <Form
      onSubmit={handleSubmit}
      defaultValues={{ name: "", email: "", reason: "Support", notes: "" }}
      validationRules={{
        email: { validator: required },
        name: [{ validator: required }, { validator: minLength, arg: 3 }]
      }}
    >
      <Form.Field name="name" label="Your Name" />
      <Form.Field name="email" label="Your email address" type="Email" />
      <Form.Field
        name="reason"
        label="Reason you need to contact us"
        type="Select"
        options={["Marketing", "Support", "Feedback", "Jobs", "Other"]}
      />
      <Form.Field name="notes" label="Additional notes" type="TextArea" />
    </Form>
  );
};

export default ContactUs;
