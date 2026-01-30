import { execa } from "execa";

export async function installDeps({ projectName }) {
  console.log("📦 Installing dependencies...");

  const cwd = `${process.cwd()}/${projectName}`;

  await execa("npm", ["install"], { cwd, stdio: "inherit" });
  await execa("npm", ["install"], { cwd: `${cwd}/server`, stdio: "inherit" });
  await execa("npm", ["install"], { cwd: `${cwd}/client`, stdio: "inherit" });

  console.log("📦 Dependencies installed.");
}
