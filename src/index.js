import { input } from "@inquirer/prompts";
import { Thread } from "experts";
import { BespokeUIAssistant } from "./experts/main.js";

const thread = await Thread.create();
const assistant = await BespokeUIAssistant.create();
await thread.addMetaData({ expert: "BespokeUIAssistant" });

let userInput, assistantOutput;

const customInput = async (message) =>
  input({
    message: message,
    theme: { prefix: "🤖" },
  });

userInput = process.env.UI_BUILD;
userInput ||= await customInput(
  "Describe the user interface you want to build.\n ↪"
);

while (true) {
  assistantOutput = await assistant.ask(userInput, thread.id);
  userInput = await customInput(`${assistantOutput}\n ↪`);
}
