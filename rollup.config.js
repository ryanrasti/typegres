import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import typescript from '@rollup/plugin-typescript';
import dts from 'rollup-plugin-dts';

export default [
  {
    input: 'src/index.ts',
    output: {
      file: 'dist/typegres.bundle.js',
      format: 'es',
      sourcemap: true
    },
    // External Node.js built-ins and packages that depend on them
    external: [
      // Node.js built-ins
      'events', 'crypto', 'dns', 'fs', 'net', 'tls', 'path', 'stream', 'string_decoder', 'util', 'buffer', 'os', 'process', 'child_process', 'http', 'https', 'url', 'querystring', 'zlib',
      // pg and related packages that require Node.js
      'pg', 'pg-pool', 'pg-types', 'pg-protocol', 'pg-connection-string', 'pg-cloudflare', 'postgres-bytea',
      // CSV package also uses Node.js streams
      'csv', 'csv-generate', 'csv-parse', 'csv-stringify', 'stream-transform'
    ],
    plugins: [
      resolve({
        preferBuiltins: false,
        browser: true
      }),
      commonjs(),
      typescript({
        tsconfig: './tsconfig.json',
        declaration: false,
        declarationMap: false
      })
    ]
  },
  {
    input: 'src/index.ts',
    output: {
      file: 'dist/typegres.bundle.d.ts',
      format: 'es'
    },
    // Keep external for type definitions to avoid bloating
    external: ['pg', 'kysely', 'camelcase', 'postgres-array', 'postgres-date', 'postgres-interval', 'postgres-bytea', 'postgres-range'],
    plugins: [
      dts({
        respectExternal: true
      })
    ]
  }
];