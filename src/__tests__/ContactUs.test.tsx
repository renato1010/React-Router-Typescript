import React from "react";
import ReactDOM from "react-dom";
import { Simulate } from "react-dom/test-utils";
import { render, cleanup, fireEvent } from "@testing-library/react";
import ContactUs from "../ContactUs";

describe("ContactUs component", () => {
  test("When submit without filling in fields should display errors", () => {
    const handleSubmit = jest.fn();

    const { getAllByText, getByText } = render(
      <ContactUs onSubmit={handleSubmit} />
    );

    const submitButton = getByText("Submit");
    fireEvent.click(submitButton);

    const errorSpans = getAllByText("This should be populated");
    expect(errorSpans.length).toBe(2);

    expect(handleSubmit).not.toBeCalled();
  });
});
