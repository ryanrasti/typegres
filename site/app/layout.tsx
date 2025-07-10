import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Typegres - PostgreSQL, expressed in TypeScript',
  description: 'Import the full power of Postgres as a TypeScript library.',
  icons: {
    icon: '/typegres_favicon.svg',
    apple: '/typegres_favicon.svg',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="dark">
      <head>
        <script defer data-domain="typegres.com" src="https://plausible.io/js/script.js"></script>
      </head>
      <body>
        {children}
      </body>
    </html>
  )
}