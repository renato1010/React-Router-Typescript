import React from "react";
import ReactDOM from "react-dom";
import { Simulate } from "react-dom/test-utils";
import ContactUs from "../ContactUs";
import { SubmitResult } from "../Form";

describe("ContactUs component", () => {
  test("When submit without filling in fields should display errors", () => {
    const handleSubmit = async (): Promise<SubmitResult> => {
      return { success: true };
    };
    const container = document.createElement("div");
    ReactDOM.render(<ContactUs onSubmit={handleSubmit} />, container);
    const form = container.querySelector("form");
    expect(form).not.toBeNull();
    Simulate.submit(form!);

    const errorSpans = container.querySelectorAll("span.form-error");
    console.log("errorSpans: ", errorSpans);
    expect(errorSpans.length).toBe(2);

    ReactDOM.unmountComponentAtNode(container);
  });
});
