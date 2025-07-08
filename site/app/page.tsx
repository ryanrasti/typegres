"use client";

import { CodeBlock } from "@/components/CodeBlock";
import { UnderConstructionBanner } from "@/components/UnderConstructionBanner";
import { LandingPageEditor } from "@/components/LandingPageEditor";
import { motion } from "framer-motion";
import { ArrowRight, Bot, Code, Database, Shield } from "lucide-react";

export default function HomePage() {
  return (
    <>
      <UnderConstructionBanner />
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
                  className="h-10 w-auto"
                />
                <span className="text-3xl font-bold">
                  <span className="text-typegres-dark dark:text-white">
                    type
                  </span>
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

        <div className="relative px-6 lg:px-8 pt-20 pb-32">
          <div className="mx-auto max-w-3xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="text-center"
            >
              <h1 className="text-5xl sm:text-7xl font-bold tracking-tight text-typegres-dark dark:text-white mb-8">
                PostgreSQL,{" "}
                <span className="relative">
                  <span className="gradient-text">expressed in TypeScript</span>
                </span>
              </h1>

              <motion.p
                className="text-xl sm:text-2xl text-typegres-gray dark:text-gray-300 mb-12 leading-relaxed"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.5 }}
              >
                Import the full power of Postgres as a TypeScript library.
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
                  href="/play"
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
                  <h3 className="text-xl font-semibold text-typegres-dark dark:text-white mb-2">
                    All-in Postgres
                  </h3>
                  <p className="text-typegres-gray dark:text-gray-400">
                    Spend your time going deep in Postgres, not learning a new
                    abstraction.
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
                  <h3 className="text-xl font-semibold text-typegres-dark dark:text-white mb-2">
                    Type-Safe by Design
                  </h3>
                  <p className="text-typegres-gray dark:text-gray-400">
                    Every Postgres type, every Postgres function, with the
                    safety of TypeScript.
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
                  <Bot className="w-12 h-12 text-typegres-blue mb-4" />
                  <h3 className="text-xl font-semibold text-typegres-dark dark:text-white mb-2">
                    Iterate Fast
                  </h3>
                  <p className="text-typegres-gray dark:text-gray-400">
                    Minimize context switching and get immediate feedback for
                    your queries.
                  </p>
                </div>
              </motion.div>
            </motion.div>

            <motion.div
              className="mt-32"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 1.2 }}
            >
              <h2 className="text-3xl font-bold text-typegres-dark dark:text-white mb-8 text-center">
                Write SQL that feels like TypeScript
              </h2>
              <div className="max-w-2xl mx-auto">
                <LandingPageEditor />
              </div>
            </motion.div>
          </div>
        </div>
      </main>
    </>
  );
}
