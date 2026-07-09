-- SQLite schema. Read by `migrate.ts` (runs against ./dev.db so
-- `tg generate` has something to introspect) and by `dogs.test.ts`
-- (runs against :memory: so each test run is hermetic).

CREATE TABLE teams (
  id   INTEGER PRIMARY KEY,
  name TEXT NOT NULL
);

CREATE TABLE dogs (
  id      INTEGER PRIMARY KEY,
  name    TEXT NOT NULL,
  breed   TEXT,
  team_id INTEGER NOT NULL REFERENCES teams(id)
);
