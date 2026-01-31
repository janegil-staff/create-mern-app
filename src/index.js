import { createProject } from "./createProject.js";

export async function run(options) {
  console.log("🚀 Creating a new MERN project...");

  await createProject(options);

  console.log(`
🎉 Your MERN app is ready!

Next steps: d
  cd ${options.projectName}
  npm run dev

Happy hacking!
`);
}
