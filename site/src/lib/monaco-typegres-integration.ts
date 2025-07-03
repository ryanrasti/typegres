import * as monaco from "monaco-editor";
import { initialize, transform } from "esbuild-wasm";

let esbuildInitialized = false;

async function initializeEsbuild() {
  if (!esbuildInitialized) {
    await initialize({
      wasmURL: "https://unpkg.com/esbuild-wasm@0.25.5/esbuild.wasm",
    });
    esbuildInitialized = true;
  }
}

export async function setupMonacoWithTypegres(
  monaco: typeof import("monaco-editor")) {

  // Initialize esbuild
  await initializeEsbuild();

  // Configure TypeScript compiler options
  monaco.languages.typescript.typescriptDefaults.setCompilerOptions({
    target: monaco.languages.typescript.ScriptTarget.ES2020,
    module: monaco.languages.typescript.ModuleKind.ESNext,
    moduleResolution: monaco.languages.typescript.ModuleResolutionKind.NodeJs,
    allowNonTsExtensions: true,
    allowJs: false,
    lib: ["es2020", "dom", "esnext.asynciterable"],
    strict: true,
    esModuleInterop: true,
    allowSyntheticDefaultImports: true,
    noEmit: true,
    skipLibCheck: true,
    forceConsistentCasingInFileNames: true,
    jsx: monaco.languages.typescript.JsxEmit.None,
  });

  // Set diagnostic options
  monaco.languages.typescript.typescriptDefaults.setDiagnosticsOptions({
    noSemanticValidation: false,
    noSyntaxValidation: false,
    noSuggestionDiagnostics: false,
  });

  const files = [
    'typegres.d.ts',
    'typegres.js',
    'package.json',
  ]

  for (const file of files) {
    const response = await fetch(`/${file}`);
    const content = await response.text();
    const uri = `file:///node_modules/typegres/${file}`
    monaco.languages.typescript.typescriptDefaults.addExtraLib(
      content,
      uri
    );
    if (file === 'package.json') {
      monaco.editor.createModel(content, undefined, monaco.Uri.parse(uri));
    }
  }

  // Create a package.json for the playground:
  const packageJson = {
    name: "typegres-playground",
    version: "1.0.0",
    description: "Typegres Playground",
    scripts: {
      start: "node typegres.js",
    },
    dependencies: {
      typegres: "0.0.1",
    },
  };
  monaco.editor.createModel(
    JSON.stringify(packageJson, null, 2),
    "json",
    monaco.Uri.parse("file:///package.json")
  );

  // Enable type acquisition
  monaco.languages.typescript.typescriptDefaults.setEagerModelSync(true);
}

export async function transformCodeWithEsbuild(code: string): Promise<string> {
  await initializeEsbuild();

  try {
    const result = await transform(code, {
      loader: "ts",
      format: "esm",
      target: "es2020",
      sourcemap: false,
    });

    return result.code;
  } catch (error) {
    console.error("ESBuild transformation error:", error);
    throw error;
  }
}

export async function runTypegresCode(
  code: string,
  typegresJsUrl: string
): Promise<{ sql: string; result?: any; error?: string }> {
  try {
    // Transform TypeScript code to JavaScript
    const jsCode = await transformCodeWithEsbuild(code);

    // Create a function that returns the transformed code as a module
    const moduleCode = `
      ${jsCode}
      
      // Export the result if it's assigned to a variable
      if (typeof result !== 'undefined') {
        return { sql: result.compile().sql, params: result.compile().parameters };
      }
    `;

    // Execute the code in a sandboxed environment
    const fn = new Function("typegres", moduleCode);

    // Load typegres module (this would need to be loaded from the built .js file)
    // For now, return a mock result
    return {
      sql: "SELECT * FROM users WHERE id = $1",
      result: { params: [1] },
    };
  } catch (error) {
    return {
      sql: "",
      error: error instanceof Error ? error.message : String(error),
    };
  }
}
