"use client";

import { Github, ArrowUpRight, Check, X, AlertTriangle } from "lucide-react";
import { DarkModeToggle } from "@/components/DarkModeToggle";
import { SyntaxHighlight } from "@/components/SyntaxHighlight";

type CodeLanguage = "typescript" | "sql" | "tsx" | "javascript";

interface CodeExample {
  title: string;
  description: string;
  leftCode: string;
  rightCode: string;
  leftLabel: string;
  rightLabel: string;
  leftLanguage: CodeLanguage;
  rightLanguage: CodeLanguage;
  badge?: string;
  leftDiff?: boolean;
}

export default function HomePage() {
  const codeExamples: CodeExample[] = [
    {
      title: "1. Decouple Your Interface from Your Schema - With All of Postgres, Fully Typed",
      description:
        'Wrap your tables in a stable, public interface. You can refactor your "private" tables and columns without ever breaking clients.',
      leftCode: `export class User extends Models.User {
  // Your public interface stays stable as your schema evolves
  createdAt() {
    // -    return this.metadata['->>']('createdAt').cast(Timestamptz);
    // +    return this.created_at;
  }
}`,
      leftDiff: true,
      rightCode: `// Compiles to the single SQL query you'd write manually.
const user = await User
  .select()
  .orderBy((u) => u.createdAt(), { desc: true })
  .limit(1)
  .one(tg);`,
      leftLabel: "api.ts",
      rightLabel: "route.ts",
      leftLanguage: "typescript",
      rightLanguage: "typescript",
    },
    {
      title: "2. Your Interface Defines Your Data Boundaries",
      description:
        "Allowed operations are just methods on your interface, including relations and mutations. Everything fully composable and typed.",
      leftCode: `export class User extends Models.User {
  todos() {
    return Todo.select().where((t) => t.user_id.eq(this.id));
  }
}

export class Todo extends Models.Todos {
  update({ completed }: { completed: boolean }) {
    return update(Todo)
      .set((t) => ({ completed }))
      .where((t) => t.id.eq(this.id));
  }
}`,
      rightCode: `
const user = ...

// The only way to get a todo is through a user:
const todo = await user.todos()
  .where((t) => t.id.eq(todoId))
  .one(tg);

// The only way to update a todo is by getting it from a user:
await todo.update({ completed: true }).execute(tg);`,
      leftLabel: "api.ts",
      rightLabel: "route.ts",
      leftLanguage: "typescript",
      rightLanguage: "typescript",
    },
    {
      title: "3. Expose your API over RPC, Safely",
      description:
        "Give clients a composable query builder with your unescapable data boundaries. Compose queries in the client with every Postgres feature (joins, window functions, CTEs, etc.) and function as primitives.",
      leftCode: `export class User extends Models.User {
  // ...
}

export class Todo extends Models.Todos {
  // ...
}

export class Api extends RpcTarget {
  getUserFromToken(token: string) {
    return User.select((u) => new User(u))
      .where((u) => u.token.eq(token));
  }
}

// Clients receive composable query builders
// not flat results`,
      rightCode: `export function TodoList({ searchQuery }: { searchQuery: string }) {
  const todos = useTypegresQuery((user) => user.todos()
    // Arbitrarily compose your base query...  
    .select((t) => ({ id: t.id, title: t.title }))
    // ...using any Postgres function such as \`ilike\`:
    .where((t) => t.title.ilike(\`%\${searchQuery}%\`))
    .execute(tg)
  );
  
  return (
    <ul>
      {todos.map((todo) => (
        <li key={todo.id}>{todo.title}</li>
      ))}
    </ul>
  );
}`,
      leftLabel: "api.ts",
      rightLabel: "frontend.tsx",
      leftLanguage: "typescript",
      rightLanguage: "tsx",
      badge: "Coming Soon",
    },
  ];

  return (
    <>
      <DarkModeToggle />

      {/* Experimental Banner */}
      <div className="fixed top-0 left-0 right-0 z-[100] bg-yellow-50 dark:bg-yellow-900/20 border-b border-yellow-200 dark:border-yellow-800/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2">
          <p className="text-sm text-yellow-800 dark:text-yellow-300 text-center">
            🧪 Experimental | The RPC layer is under active development. Not ready for production use.{" "}
            <a
              href="https://github.com/ryanrasti/typegres"
              className="font-medium underline hover:text-yellow-900 dark:hover:text-yellow-200 transition-colors"
            >
              Star on GitHub for updates →
            </a>
          </p>
        </div>
      </div>

      {/* Fixed Header */}
      <header
        className="fixed top-0 left-0 right-0 z-[90] backdrop-blur-md bg-white/80 dark:bg-gray-950/80 border-b border-gray-200 dark:border-gray-800"
        style={{ top: "2.5rem" }}
      >
        <nav className="max-w-7xl mx-auto flex items-center justify-between px-4 sm:px-6 lg:px-8 h-14">
          <a href="/" className="flex items-center gap-2 group">
            <img src="/typegres_icon.svg" alt="Typegres" className="h-7 w-auto" />
            <span className="text-xl font-semibold">
              <span className="text-gray-900 dark:text-white">type</span>
              <span className="text-blue-600 dark:text-blue-400">gres</span>
            </span>
          </a>

          <div className="flex items-center gap-1">
            <a
              href="/api/index.html"
              className="px-3 py-1.5 text-sm font-medium text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
            >
              Docs
            </a>
            <a
              href="/play"
              className="px-3 py-1.5 text-sm font-medium text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
            >
              Playground
            </a>
            <a
              href="https://github.com/ryanrasti/typegres"
              className="ml-2 px-3 py-1.5 text-sm font-medium text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors inline-flex items-center gap-1.5"
            >
              <Github className="w-4 h-4" />
              <span>GitHub</span>
            </a>
          </div>
        </nav>
      </header>

      {/* Main Content */}
      <main className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-950 dark:to-gray-900 pt-24">
        {/* Hero Section */}
        <section className="relative overflow-hidden">
          <div className="absolute inset-0 bg-grid-gray-100 dark:bg-grid-gray-800 [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]" />

          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-24">
            <div className="text-center max-w-3xl mx-auto">
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight">
                <span className="bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-400 bg-clip-text text-transparent">
                  SQL-over-RPC, Safely
                </span>
              </h1>

              <p className="mt-6 text-lg sm:text-xl text-gray-600 dark:text-gray-400 font-medium">
                A TypeScript API framework that lets clients compose any queries they need within boundaries you
                control.
              </p>
            </div>
          </div>
        </section>

        {/* Three Tenets with Code */}
        <section className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
          <div className="space-y-20">
            {codeExamples.map((example, index) => (
              <div key={index} className="relative">
                <div>
                  {/* Title and Description */}
                  <div className="mb-6">
                    <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-3">
                      {example.title}
                      {example.badge && (
                        <span className="ml-3 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400">
                          {example.badge}
                        </span>
                      )}
                    </h2>
                    <p className="text-base text-gray-600 dark:text-gray-400 leading-relaxed max-w-3xl break-words">
                      {example.description}
                    </p>
                  </div>

                  {/* Two code blocks side by side with arrow */}
                  <div className="relative">
                    <div className="grid lg:grid-cols-2 gap-12 lg:gap-4 items-start">
                      {/* Left Code */}
                      <div className="relative group">
                        <div className="absolute -inset-1 bg-gradient-to-r from-gray-600/20 to-gray-500/20 dark:from-gray-400/10 dark:to-gray-500/10 rounded-lg blur-lg group-hover:blur-xl transition-all duration-300 opacity-70 group-hover:opacity-100" />

                        <div className="relative bg-gray-900 dark:bg-black rounded-lg border border-gray-800 dark:border-gray-700">
                          <div className="flex items-center px-4 py-2 border-b border-gray-800 dark:border-gray-700">
                            <span className="text-xs font-medium text-gray-400">{example.leftLabel}</span>
                          </div>

                          <div className="p-4 overflow-x-auto">
                            <SyntaxHighlight
                              code={example.leftCode}
                              language={example.leftLanguage}
                              className="text-sm"
                              diff={example.leftDiff}
                            />
                          </div>
                        </div>
                      </div>

                      {/* Right Code */}
                      <div className="relative group">
                        <div className="absolute -inset-1 bg-gradient-to-r from-blue-600/20 to-purple-600/20 dark:from-blue-400/10 dark:to-purple-400/10 rounded-lg blur-lg group-hover:blur-xl transition-all duration-300 opacity-70 group-hover:opacity-100" />

                        <div className="relative bg-gray-900 dark:bg-black rounded-lg border border-gray-800 dark:border-gray-700">
                          <div className="flex items-center px-4 py-2 border-b border-gray-800 dark:border-gray-700">
                            <span className="text-xs font-medium text-blue-400">{example.rightLabel}</span>
                          </div>

                          <div className="p-4 overflow-x-auto">
                            <SyntaxHighlight
                              code={example.rightCode}
                              language={example.rightLanguage}
                              className="text-sm"
                            />
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Arrow indicator in the middle */}
                    <div className="hidden lg:flex absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 z-50 pointer-events-none">
                      <div className="flex items-center justify-center w-12 h-12 rounded-full bg-blue-600 dark:bg-blue-500 shadow-lg ring-4 ring-gray-50 dark:ring-gray-950">
                        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M13 7l5 5m0 0l-5 5m5-5H6"
                          />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Bottom CTA Section */}
        <section className="relative border-t border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <div className="flex flex-col items-center text-center space-y-8">
              <div className="space-y-4">
                <h3 className="text-3xl font-bold text-gray-900 dark:text-white">
                  Ready to build the next generation of database APIs?
                </h3>
                <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl">
                  Experience the power of composable, capability-first database queries with full type safety and
                  AI-native architecture.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <a
                  href="/play"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors"
                >
                  Try in Playground
                  <ArrowUpRight className="w-4 h-4" />
                </a>

                <a
                  href="https://github.com/ryanrasti/typegres"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-gray-900 hover:bg-gray-800 dark:bg-white dark:hover:bg-gray-100 text-white dark:text-gray-900 font-medium rounded-lg transition-colors"
                >
                  <Github className="w-5 h-5" />
                  Star on GitHub
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="relative border-t border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-12 text-center">
              Frequently Asked Questions
            </h2>
            <div className="space-y-12">
              {/* Comparison Table 1: API Frameworks */}
              <div>
                <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
                  API Frameworks: Typegres vs Hasura vs PostgREST
                </h3>
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr className="border-b border-gray-300 dark:border-gray-700">
                        <th className="text-left py-3 px-4 font-semibold text-gray-900 dark:text-white"></th>
                        <th className="text-left py-3 px-4 font-semibold text-gray-900 dark:text-white">Typegres</th>
                        <th className="text-left py-3 px-4 font-semibold text-gray-900 dark:text-white">Hasura</th>
                        <th className="text-left py-3 px-4 font-semibold text-gray-900 dark:text-white">PostgREST</th>
                      </tr>
                    </thead>
                    <tbody className="text-gray-600 dark:text-gray-400">
                      <tr className="border-b border-gray-200 dark:border-gray-800">
                        <td className="py-3 px-4 font-medium text-gray-900 dark:text-white">Schema coupling</td>
                        <td className="py-3 px-4">
                          <div className="flex items-center gap-2">
                            <Check className="w-4 h-4 text-green-600 dark:text-green-400" />
                            <span>Decoupled</span>
                          </div>
                        </td>
                        <td className="py-3 px-4">
                          <div className="flex items-center gap-2">
                            <X className="w-4 h-4 text-red-600 dark:text-red-400" />
                            <span>Tightly coupled</span>
                          </div>
                        </td>
                        <td className="py-3 px-4">
                          <div className="flex items-center gap-2">
                            <X className="w-4 h-4 text-red-600 dark:text-red-400" />
                            <span>Tightly coupled</span>
                          </div>
                        </td>
                      </tr>
                      <tr className="border-b border-gray-200 dark:border-gray-800">
                        <td className="py-3 px-4 font-medium text-gray-900 dark:text-white">Client composition</td>
                        <td className="py-3 px-4">
                          <div className="flex items-center gap-2">
                            <Check className="w-4 h-4 text-green-600 dark:text-green-400" />
                            <span>Full composable queries</span>
                          </div>
                        </td>
                        <td className="py-3 px-4">
                          <div className="flex items-center gap-2">
                            <AlertTriangle className="w-4 h-4 text-yellow-600 dark:text-yellow-400" />
                            <span>GraphQL queries</span>
                          </div>
                        </td>
                        <td className="py-3 px-4">
                          <div className="flex items-center gap-2">
                            <X className="w-4 h-4 text-red-600 dark:text-red-400" />
                            <span>REST endpoints</span>
                          </div>
                        </td>
                      </tr>
                      <tr className="border-b border-gray-200 dark:border-gray-800">
                        <td className="py-3 px-4 font-medium text-gray-900 dark:text-white">Authorization</td>
                        <td className="py-3 px-4">
                          <div className="flex items-center gap-2">
                            <Check className="w-4 h-4 text-green-600 dark:text-green-400" />
                            <span>Capability-based</span>
                          </div>
                        </td>
                        <td className="py-3 px-4">
                          <div className="flex items-center gap-2">
                            <AlertTriangle className="w-4 h-4 text-yellow-600 dark:text-yellow-400" />
                            <span>RLS + permissions</span>
                          </div>
                        </td>
                        <td className="py-3 px-4">
                          <div className="flex items-center gap-2">
                            <AlertTriangle className="w-4 h-4 text-yellow-600 dark:text-yellow-400" />
                            <span>RLS</span>
                          </div>
                        </td>
                      </tr>
                      <tr className="border-b border-gray-200 dark:border-gray-800">
                        <td className="py-3 px-4 font-medium text-gray-900 dark:text-white">Refactor safety</td>
                        <td className="py-3 px-4">
                          <div className="flex items-center gap-2">
                            <Check className="w-4 h-4 text-green-600 dark:text-green-400" />
                            <span>Safe schema evolution</span>
                          </div>
                        </td>
                        <td className="py-3 px-4">
                          <div className="flex items-center gap-2">
                            <X className="w-4 h-4 text-red-600 dark:text-red-400" />
                            <span>Breaking changes</span>
                          </div>
                        </td>
                        <td className="py-3 px-4">
                          <div className="flex items-center gap-2">
                            <X className="w-4 h-4 text-red-600 dark:text-red-400" />
                            <span>Breaking changes</span>
                          </div>
                        </td>
                      </tr>
                      <tr className="border-b border-gray-200 dark:border-gray-800">
                        <td className="py-3 px-4 font-medium text-gray-900 dark:text-white">Maturity/Ecosystem</td>
                        <td className="py-3 px-4">
                          <div className="flex items-center gap-2">
                            <AlertTriangle className="w-4 h-4 text-yellow-600 dark:text-yellow-400" />
                            <span>Early/Experimental</span>
                          </div>
                        </td>
                        <td className="py-3 px-4">
                          <div className="flex items-center gap-2">
                            <Check className="w-4 h-4 text-green-600 dark:text-green-400" />
                            <span>Mature</span>
                          </div>
                        </td>
                        <td className="py-3 px-4">
                          <div className="flex items-center gap-2">
                            <Check className="w-4 h-4 text-green-600 dark:text-green-400" />
                            <span>Mature</span>
                          </div>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Comparison Table 2: Typegres vs ORMs */}
              <div>
                <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
                  Typegres vs ORMs (Prisma, Drizzle, etc.)
                </h3>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-6">
                  Unlike ORMs (which are local dev tools), Typegres is designed for exposing your database over RPC. You
                  can use it alongside your ORM, or as a standalone API layer.
                </p>
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr className="border-b border-gray-300 dark:border-gray-700">
                        <th className="text-left py-3 px-4 font-semibold text-gray-900 dark:text-white"></th>
                        <th className="text-left py-3 px-4 font-semibold text-gray-900 dark:text-white">Typegres</th>
                        <th className="text-left py-3 px-4 font-semibold text-gray-900 dark:text-white">
                          ORMs (Prisma, Drizzle, etc.)
                        </th>
                      </tr>
                    </thead>
                    <tbody className="text-gray-600 dark:text-gray-400">
                      <tr className="border-b border-gray-200 dark:border-gray-800">
                        <td className="py-3 px-4 font-medium text-gray-900 dark:text-white">Purpose</td>
                        <td className="py-3 px-4">
                          <div className="flex items-center gap-2">
                            <Check className="w-4 h-4 text-green-600 dark:text-green-400" />
                            <span>API framework</span>
                          </div>
                        </td>
                        <td className="py-3 px-4">
                          <div className="flex items-center gap-2">
                            <AlertTriangle className="w-4 h-4 text-yellow-600 dark:text-yellow-400" />
                            <span>Local dev tool</span>
                          </div>
                        </td>
                      </tr>
                      <tr className="border-b border-gray-200 dark:border-gray-800">
                        <td className="py-3 px-4 font-medium text-gray-900 dark:text-white">Security model</td>
                        <td className="py-3 px-4">
                          <div className="flex items-center gap-2">
                            <Check className="w-4 h-4 text-green-600 dark:text-green-400" />
                            <span>Capability-based</span>
                          </div>
                        </td>
                        <td className="py-3 px-4">
                          <div className="flex items-center gap-2">
                            <AlertTriangle className="w-4 h-4 text-yellow-600 dark:text-yellow-400" />
                            <span>N/A</span>
                          </div>
                        </td>
                      </tr>
                      <tr className="border-b border-gray-200 dark:border-gray-800">
                        <td className="py-3 px-4 font-medium text-gray-900 dark:text-white">Refactor safety</td>
                        <td className="py-3 px-4">
                          <div className="flex items-center gap-2">
                            <Check className="w-4 h-4 text-green-600 dark:text-green-400" />
                            <span>Safe schema evolution</span>
                          </div>
                        </td>
                        <td className="py-3 px-4">
                          <div className="flex items-center gap-2">
                            <X className="w-4 h-4 text-red-600 dark:text-red-400" />
                            <span>Breaking changes</span>
                          </div>
                        </td>
                      </tr>
                      <tr className="border-b border-gray-200 dark:border-gray-800">
                        <td className="py-3 px-4 font-medium text-gray-900 dark:text-white">Maturity/Ecosystem</td>
                        <td className="py-3 px-4">
                          <div className="flex items-center gap-2">
                            <AlertTriangle className="w-4 h-4 text-yellow-600 dark:text-yellow-400" />
                            <span>Early/Experimental</span>
                          </div>
                        </td>
                        <td className="py-3 px-4">
                          <div className="flex items-center gap-2">
                            <Check className="w-4 h-4 text-green-600 dark:text-green-400" />
                            <span>Mature</span>
                          </div>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Other FAQs */}
              <div className="space-y-8">
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                    Q: What about raw SQL + Row Level Security (RLS)?
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-3">
                    <strong>tl;dr</strong> Raw SQL + RLS has existed for almost a decade. Still, no one lets untrusted
                    SQL run against their database.
                  </p>
                  <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                    A raw SQL approach has many drawbacks, but the most fundamental is applications need application
                    code, not just SQL (e.g., calling external APIs, JSON validation).
                  </p>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                    Q: What about query performance?
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-3">
                    Every query maps directly 1:1 to the single Postgres query you'd expect.
                  </p>
                  <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                    Note that relations are expressed as correlated subqueries, not raw joins, which modern versions of
                    Postgres should optimize. This idea may be revisited later.
                  </p>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                    Q: How does the RPC layer actually work?
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                    Using the amazing{" "}
                    <a
                      href="https://github.com/cloudflare/capnweb"
                      className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 underline font-medium transition-colors"
                    >
                      Cap'n Web
                    </a>{" "}
                    project. It enables an RPC layer that naturally allows composing over a set of classes/methods
                    safely in a single RPC call.
                  </p>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                    Q: What's the actual security model under the hood?
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                    The model is <strong>capability-based</strong> security. Instead of reactive security (a blacklist)
                    the framework explicitly guides you to define your allowed surface area (your classes and methods)
                    and enforces that all queries go through it.
                  </p>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">Q: What about DoS?</h3>
                  <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                    Currently we recommend query timeouts. (Other options include cost calculations and limiting number
                    of tables allowed per query).
                  </p>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                    Q: What's the project status?
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                    This is a research preview and not ready for production use. Try the{" "}
                    <a
                      href="/play"
                      className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 underline font-medium transition-colors"
                    >
                      playground
                    </a>{" "}
                    to see the latest features and open a discussion or issue on{" "}
                    <a
                      href="https://github.com/ryanrasti/typegres"
                      className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 underline font-medium transition-colors"
                    >
                      GitHub
                    </a>{" "}
                    if you have questions.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
