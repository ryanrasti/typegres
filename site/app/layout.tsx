import type { Metadata } from 'next'
import './globals.css'
import { DarkModeToggle } from '@/components/DarkModeToggle'

export const metadata: Metadata = {
  title: 'Typegres - PostgreSQL, expressed in TypeScript',
  description: 'Import the full power of Postgres as a TypeScript library.',
  icons: {
    icon: '/typegres_favicon.svg',
    apple: '/typegres_favicon.svg',
  },
  openGraph: {
    title: 'Typegres - PostgreSQL, expressed in TypeScript',
    description: 'Import the full power of Postgres as a TypeScript library.',
    url: 'https://typegres.com',
    siteName: 'Typegres',
    type: 'website',
    images: [
      {
        url: '/typegres_logo.svg',
        width: 512,
        height: 512,
        alt: 'Typegres - PostgreSQL, expressed in TypeScript',
      },
    ],
  },
  twitter: {
    card: 'summary',
    title: 'Typegres - PostgreSQL, expressed in TypeScript',
    description: 'Import the full power of Postgres as a TypeScript library.',
    images: ['/typegres_logo.svg'],
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <script defer data-domain="typegres.com" src="https://plausible.io/js/script.js"></script>
      </head>
      <body>
        {children}
        <DarkModeToggle />
      </body>
    </html>
  )
}