# Agent notes

Conventions that aren't lint-enforced. If you're writing code in this repo, follow these.

## Type identifiers

- **Don't use TS's `Record<K, V>` utility type.** Use `{ [k: K]: V }` directly.

  Reason: typegres exports its own `Record` class (the pg composite/row type), and `Record<K, V>` as a type position resolves to TS's global utility — they're not the same shape, and the visual collision causes confusion. ESLint can't distinguish the two reliably (it's identifier-name-based, not type-aware), so this is a convention rather than a lint rule.

  ```ts
  // Don't:
  const headers: Record<string, string> = {};

  // Do:
  const headers: { [k: string]: string } = {};
  ```

  Using the typegres `Record` class as a type (e.g. `Record<O, 1>` as a return of `scalar()`) is fine — that's the intended use of the exported class.

## Comments describe present code, not deleted code

- Don't leave comments that reference something you removed ("X removed", "no longer supports Y", "used to do Z"). They rot as history moves on and confuse readers who don't have the deleted code in mind. The commit message and git history are where that context lives.

  If a comment needs to explain the *absence* of an obvious thing (e.g. no `sql.ident` helper), phrase it as a positive statement about the current design and why:

  ```ts
  // Don't:
  // Untagged Ident construction removed. Callers who need a schema-
  // referencing identifier go through `db.scopedIdent(name)`.

  // Do:
  // No `sql.ident` helper: schema-referencing identifiers must carry
  // a DatabaseRef for the compile-time provenance check, so callers
  // go through `db.scopedIdent(name)`.
  ```
