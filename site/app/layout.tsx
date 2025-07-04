import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Typegres - PostgreSQL, expressed in TypeScript',
  description: 'Import the full power of Postgres as a TypeScript library.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="dark">
      <body>
        {children}
      </body>
    </html>
  )
}