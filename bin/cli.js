#!/usr/bin/env node
import { run } from "../src/index.js";

const args = process.argv.slice(2);
const projectName = args[0];

if (!projectName) {
  console.log("❌ Please provide a project name");
  console.log("   npx create-mern-app <project-name>");
  process.exit(1);
}

run({ projectName });
