import fs from "fs-extra";
import path from "path";

/**
 * Recursively copies a template folder into a destination folder.
 *
 * @param {string} templatePath - Absolute path to the template folder.
 * @param {string} destinationPath - Absolute path to the output folder.
 */
export async function copyTemplateFiles(templatePath, destinationPath) {
  try {
    await fs.ensureDir(destinationPath);
    await fs.copy(templatePath, destinationPath, {
      overwrite: true,
      errorOnExist: false
    });
  } catch (err) {
    console.error(`Failed to copy template from ${templatePath}`);
    throw err;
  }
}
