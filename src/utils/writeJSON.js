import fs from "fs-extra";
import path from "path";

/**
 * Safely writes a JSON file with pretty formatting.
 * Ensures the directory exists before writing.
 *
 * @param {string} filePath - Absolute path to the JSON file.
 * @param {object} data - The JSON data to write.
 */
export async function writeJSON(filePath, data) {
  try {
    // FIXED: dirname comes from path, not fs
    await fs.ensureDir(path.dirname(filePath));

    await fs.writeJson(filePath, data, { spaces: 2 });
  } catch (err) {
    console.error(`Failed to write JSON to ${filePath}`);
    throw err;
  }
}
