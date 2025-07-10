"use client";

import { CodeBlock } from "@/components/CodeBlock";
import { UnderConstructionBanner } from "@/components/UnderConstructionBanner";
import { InlineCodeExample } from "@/components/InlineCodeExample";
import { motion } from "framer-motion";
import { ArrowRight, Bot, Code, Database, Shield, Github } from "lucide-react";

export default function HomePage() {
  return (
    <>
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
                <img
                  src="/typegres_icon.svg"
                  alt="Typegres"
                  className="h-8 sm:h-10 w-auto"
                />
                <span className="text-2xl sm:text-3xl font-bold">
                  <span className="text-typegres-dark dark:text-white">
                    type
                  </span>
                  <span className="text-typegres-blue">gres</span>
                </span>
              </div>
            </motion.a>
          </div>
          <motion.div
            className="hidden sm:flex gap-x-6"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <a
              href="/docs"
              className="text-sm font-semibold text-typegres-gray dark:text-gray-300 hover:text-typegres-blue transition-colors"
            >
              Documentation
            </a>
            <a
              href="/play"
              className="text-sm font-semibold text-typegres-gray dark:text-gray-300 hover:text-typegres-blue transition-colors"
            >
              Playground
            </a>
            <a
              href="https://github.com/ryanrasti/typegres"
              className="text-sm font-semibold text-typegres-gray dark:text-gray-300 hover:text-typegres-blue transition-colors"
            >
              GitHub
            </a>
          </motion.div>
        </nav>

        <div className="relative px-6 lg:px-8 py-12">
          <div className="mx-auto max-w-7xl">
            <div className="grid lg:grid-cols-5 gap-8 items-center">
              {/* Left side - Text and CTAs */}
              <motion.div
                initial={{ opacity: 0, x: -40 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="text-center lg:text-left lg:col-span-2"
              >
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-typegres-dark dark:text-white mb-4">
                  PostgreSQL,
                  <br />
                  <span className="relative">
                    <span className="gradient-text">expressed in TypeScript</span>
                  </span>
                </h1>

                <motion.p
                  className="text-lg sm:text-xl text-typegres-gray dark:text-gray-300 mb-8 leading-relaxed max-w-md mx-auto lg:mx-0"
                  initial={{ opacity: 0, x: -40 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: 0.5 }}
                >
                  Import the full power of Postgres as a TypeScript library.
                </motion.p>

                <motion.div
                  className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
                  initial={{ opacity: 0, x: -40 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: 0.7 }}
                >
                  <a
                    href="/play"
                    className="inline-flex items-center gap-2 rounded-full bg-typegres-blue px-6 py-3 text-base font-semibold text-white shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
                  >
                    Try it Live
                    <Code className="w-4 h-4" />
                  </a>
                  <a
                    href="https://github.com/ryanrasti/typegres"
                    className="inline-flex items-center gap-2 rounded-full border-2 border-typegres-blue text-typegres-blue dark:text-white px-6 py-3 text-base font-semibold hover:bg-typegres-blue hover:text-white transition-all duration-200"
                  >
                    View on GitHub
                    <Github className="w-4 h-4" />
                  </a>
                </motion.div>
              </motion.div>

              {/* Right side - GIF */}
              <motion.div
                className="relative lg:col-span-3"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.5 }}
              >
                <motion.div 
                  className="absolute -inset-4 bg-gradient-to-r from-typegres-blue/20 to-purple-500/20 rounded-2xl blur-3xl"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 0.3 }}
                  transition={{ duration: 1.2, delay: 0.6 }}
                />
                <img
                  src="typegres_landing_page_demo.gif"
                  alt="Typegres Demo"
                  className="relative rounded-xl shadow-2xl w-full h-auto"
                  style={{ maxWidth: "900px", width: "100%" }}
                />
              </motion.div>
            </div>
          </div>
        </div>

        {/* Features section */}
        <section className="bg-gray-50 dark:bg-gray-900 py-24">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <motion.div
              className="text-center mb-16"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.9 }}
            >
              <h2 className="text-3xl sm:text-4xl font-bold text-typegres-dark dark:text-white mb-4">
                What makes Typegres different
              </h2>
              <p className="text-lg text-typegres-gray dark:text-gray-300 max-w-2xl mx-auto">
                A new approach to working with SQL - currently in developer preview
              </p>
            </motion.div>

            <motion.div
              className="grid grid-cols-1 md:grid-cols-3 gap-8"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.0 }}
            >
              <motion.div
                className="relative group"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <div className="absolute inset-0 bg-typegres-blue rounded-2xl blur-xl opacity-0 group-hover:opacity-20 transition-opacity" />
                <div className="relative bg-white dark:bg-gray-800 rounded-2xl p-10 border border-gray-200 dark:border-gray-700 shadow-sm h-full">
                  <Database className="w-14 h-14 text-typegres-blue mb-6" />
                  <h3 className="text-2xl font-semibold text-typegres-dark dark:text-white mb-4">
                    Not an ORM
                  </h3>
                  <p className="text-base text-typegres-gray dark:text-gray-400 mb-4">
                    Every Postgres function exists as a TypeScript method - no abstraction layer.
                  </p>
                  <InlineCodeExample code={`await Jsonb.new('{"a":1,"b":2}')
  .jsonbEach()
  .select(({ key, value }) => ({
    key: key.textcat("!"),
    type: value.jsonbTypeof()
  }))`} />
                </div>
              </motion.div>

              <motion.div
                className="relative group"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <div className="absolute inset-0 bg-typegres-blue rounded-2xl blur-xl opacity-0 group-hover:opacity-20 transition-opacity" />
                <div className="relative bg-white dark:bg-gray-800 rounded-2xl p-10 border border-gray-200 dark:border-gray-700 shadow-sm h-full">
                  <Shield className="w-14 h-14 text-typegres-blue mb-6" />
                  <h3 className="text-2xl font-semibold text-typegres-dark dark:text-white mb-4">
                    Zero SQL Strings
                  </h3>
                  <p className="text-base text-typegres-gray dark:text-gray-400 mb-4">
                    Write complex queries as pure TypeScript with complete type inference.
                  </p>
                  <InlineCodeExample code={`await pets
  .groupBy(p => [p.species])
  .select((p, [species]) => ({
    species,
    avgAge: p.age.avg(),
    stddev: p.age.stddevPop(),
    total: p.id.count()
  }))`} />
                </div>
              </motion.div>

              <motion.div
                className="relative group"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <div className="absolute inset-0 bg-typegres-blue rounded-2xl blur-xl opacity-0 group-hover:opacity-20 transition-opacity" />
                <div className="relative bg-white dark:bg-gray-800 rounded-2xl p-10 border border-gray-200 dark:border-gray-700 shadow-sm h-full">
                  <Bot className="w-14 h-14 text-typegres-blue mb-6" />
                  <h3 className="text-2xl font-semibold text-typegres-dark dark:text-white mb-4">
                    One Language
                  </h3>
                  <p className="text-base text-typegres-gray dark:text-gray-400 mb-4">
                    Query and transform data without context switching between SQL and code.
                  </p>
                  <InlineCodeExample code={`db.users
  .join(db.posts, 'p', (u, { p }) => 
    u.id['='](p.author_id))
  .select((u, { p }) => ({
    username: u.email
      .regexpReplace('@.*$', '')
      .lower(),
    postTitle: p.title,
  }))
  .where((u) => u.is_active)`} />
                </div>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Footer CTA Section */}
        <section className="py-24">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <motion.div
              className="text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.2 }}
            >
              <h2 className="text-3xl sm:text-4xl font-bold text-typegres-dark dark:text-white mb-4">
                Ready to dive in?
              </h2>
              <p className="text-lg text-typegres-gray dark:text-gray-300 mb-8 max-w-2xl mx-auto">
                Experience the power of PostgreSQL with the safety and convenience of TypeScript.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="/play"
                  className="inline-flex items-center gap-2 rounded-full bg-typegres-blue px-8 py-4 text-lg font-semibold text-white shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
                >
                  Try it Live
                  <Code className="w-5 h-5" />
                </a>
                <a
                  href="https://github.com/ryanrasti/typegres"
                  className="inline-flex items-center gap-2 rounded-full border-2 border-typegres-blue text-typegres-blue dark:text-white px-8 py-4 text-lg font-semibold hover:bg-typegres-blue hover:text-white transition-all duration-200"
                >
                  View on GitHub
                  <Github className="w-5 h-5" />
                </a>
              </div>
            </motion.div>
          </div>
        </section>
      </main>
    </>
  );
}
