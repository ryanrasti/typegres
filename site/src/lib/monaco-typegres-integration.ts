import * as monaco from 'monaco-editor'
import { initialize, transform } from 'esbuild-wasm'

let esbuildInitialized = false

async function initializeEsbuild() {
  if (!esbuildInitialized) {
    await initialize({
      wasmURL: 'https://unpkg.com/esbuild-wasm@0.25.5/esbuild.wasm'
    })
    esbuildInitialized = true
  }
}

export async function setupMonacoWithTypegres(monaco: typeof import('monaco-editor'), typegresTypesContent: string) {
  // Initialize esbuild
  await initializeEsbuild()

  // Configure TypeScript compiler options
  monaco.languages.typescript.typescriptDefaults.setCompilerOptions({
    target: monaco.languages.typescript.ScriptTarget.ES2020,
    module: monaco.languages.typescript.ModuleKind.ESNext,
    moduleResolution: monaco.languages.typescript.ModuleResolutionKind.NodeJs,
    allowNonTsExtensions: true,
    allowJs: false,
    lib: ['es2020', 'dom', 'esnext.asynciterable'],
    strict: true,
    esModuleInterop: true,
    allowSyntheticDefaultImports: true,
    noEmit: true,
    skipLibCheck: true,
    forceConsistentCasingInFileNames: true,
    jsx: monaco.languages.typescript.JsxEmit.None
  })

  // Set diagnostic options
  monaco.languages.typescript.typescriptDefaults.setDiagnosticsOptions({
    noSemanticValidation: false,
    noSyntaxValidation: false,
    noSuggestionDiagnostics: false
  })

  // Add the typegres types from the bundled .d.ts file
  monaco.languages.typescript.typescriptDefaults.addExtraLib(
    typegresTypesContent,
    'file:///node_modules/typegres/index.d.ts'
  )

  // Add a simplified Database type for the playground
  monaco.languages.typescript.typescriptDefaults.addExtraLib(`
declare module 'typegres/playground' {
  import { Kysely } from 'typegres';
  
  export interface Database {
    users: {
      id: number;
      name: string;
      email: string;
      active: boolean;
      created_at: Date;
    };
    posts: {
      id: number;
      user_id: number;
      title: string;
      content: string | null;
      published: boolean;
      created_at: Date;
    };
  }
  
  export const db: Kysely<Database>;
}
`, 'file:///node_modules/typegres/playground.d.ts')

  // Enable type acquisition
  monaco.languages.typescript.typescriptDefaults.setEagerModelSync(true)
}

export async function transformCodeWithEsbuild(code: string): Promise<string> {
  await initializeEsbuild()
  
  try {
    const result = await transform(code, {
      loader: 'ts',
      format: 'esm',
      target: 'es2020',
      sourcemap: false
    })
    
    return result.code
  } catch (error) {
    console.error('ESBuild transformation error:', error)
    throw error
  }
}

export async function runTypegresCode(
  code: string,
  typegresJsUrl: string
): Promise<{ sql: string; result?: any; error?: string }> {
  try {
    // Transform TypeScript code to JavaScript
    const jsCode = await transformCodeWithEsbuild(code)
    
    // Create a function that returns the transformed code as a module
    const moduleCode = `
      ${jsCode}
      
      // Export the result if it's assigned to a variable
      if (typeof result !== 'undefined') {
        return { sql: result.compile().sql, params: result.compile().parameters };
      }
    `
    
    // Execute the code in a sandboxed environment
    const fn = new Function('typegres', moduleCode)
    
    // Load typegres module (this would need to be loaded from the built .js file)
    // For now, return a mock result
    return {
      sql: 'SELECT * FROM users WHERE id = $1',
      result: { params: [1] }
    }
  } catch (error) {
    return {
      sql: '',
      error: error instanceof Error ? error.message : String(error)
    }
  }
}