export default function DocsPage() {
  return (
    <div>
      <h1 className="text-4xl font-bold mb-8">Typegres Documentation</h1>
      
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">What is Typegres?</h2>
        <p className="text-gray-300 mb-4">
          Typegres is a TypeScript library that provides type-safe PostgreSQL queries without the overhead of a traditional ORM. 
          It generates TypeScript types directly from your database schema, ensuring complete type safety while allowing you to 
          write pure SQL with all of PostgreSQL's powerful features.
        </p>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Key Features</h2>
        <ul className="list-disc list-inside space-y-2 text-gray-300">
          <li>100% type-safe queries generated from your database schema</li>
          <li>Full access to PostgreSQL features - no limitations</li>
          <li>Zero runtime overhead - compiles to native SQL</li>
          <li>Automatic type generation from database introspection</li>
          <li>Support for complex queries, CTEs, window functions, and more</li>
          <li>Built on top of Kysely for a solid foundation</li>
        </ul>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Why Typegres?</h2>
        <p className="text-gray-300 mb-4">
          Traditional ORMs often abstract away too much of SQL's power, limiting what you can do. Query builders 
          give you more control but often lack proper type safety. Typegres gives you the best of both worlds:
        </p>
        <ul className="list-disc list-inside space-y-2 text-gray-300">
          <li><strong>Write real SQL:</strong> Use every PostgreSQL feature without limitations</li>
          <li><strong>Full type safety:</strong> Catch errors at compile time, not runtime</li>
          <li><strong>No magic:</strong> Your queries compile to exactly the SQL you'd write by hand</li>
          <li><strong>Great DX:</strong> Autocompletion, inline documentation, and type checking</li>
        </ul>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Getting Started</h2>
        <p className="text-gray-300 mb-4">
          Ready to start using Typegres? Check out our <a href="/docs/quickstart" className="text-blue-400 hover:text-blue-300">Quick Start guide</a> to 
          get up and running in minutes, or explore the <a href="/api/index.html" className="text-blue-400 hover:text-blue-300">API Reference</a> for 
          detailed documentation.
        </p>
      </section>
    </div>
  )
}