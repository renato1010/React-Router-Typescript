import React from "react";
import ContactUs from "./ContactUs";
import { Values, SubmitResult } from "./Form";

const wait = (ms: number): Promise<void> => {
  return new Promise(resolve => setTimeout(resolve, ms));
};

class ContactUsPage extends React.Component<{}, {}> {
  private handleSubmit = async (values: Values): Promise<SubmitResult> => {
    await wait(1000);
    return {
      success: false,
      errors: {
        name: ["This should be populated"],
        email: ["this should be populated"]
      }
    };
  };
  render() {
    return (
      <div className="page-container">
        <h1>Contact Us</h1>
        <p>If you enter your details we'll get back to you as soon as we can</p>
        <ContactUs onSubmit={this.handleSubmit} />
      </div>
    );
  }
}

export default ContactUsPage;
