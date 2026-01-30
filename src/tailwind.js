import { execa } from "execa";
import fs from "fs-extra";
import path from "path";

export async function addTailwind(projectDir) {
  const clientDir = path.join(projectDir, "client");

  // 1. Install Tailwind v4 + PostCSS plugin
  await execa("npm", ["install", "-D", "tailwindcss", "@tailwindcss/postcss"], {
    cwd: clientDir,
    stdio: "inherit",
  });

  // 2. Create Tailwind config
  const tailwindConfig = `
/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: { extend: {} },
  plugins: [],
};
`;

  await fs.writeFile(
    path.join(clientDir, "tailwind.config.js"),
    tailwindConfig,
  );

  // 3. Create PostCSS config
  const postcssConfig = `
export default {
  plugins: {
    "@tailwindcss/postcss": {},
  },
};
`;

  await fs.writeFile(path.join(clientDir, "postcss.config.js"), postcssConfig);

  // 4. Create Tailwind v4 CSS entry
  const cssPath = path.join(clientDir, "src", "index.css");
  const cssContent = `@import "tailwindcss";`;

  await fs.writeFile(cssPath, cssContent);

  console.log("✨ Tailwind v4 added successfully");
}
