// Astro's `client:only` hydrates the default export of this file.
// _PlayPageInner is the eager shell; inside it, _PlayActiveArea is
// loaded lazily behind a Suspense boundary so PGlite doesn't gate
// the editor / file tree from rendering.

import { Component, type ReactNode } from "react";
import PlayPageInner from "./_PlayPageInner";

// Catch silent render-time throws (lazy chunk failures, runtime
// errors during hydration) and surface them on the page so they
// don't manifest as a blank screen with nothing in the console.
class ErrorBoundary extends Component<
  { children: ReactNode },
  { error: Error | null }
> {
  state = { error: null as Error | null };
  static getDerivedStateFromError(error: Error) {
    return { error };
  }
  componentDidCatch(error: Error, info: unknown) {
    // eslint-disable-next-line no-console
    console.error("[PlayPage error boundary]", error, info);
  }
  render() {
    if (this.state.error) {
      return (
        <main className="min-h-screen bg-gray-950 text-gray-200 flex items-center justify-center p-8">
          <pre className="text-xs font-mono text-red-400 whitespace-pre-wrap max-w-3xl">
            {this.state.error.message}
            {"\n\n"}
            {this.state.error.stack}
          </pre>
        </main>
      );
    }
    return this.props.children;
  }
}

export default function PlayPage() {
  return (
    <ErrorBoundary>
      <PlayPageInner />
    </ErrorBoundary>
  );
}
