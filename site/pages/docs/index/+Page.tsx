import { PocWarning } from '../../../src/components/poc-warning'

export default function DocsPage() {
  return (
    <div>
      <h1 className="text-4xl font-bold mb-8">Typegres Documentation</h1>
      
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">What is Typegres?</h2>
        <p className="text-gray-600 dark:text-gray-300 mb-4">
          Typegres is a TypeScript library that provides type-safe PostgreSQL queries. While traditional ORMs and query
          builders abstract over multiple SQL dialects, Typegres goes all-in on Postgres to provide the most powerful
          and type-safe experience possible. In a single import, you can access the full power of Postgres. 
        </p>
        <PocWarning />
      </section>



      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Key Features</h2>
        <p className="text-gray-600 dark:text-gray-300 mb-4">
          Typegres aims to give you the best of Typescript and Postgres:
        </p>
        <ul className="list-disc list-inside space-y-2 text-gray-600 dark:text-gray-300">
          <li><strong>Write real SQL:</strong> Use every PostgreSQL feature without limitations</li>
          <li><strong>Full type safety:</strong> Catch errors at compile time, not runtime</li>
          <li><strong>No magic:</strong> Your queries compile to exactly the SQL you'd expect</li>
          <li><strong>Great DX:</strong> Autocompletion, inline documentation, and type checking</li>
        </ul>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Getting Started</h2>
        <p className="text-gray-600 dark:text-gray-300 mb-4">
          Ready to start using Typegres? Check out our <a href="/docs/quickstart" className="text-blue-400 hover:text-blue-300">Quick Start guide</a> to 
          get up and running in minutes, or explore the <a href="/api/index.html" className="text-blue-400 hover:text-blue-300">API Reference</a> for 
          detailed documentation.
        </p>
      </section>
    </div>
  )
}