const fs = require("fs");
const path = require("path");

const typegresPath = path.join(__dirname, "../node_modules/typegres");
const outputPath = path.join(__dirname, "../lib/typegres-bundle.ts");

// Read all .d.ts files from typegres
function readDtsFiles(dir, baseDir = "") {
  const files = {};
  const items = fs.readdirSync(dir);

  for (const item of items) {
    const fullPath = path.join(dir, item);
    const relativePath = path.join(baseDir, item);
    const stat = fs.statSync(fullPath);

    if (stat.isDirectory() && !item.includes("test")) {
      Object.assign(files, readDtsFiles(fullPath, relativePath));
    } else if (item.endsWith(".d.ts") && !item.includes("test")) {
      const content = fs.readFileSync(fullPath, "utf8");
      files[relativePath] = content;
    }
  }

  return files;
}

// Create the main index.d.ts content by analyzing exports
function createMainIndex(files) {
  // Start with basic structure
  let mainExports = [];

  // Check what's exported from key files
  if (files["dist/expression.d.ts"]) {
    mainExports.push('export * from "./dist/expression"');
  }
  if (files["dist/query/db.d.ts"]) {
    mainExports.push('export * from "./dist/query/db"');
  }
  if (files["dist/query/values.d.ts"]) {
    mainExports.push('export * from "./dist/query/values"');
  }
  if (files["dist/sql-function.d.ts"]) {
    mainExports.push('export * from "./dist/sql-function"');
  }
  if (files["dist/types/index.d.ts"]) {
    mainExports.push('export * from "./dist/types/index"');
  }
  if (files["dist/gen/functions.d.ts"]) {
    mainExports.push('export * from "./dist/gen/functions"');
  }
  if (files["dist/gen/tables.d.ts"]) {
    mainExports.push('export * from "./dist/gen/tables"');
  }

  return mainExports.join("\n");
}

// Bundle all files
console.log("Reading typegres type definitions...");
const typeFiles = readDtsFiles(path.join(typegresPath));

// Add a main index.d.ts
typeFiles["index.d.ts"] = createMainIndex(typeFiles);

// Create the bundle
const bundleContent = `// Auto-generated bundle of typegres type definitions
import * as monaco from 'monaco-editor'

export const typegresTypeBundle: Record<string, string> = ${JSON.stringify(typeFiles, null, 2)};

export function installTypegresToMonaco(monaco: typeof import('monaco-editor')) {
  // Add all typegres files to Monaco
  Object.entries(typegresTypeBundle).forEach(([filePath, content]) => {
    const fullPath = \`node_modules/typegres/\${filePath}\`;
    monaco.languages.typescript.typescriptDefaults.addExtraLib(
      content,
      \`file:///\${fullPath}\`
    );
  });
  
  // Also add a simplified re-export at the root
  monaco.languages.typescript.typescriptDefaults.addExtraLib(
    typegresTypeBundle['index.d.ts'],
    'file:///node_modules/typegres/index.d.ts'
  );
}
`;

// Write the bundle
fs.mkdirSync(path.dirname(outputPath), { recursive: true });
fs.writeFileSync(outputPath, bundleContent);

console.log(
  `Successfully bundled ${Object.keys(typeFiles).length} type definition files to ${outputPath}`,
);
