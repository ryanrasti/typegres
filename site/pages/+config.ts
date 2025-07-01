import type { Config } from 'vike/types'
import vikeReact from 'vike-react/config'

export default {
  extends: vikeReact,
  title: 'Typegres - PostgreSQL, expressed in TypeScript',
  description: 'Type-safe PostgreSQL queries with TypeScript',
  lang: 'en',
  passToClient: ['pageProps'],
  clientRouting: true,
  hydrationCanBeAborted: true
} satisfies Config