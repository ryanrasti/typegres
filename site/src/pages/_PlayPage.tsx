// _PlayPageInner is the eager shell — it renders header, Monaco
// editor, file tree synchronously. Inside it, _PlayActiveArea is
// loaded lazily behind a Suspense boundary; the visitor sees the
// editor right away and the table area fills in once PGlite has
// booted.

export { default } from "./_PlayPageInner";
