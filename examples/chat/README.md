# typegres chat — a Durable Object where the client writes the queries

A chat app on a Cloudflare **Durable Object**, where the browser authors its
own SQL-backed queries — with [typegres] — over **[Cap'n Web]**, and can only
ever reach the capability it was granted.

## Run it

```sh
npm install       # also generates worker-configuration.d.ts
npm run dev       # one process: Vite + workerd (SPA + Worker + DO)
npm test          # DO round-trips + confinement suite, in workerd
npm run deploy    # vite build && wrangler deploy
```

Open two browser profiles on `http://localhost:5173`, claim two usernames,
chat. The feed updates live, and the **wire panel** at the bottom shows every
query the browser authored — with a `❯` prompt to try your own.

## The whole server is one file

You log in and get a `User` capability; everything else — listing rooms, joining,
reading and posting messages — is a query the client composes off of it.
Backing all of it is one file, [`worker/api.ts`](worker/api.ts): **the schema
is the API.**

The row objects are the capabilities, relations are the edges you traverse,
and the amplification points are *facets* — subclasses handed out only at
explicit grant sites:

```
Chat ──login()──► Users.forPrincipal() row            the principal
                    │ memberships() ──► Memberships.forPrincipal() rows
                    │                     │ room() ──► Rooms.forMember(membership) row
                    │                     │                messages() / members() / post()
                    │ createRoom() / joinRoom() ──► the grant (a membership row)
                    └ directory() ──► base Rooms rows    the attenuation floor
```

Example: `Rooms.forMember(membership)` is a facet of `Rooms` issued only to a
member, so `post()` and `messages()` exist *only* once you hold a membership —
a non-member never gets that class, so there's no check to forget. Which is the
whole point: **authorization isn't a layer bolted on top; it's implicit in what
is reachable from where.** `password_hash` is a column that's simply never
exposed, so no client query can read it — yet `login()` can: a method that
hands out a conclusion without the evidence behind it.

## The client composes the queries

Because the builders cross the wire as capabilities, the client refines them —
`where`, `select`, `groupBy` — and the closure replays inside the DO. So a
feature with no server endpoint is just a client-authored query. "Top posters,"
for instance:

```js
doRpc(room, (r) =>
  r.messages()
    .groupBy(({ users }) => [users.name])
    .select(({ users, messages }) => ({ author: users.name, posts: messages.id.count() }))
    .orderBy(({ messages }) => [messages.id.count(), "desc"])
    .execute())
```

It can't reach past the room, because the `room` builder it refined was already
scoped there. Try your own in the wire panel's `❯` prompt — `user`, `room`,
`doRpc`, and `byRef` are in scope. [tests/capabilities.test.ts](tests/capabilities.test.ts)
pins the confinement claims as tests over a real WebSocket.

## Live queries

The same builder with `.live().observe({ onNext })` instead of `.execute()` is
a subscription: the DO re-runs the query on every committed change and pushes
the new rowset back. The callback crosses by reference (`byRef`), pushes are
awaited (so a slow client gets backpressure), and the subscription is confined
exactly like the one-shot query. The chat feed is one of these; flip the
aggregation above and the standings update themselves. It works on arbitrary
queries — joins, aggregations — by decomposing the predicates into an in-memory
index and re-running only the subscriptions a mutation actually affects.

## Built on stock primitives

Stock Durable Objects, and Cap'n Web with a few small patches for record-and-
replay of the client's query closures.

[typegres]: https://github.com/ryanrasti/typegres
[Cap'n Web]: https://blog.cloudflare.com/capnweb-javascript-rpc-library/
