import fs from "fs-extra";
import path from "path";
import { execa } from "execa";

export async function addTypescript(projectDir) {
  const clientDir = path.join(projectDir, "client");
  const serverDir = path.join(projectDir, "server");
  const sharedDir = path.join(projectDir, "shared");

  console.log("📘 Adding TypeScript...");

  // CLIENT
  await execa("npm", ["install", "-D", "typescript", "@types/react", "@types/react-dom"], {
    cwd: clientDir,
    stdio: "inherit"
  });

  await fs.writeFile(
    path.join(clientDir, "tsconfig.json"),
    JSON.stringify(
      {
        compilerOptions: {
          target: "ES2020",
          module: "ESNext",
          jsx: "react-jsx",
          moduleResolution: "bundler",
          strict: true,
          skipLibCheck: true
        }
      },
      null,
      2
    )
  );

  await renameExt(clientDir, ".jsx", ".tsx");
  await renameExt(clientDir, ".js", ".ts");

  // SERVER
  await execa("npm", ["install", "-D", "typescript", "@types/node", "@types/express"], {
    cwd: serverDir,
    stdio: "inherit"
  });

  await fs.writeFile(
    path.join(serverDir, "tsconfig.json"),
    JSON.stringify(
      {
        compilerOptions: {
          target: "ES2020",
          module: "CommonJS",
          outDir: "dist",
          rootDir: "src",
          esModuleInterop: true,
          strict: true
        }
      },
      null,
      2
    )
  );

  await renameExt(serverDir, ".js", ".ts");

  // SHARED
  await renameExt(sharedDir, ".js", ".ts");

  console.log("✨ TypeScript added successfully");
}

async function renameExt(dir, fromExt, toExt) {
  const files = await fs.readdir(dir);

  for (const file of files) {
    const full = path.join(dir, file);
    const stat = await fs.stat(full);

    if (stat.isDirectory()) {
      await renameExt(full, fromExt, toExt);
      continue;
    }

    if (file.endsWith(fromExt)) {
      const newName = file.replace(fromExt, toExt);
      await fs.rename(full, path.join(dir, newName));
    }
  }
}
