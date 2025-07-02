import { FileText, Book, Code2, Home } from 'lucide-react'
import { UnderConstructionBanner } from '../../src/components/UnderConstructionBanner'

export default function DocsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-white dark:bg-typegres-dark text-typegres-dark dark:text-white">
      <UnderConstructionBanner />
      <nav className="border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900/50 backdrop-blur sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-8">
              <a href="/" className="flex items-center gap-3">
                <div className="flex items-center gap-2">
                  <img src="/typegres_icon.svg" alt="Typegres" className="h-8 w-auto" />
                  <span className="text-2xl font-bold">
                    <span className="text-typegres-dark dark:text-white">type</span>
                    <span className="text-typegres-blue">gres</span>
                  </span>
                </div>
              </a>
              <div className="flex gap-6">
                <a href="/" className="text-typegres-gray dark:text-gray-300 hover:text-typegres-blue dark:hover:text-typegres-blue transition-colors flex items-center gap-2">
                  <Home className="w-4 h-4" />
                  Home
                </a>
                <a href="/docs" className="text-typegres-blue font-medium flex items-center gap-2">
                  <Book className="w-4 h-4" />
                  Docs
                </a>
                <a href="/playground" className="text-typegres-gray dark:text-gray-300 hover:text-typegres-blue dark:hover:text-typegres-blue transition-colors flex items-center gap-2">
                  <Code2 className="w-4 h-4" />
                  Playground
                </a>
              </div>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex gap-8">
          <aside className="w-64 flex-shrink-0">
            <nav className="space-y-1">
              <a
                href="/docs"
                className="group flex items-center px-3 py-2 text-sm font-medium rounded-md text-typegres-gray dark:text-gray-300 hover:text-typegres-blue dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              >
                <FileText className="mr-3 h-4 w-4" />
                Overview
              </a>
              <a
                href="/docs/quickstart"
                className="group flex items-center px-3 py-2 text-sm font-medium rounded-md text-typegres-gray dark:text-gray-300 hover:text-typegres-blue dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              >
                <Book className="mr-3 h-4 w-4" />
                Quick Start
              </a>
              <a
                href="/api/index.html"
                className="group flex items-center px-3 py-2 text-sm font-medium rounded-md text-typegres-gray dark:text-gray-300 hover:text-typegres-blue dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              >
                <Code2 className="mr-3 h-4 w-4" />
                API Reference
              </a>
            </nav>
          </aside>

          <main className="flex-1 prose dark:prose-invert max-w-none prose-headings:text-typegres-dark dark:prose-headings:text-white prose-a:text-typegres-blue dark:prose-a:text-typegres-blue prose-code:text-typegres-blue dark:prose-code:text-blue-400">
            {children}
          </main>
        </div>
      </div>
    </div>
  )
}