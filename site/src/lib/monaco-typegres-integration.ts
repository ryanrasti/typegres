import * as monaco from "monaco-editor";

// Use a global variable to track initialization across module instances
declare global {
  var __esbuildModule: typeof import("esbuild-wasm") | undefined;
  var __esbuildInitializePromise: Promise<void> | undefined;
}

async function getEsbuild() {
  // If already loaded, return it
  if (globalThis.__esbuildModule) {
    return globalThis.__esbuildModule;
  }

  // If initialization is in progress, wait for it
  if (globalThis.__esbuildInitializePromise) {
    await globalThis.__esbuildInitializePromise;
    return globalThis.__esbuildModule!;
  }

  // Start initialization
  globalThis.__esbuildInitializePromise = (async () => {
    const esbuild = await import("esbuild-wasm");
    
    // Initialize with the CDN URL (simpler than trying to serve from node_modules)
    await esbuild.initialize({
      wasmURL: "https://unpkg.com/esbuild-wasm@0.25.5/esbuild.wasm",
    });
    
    globalThis.__esbuildModule = esbuild;
  })();

  await globalThis.__esbuildInitializePromise;
  return globalThis.__esbuildModule!;
}

export async function setupMonacoWithTypegres(
  monaco: typeof import("monaco-editor")
) {
  // Ensure esbuild is available (but don't need to use it here)
  await getEsbuild();

  // Configure TypeScript compiler options
  monaco.languages.typescript.typescriptDefaults.setCompilerOptions({
    target: monaco.languages.typescript.ScriptTarget.ES2020,
    module: monaco.languages.typescript.ModuleKind.ESNext,
    moduleResolution: monaco.languages.typescript.ModuleResolutionKind.NodeJs,
    allowNonTsExtensions: true,
    allowJs: false,
    lib: ["es2020", "dom", "esnext.asynciterable"],
    strict: true,
    strictNullChecks: true,
    strictFunctionTypes: true,
    strictBindCallApply: true,
    strictPropertyInitialization: true,
    noImplicitAny: true,
    noImplicitThis: true,
    alwaysStrict: true,
    esModuleInterop: true,
    allowSyntheticDefaultImports: true,
    noEmit: true,
    skipLibCheck: false,
    forceConsistentCasingInFileNames: true,
    jsx: monaco.languages.typescript.JsxEmit.None,
    typeRoots: ["node_modules/@types"],
    types: ["node"],
  });

  // Set diagnostic options - enable all checks
  monaco.languages.typescript.typescriptDefaults.setDiagnosticsOptions({
    noSemanticValidation: false,
    noSyntaxValidation: false,
    noSuggestionDiagnostics: false,
    diagnosticCodesToIgnore: [],
  });

  // Load the bundled typegres types
  const typesResponse = await fetch("/typegres.d.ts");
  const rawTypes = await typesResponse.text();

  // Create a proper module declaration that includes all the types
  const typegresModule = `
declare module 'typegres' {
${rawTypes}
}`;

  // Add the module declaration to Monaco
  monaco.languages.typescript.typescriptDefaults.addExtraLib(
    typegresModule,
    "file:///node_modules/typegres/index.d.ts"
  );

  console.log(
    "Loading typegres types, first 1000 chars:",
    typegresModule.substring(0, 1000)
  );

  // Enable type acquisition
  monaco.languages.typescript.typescriptDefaults.setEagerModelSync(true);
}

export async function transformCodeWithEsbuild(code: string): Promise<string> {
  const esbuild = await getEsbuild();

  try {
    const result = await esbuild.transform(code, {
      loader: "ts",
      format: "esm",
      target: "es2022", // ES2022 supports top-level await
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
