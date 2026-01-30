import { promptUser } from "./prompts.js";
import { createProject } from "./createProject.js";
import { installDeps } from "./installDeps.js";

export async function run() {
  console.log("🚀 Creating a new MERN project...");

  const options = await promptUser();
  await createProject(options);
  await installDeps(options);

  console.log(`
🎉 Your MERN app is ready!

Next steps:
  cd ${options.projectName}
  npm run dev

Happy hacking!
`);
}
