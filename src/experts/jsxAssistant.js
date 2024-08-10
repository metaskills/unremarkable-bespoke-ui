import { Assistant } from "experts";

class JsxAssistant extends Assistant {
  constructor() {
    super({
      name: "unRemarkable.ai JSX Converter",
      instructions: `
# Convert JSON to JSX

* The schema defines a recursive HTML structure.
* Respond with the JSX only. Nothing else! No backticks!
      `.trim(),
      temperature: 0.1,
    });
  }
}

export { JsxAssistant };
