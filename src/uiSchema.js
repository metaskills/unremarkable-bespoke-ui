import { z } from "zod";

const uiSchema = z
  .lazy(() =>
    z.object({
      type: z
        .enum(["div", "button", "header", "section", "field", "form"])
        .describe("The type of the UI component"),
      label: z
        .string()
        .describe(
          "The label of the UI component, used for buttons or form fields"
        ),
      children: z.array(uiSchema).describe("Nested UI components"),
      attributes: z
        .array(
          z.object({
            name: z
              .string()
              .describe(
                "The name of the attribute, for example onClick or className"
              ),
            value: z.string().describe("The value of the attribute"),
          })
        )
        .describe(
          "Arbitrary attributes for the UI component, suitable for any element"
        ),
    })
  )
  .describe("Dynamically generated UI");

export { uiSchema };
