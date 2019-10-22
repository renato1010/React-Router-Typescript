import { required, Values } from "../Form";

describe("required", () => {
  test(`When required is called with empty title, 
<This must be populated> should be returned`, () => {
    const values: Values = { name: "", email: "", notes: "", reason: "" };
    const result = required("name", values);
    expect(result).toEqual("This must be populated");
  });
});
