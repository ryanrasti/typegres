# Oracle Notes

This is a deliberately small notes app running on Oracle Database 23. The app itself is basic: create notes, edit them, and delete them. The interesting part is how it is implemented.

## The data model is the API

In Typegres, the backend data model is also the application API. The model in [`server/api.ts`](server/api.ts) has only two tables: `Users` and `Notes`. Members are selectively exposed as capabilities. A note exposes the fields the browser needs, while a user never exposes `password_hash`.

The browser starts with a root `Api` capability. Each HTTP batch logs in and pipelines the resulting `Users` capability through the rest of the operation. From that user, the browser can follow `Users.notes()`, a `Relation.has` edge containing only that user's notes.

The browser then composes ordinary typed query operations over the relation it can reach. For example, the notes list adds `orderBy()` and `select()` on the frontend. That query expression travels over Cap'n Web RPC, Typegres compiles it on the server, and Oracle executes the resulting SQL.

This means a feature such as title search belongs in the frontend query: add a search input and conditionally add a `where()` clause to the existing notes relation. Oracle's operators and built-in functions remain available with TypeScript types, and the filter is pushed down to Oracle. The client can author a new database query without adding a server endpoint or changing the authority boundary.

Mutations follow the same graph. The user capability exposes note creation and supplies `this.id` as the new note's `user_id`. Once the frontend reaches one note through the user's relation, that note grants the ability to update or delete itself.

Three properties of this model are particularly useful for agent-authored applications:

1. Clients retain much of SQL's compositional power within the boundaries they have been given.
2. Reads and mutations follow the same authority graph instead of reproducing it across CRUD endpoints and a separate policy layer.
3. The main review surface is one file describing the data, relationships, allowed queries, and mutations—and that file is also the API.

That is the durable core: the application and its authority model remain separate from the many clients or agent-authored interfaces that may use it.

## Local development

From the repository root:

```bash
npm install
npm run build
bin/startora
npm install --prefix examples/oracle-notes
```

Then start the API server and Vite together:

```bash
npm run dev --prefix examples/oracle-notes
```

Development defaults to `oracle://typegres:typegres@localhost:1521/FREEPDB1`. Set `ORACLE_URL` before running the command to override it.

Open <http://localhost:5173>. A new username creates an account; later logins must provide the same password.

## Fly deployment

The demo uses two private-networked Fly apps:

- Node application: standard multi-stage Docker image, HTTP exposed through Fly Proxy.
- Oracle: `gvenzl/oracle-free:23-slim`, private port 1521, one persistent volume. The non-faststart image initializes its database files on the mounted volume.

Copy and edit the deployment configuration:

```bash
cp examples/oracle-notes/.env.example examples/oracle-notes/.env
$EDITOR examples/oracle-notes/.env
examples/oracle-notes/deploy.sh
```

`NOTES_DOMAIN` is intentionally deployment configuration. After deployment, `flyctl certs show` prints the A/AAAA or CNAME records to add at the domain's current DNS provider; Fly provisions and renews TLS.

The Oracle Machine remains running because database cold starts are expensive. The Node Machine also keeps one instance running so the demo does not pay an application cold-start penalty.

### Useful commands

```bash
flyctl logs --app "$FLY_APP"
flyctl logs --app "$FLY_ORACLE_APP"
flyctl proxy 1521:1521 --app "$FLY_ORACLE_APP"
```

The Oracle volume is tied to its region and is not replicated. This deployment is a demo, not a production topology.

## Security scope

The example demonstrates the same login scheme as the chat sample: PBKDF2 claims a username on first login. Each HTTP RPC operation logs in and hydrates the user before following its note relation. Notes are always filtered and mutated by the authenticated user ID on the server. It intentionally omits password reset, rate limiting, lockout, CSRF hardening for cross-origin hosting, and production database operations.
