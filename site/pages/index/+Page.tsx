import { motion } from 'framer-motion'
import { ArrowRight, Code, Database, Zap, Shield, CheckCircle } from 'lucide-react'

export default function Page() {
  return (
    <main className="min-h-screen bg-white dark:bg-typegres-dark">
      <div className="absolute inset-0 bg-dot-pattern opacity-50" />
      
      <nav className="relative z-10 flex items-center justify-between p-6 lg:px-8">
        <div className="flex lg:flex-1">
          <motion.a 
            href="/" 
            className="-m-1.5 p-1.5 flex items-center gap-4"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex items-center gap-2">
              <img src="/typegres_icon.svg" alt="Typegres" className="h-10 w-auto" />
              <span className="text-3xl font-bold">
                <span className="text-typegres-dark dark:text-white">type</span>
                <span className="text-typegres-blue">gres</span>
              </span>
            </div>
          </motion.a>
        </div>
        <motion.div 
          className="flex gap-x-6"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <a href="/docs" className="text-sm font-semibold text-typegres-gray dark:text-gray-300 hover:text-typegres-blue transition-colors">
            Documentation
          </a>
          <a href="/playground" className="text-sm font-semibold text-typegres-gray dark:text-gray-300 hover:text-typegres-blue transition-colors">
            Playground
          </a>
          <a href="https://github.com/yourusername/typegres" className="text-sm font-semibold text-typegres-gray dark:text-gray-300 hover:text-typegres-blue transition-colors">
            GitHub
          </a>
        </motion.div>
      </nav>

      <div className="relative px-6 lg:px-8 pt-20 pb-32">
        <div className="mx-auto max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-center"
          >
            <h1 className="text-5xl sm:text-7xl font-bold tracking-tight text-typegres-dark dark:text-white mb-8">
              PostgreSQL,{' '}
              <span className="relative">
                <span className="gradient-text">
                  expressed in TypeScript
                </span>
              </span>
            </h1>
            
            <motion.p 
              className="text-xl sm:text-2xl text-typegres-gray dark:text-gray-300 mb-12 leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
            >
              Type-safe SQL queries that feel natural. No ORM magic, just pure PostgreSQL with complete TypeScript support.
            </motion.p>

            <motion.div 
              className="flex flex-col sm:flex-row gap-4 justify-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.7 }}
            >
              <a
                href="/docs/quickstart"
                className="inline-flex items-center gap-2 rounded-full bg-typegres-blue px-8 py-4 text-lg font-semibold text-white shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
              >
                Get Started
                <ArrowRight className="w-5 h-5" />
              </a>
              <a
                href="/playground"
                className="inline-flex items-center gap-2 rounded-full border-2 border-typegres-blue text-typegres-blue dark:text-white px-8 py-4 text-lg font-semibold hover:bg-typegres-blue hover:text-white transition-all duration-200"
              >
                Try it Live
                <Code className="w-5 h-5" />
              </a>
            </motion.div>
          </motion.div>

          <motion.div 
            className="mt-32 grid grid-cols-1 md:grid-cols-3 gap-8"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.9 }}
          >
            <motion.div 
              className="relative group"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <div className="absolute inset-0 bg-typegres-blue rounded-2xl blur-xl opacity-0 group-hover:opacity-20 transition-opacity" />
              <div className="relative bg-white dark:bg-gray-800 rounded-2xl p-8 border border-gray-200 dark:border-gray-700 shadow-sm">
                <Database className="w-12 h-12 text-typegres-blue mb-4" />
                <h3 className="text-xl font-semibold text-typegres-dark dark:text-white mb-2">100% PostgreSQL</h3>
                <p className="text-typegres-gray dark:text-gray-400">
                  Use every PostgreSQL feature with full type safety. No abstractions, no limitations.
                </p>
              </div>
            </motion.div>

            <motion.div 
              className="relative group"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <div className="absolute inset-0 bg-typegres-blue rounded-2xl blur-xl opacity-0 group-hover:opacity-20 transition-opacity" />
              <div className="relative bg-white dark:bg-gray-800 rounded-2xl p-8 border border-gray-200 dark:border-gray-700 shadow-sm">
                <Shield className="w-12 h-12 text-typegres-blue mb-4" />
                <h3 className="text-xl font-semibold text-typegres-dark dark:text-white mb-2">Type-Safe by Design</h3>
                <p className="text-typegres-gray dark:text-gray-400">
                  Auto-generated types from your database schema. Catch errors at compile time.
                </p>
              </div>
            </motion.div>

            <motion.div 
              className="relative group"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <div className="absolute inset-0 bg-typegres-blue rounded-2xl blur-xl opacity-0 group-hover:opacity-20 transition-opacity" />
              <div className="relative bg-white dark:bg-gray-800 rounded-2xl p-8 border border-gray-200 dark:border-gray-700 shadow-sm">
                <Zap className="w-12 h-12 text-typegres-blue mb-4" />
                <h3 className="text-xl font-semibold text-typegres-dark dark:text-white mb-2">Lightning Fast</h3>
                <p className="text-typegres-gray dark:text-gray-400">
                  Zero runtime overhead. Compiles to native PostgreSQL queries with optimal performance.
                </p>
              </div>
            </motion.div>
          </motion.div>

          <motion.div
            className="mt-32 text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1.2 }}
          >
            <h2 className="text-3xl font-bold text-typegres-dark dark:text-white mb-8">Write SQL that feels like TypeScript</h2>
            <div className="bg-gray-50 dark:bg-gray-900 rounded-2xl p-8 border border-gray-200 dark:border-gray-700 text-left max-w-2xl mx-auto">
              <pre className="text-sm sm:text-base overflow-x-auto">
                <code className="language-typescript text-typegres-dark dark:text-gray-300">{`import { db } from './db'
import { users, posts } from './schema'

const activeUsers = await db
  .select({
    id: users.id,
    name: users.name,
    postCount: count(posts.id)
  })
  .from(users)
  .leftJoin(posts, eq(posts.userId, users.id))
  .where(eq(users.active, true))
  .groupBy(users.id)
  .having(gt(count(posts.id), 5))

// TypeScript knows exactly what you'll get:
// activeUsers: Array<{
//   id: number;
//   name: string;
//   postCount: number;
// }>`}</code>
              </pre>
            </div>
          </motion.div>

          <motion.div 
            className="mt-32"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.4 }}
          >
            <h2 className="text-3xl font-bold text-typegres-dark dark:text-white mb-8 text-center">Why developers love Typegres</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                "Full PostgreSQL feature support",
                "Zero runtime dependencies",
                "Type-safe migrations",
                "Automatic schema inference",
                "IDE autocompletion",
                "Compile-time validation"
              ].map((feature, index) => (
                <motion.div
                  key={feature}
                  className="flex items-center gap-3"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 1.5 + index * 0.1 }}
                >
                  <CheckCircle className="w-5 h-5 text-typegres-blue flex-shrink-0" />
                  <span className="text-typegres-gray dark:text-gray-300">{feature}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </main>
  )
}