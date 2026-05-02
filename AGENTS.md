# Repo conventions

## Code style

- Prefer inlining functions and constants when simple and used <3 times.
  A two-line helper called once costs more in indirection than it saves —
  reach for a name once a third call site shows up.
