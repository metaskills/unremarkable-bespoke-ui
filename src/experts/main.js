import { Assistant, Thread } from "experts";
import { JsxAssistant } from "./jsxAssistant.js";
import { zodResponseFormat } from "openai/helpers/zod";
import { uiSchema } from "../uiSchema.js";
import { previewUI } from "../template.js";

const jsxAssistant = await JsxAssistant.create();
const jsxThread = await Thread.create();
await jsxThread.addMetaData({ expert: "JsxAssistant" });

class BespokeUIAssistant extends Assistant {
  constructor() {
    super({
      name: "unRemarkable.ai Bespoke UI",
      model: "gpt-4o-2024-08-06",
      instructions: `
# Dynamically Generate User Interfaces Based on the User's Intent

* Use Tailwind CSS for structure and styling.
* Assume the page is using a default Tailwind config & color scheme.
* All the user to iterate on a design or start a fresh one. 
* If images are needed, use Lorem Picsum service.
      `.trim(),
      temperature: 0.1,
      response_format: zodResponseFormat(uiSchema, "ui"),
    });
  }

  async answered(output) {
    await this.#preview(output);
    return "Done";
  }

  async #preview(output) {
    const bespokeJSX = await jsxAssistant.ask(output, jsxThread.id);
    await previewUI(bespokeJSX);
  }
}

export { BespokeUIAssistant };
