import { grammars } from ".";

// Main function to generate parser files
function main() {
  const fs = require("fs");
  const path = require("path");
  const { execSync } = require("child_process");

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

// Type imports for the parser function
type FromItem = any; // TODO: Import proper FromItem type
${clause === grammars.update ? `type MergeSelectArgs<_U, _F> = any; // TODO: Import proper MergeSelectArgs type` : ""}

${clause.generateParser()}
`;

    const filePath = path.join(outputDir, `${name}.ts`);
    fs.writeFileSync(filePath, content);
    console.log(`Generated ${name}.ts`);
  }

  // Format generated files with prettier
  console.log("Formatting generated files...");
  try {
    execSync(`npm run format -- ${outputDir}/*.ts`, { stdio: "inherit" });
  } catch (error) {
    console.error("Error formatting files:", error);
  }
}

// Run if this file is executed directly
if (require.main === module) {
  main();
}
