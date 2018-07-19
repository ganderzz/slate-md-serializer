import { Value } from "slate";
import { serialize } from "../src";
import { INITIAL_STATE } from "./intialValue";

describe("Test serializing", () => {
  it("Should serialize unedited text", () => {
    const output = serialize(Value.fromJSON(INITIAL_STATE));

    expect(output).toBe("Enter text here!");
  });

  it("Should serialize header", () => {
    const value = INITIAL_STATE;
    value.document.nodes[0].type = "header";

    const output = serialize(Value.fromJSON(value));

    expect(output).toBe("# Enter text here!");
  });

  it("Should serialize header with different header type option", () => {
    const value = INITIAL_STATE;
    value.document.nodes[0].type = "h1";

    const output = serialize(Value.fromJSON(value), {
      parseNodes: (type, text) => {
        if (type === "h1") {
          return `# ${text}`;
        }

        return text;
      }
    });

    expect(output).toBe("# Enter text here!");
  });
});
