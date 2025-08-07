import { grammars } from ".";
import fs from "fs";
import path from "path";

// Main function to generate parser files
async function main() {
  const outputDir = path.join(__dirname, "generated");

  // Create output directory if it doesn't exist
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  // Generate a file for each top-level clause
  for (const [name, clause] of Object.entries(grammars)) {
    const content = `// Generated parser for ${name.toUpperCase()} statement
import { grammars, ParsedClause } from '../index';
import * as Types from '../../types';
import invariant from 'tiny-invariant';

${clause.generateParser()}
`;

    const filePath = path.join(outputDir, `${name}.ts`);
    fs.writeFileSync(filePath, content);
    console.log(`Generated ${name}.ts`);
  }

  // Format generated files with prettier
  console.log("Formatting generated files...");
  try {
    //execSync(`npm run format -- ${outputDir}/*.ts`, { stdio: "inherit" });
  } catch (error) {
    console.error("Error formatting files:", error);
  }
}

// Run if this file is executed directly
if (require.main === module) {
  main();
}
