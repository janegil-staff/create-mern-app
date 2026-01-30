import fs from "fs-extra";
import path from "path";
import { fileURLToPath } from "url";
import { copyTemplate } from "./copyTemplate.js";
import { addTailwind } from "./tailwind.js";
import { addTypescript } from "./typescript.js";

export async function createProject(options) {
  const { projectName, includeAuth, useTailwind, useTypescript } = options;

  const __dirname = path.dirname(fileURLToPath(import.meta.url));
  const templateDir = path.join(__dirname, "../templates");
  const targetDir = path.join(process.cwd(), projectName);

  console.log("📁 Creating project folder...");
  await fs.mkdirp(targetDir);

  console.log("📦 Copying template files...");
  await copyTemplate(templateDir, targetDir, options);

  console.log("✨ Project structure created.");

  if (useTailwind) {
    console.log("🌈 Adding Tailwind CSS...");
    await addTailwind(targetDir);
  }
  if (useTypescript) {
    await addTypescript(targetDir);
  }
}
