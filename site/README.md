# Typegres Documentation Site

This is the documentation and playground site for Typegres, built with Vite + Vike.

## Features

- **Landing Page**: High-energy, animated landing page showcasing Typegres features
- **Documentation**: Overview and quickstart guide
- **API Reference**: Auto-generated from TypeScript comments using TypeDoc
- **SQL Playground**: Interactive TypeScript editor with live PostgreSQL (via PGlite WASM)

## Development

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Open http://localhost:5173
```

## Building

```bash
# Build the static site
npm run build

# The output will be in the 'dist' directory

# Preview the production build
npm run preview
```

## Structure

- `/` - Landing page with animations and feature highlights
- `/docs` - Documentation overview
- `/docs/quickstart` - Quick start guide
- `/play` - Interactive TypeScript playground with Monaco editor
- `/api` - Auto-generated API reference (after running build:docs)

## Technologies

- Vite + Vike (SSG framework)
- React 19
- TypeScript
- Tailwind CSS
- Framer Motion (animations)
- Monaco Editor (code editor)
- PGlite (WASM PostgreSQL)
- TypeDoc (API documentation)