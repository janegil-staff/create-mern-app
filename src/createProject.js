import fs from "fs-extra";
import path from "path";
import { fileURLToPath } from "url";
import { copyTemplate } from "./copyTemplate.js";
import { addTailwind } from "./tailwind.js"; 
import { execa } from "execa";

export async function createProject(options) {
  const { projectName } = options;

  const __dirname = path.dirname(fileURLToPath(import.meta.url));
  const templateDir = path.join(__dirname, "../templates");
  const targetDir = path.join(process.cwd(), projectName);

  console.log("📁 Creating project folder...");
  await fs.mkdirp(targetDir);

  console.log("📦 Copying template files...");
  await copyTemplate(templateDir, targetDir, options);

  console.log("✨ Project structure created.");

  console.log("🌈 Adding Tailwind CSS...");
  await addTailwind(targetDir);
}
