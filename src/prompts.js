import prompts from "prompts";

export async function promptUser() {
  return await prompts([
    {
      type: "text",
      name: "projectName",
      message: "Project name:",
    },
    {
      type: "toggle",
      name: "useTypescript",
      message: "Use TypeScript?",
      initial: false,
      active: "yes",
      inactive: "no",
    },
    {
      type: "toggle",
      name: "includeAuth",
      message: "Include auth system?",
      initial: true,
      active: "yes",
      inactive: "no",
    },
    {
      type: "toggle",
      name: "useTailwind",
      message: "Add Tailwind to React?",
      initial: true,
      active: "yes",
      inactive: "no",
    },
  ]);
}
