import fs from "fs-extra";
import path from "path";
import { fileURLToPath } from "url";

/**
 * Copies the template folder into the target project folder.
 * Also performs variable injection (e.g., {{PROJECT_NAME}}).
 */
export async function copyTemplate(srcDir, destDir, options) {
  try {
    // 1. Ensure source exists
    const exists = await fs.pathExists(srcDir);
    if (!exists) {
      console.error("❌ Template directory not found:", srcDir);
      return;
    }

    // 2. Copy everything from templates → project
    await fs.copy(srcDir, destDir);

    // 3. Inject variables into README.md (optional)
    const readmePath = path.join(destDir, "README.md");
    if (await fs.pathExists(readmePath)) {
      let content = await fs.readFile(readmePath, "utf8");
      content = content.replace(/{{PROJECT_NAME}}/g, options.projectName);
      await fs.writeFile(readmePath, content);
    }

    console.log("📦 Templates copied successfully");
  } catch (err) {
    console.error("❌ Error copying template:", err);
  }
}
