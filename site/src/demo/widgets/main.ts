// `client.run(async (api) => ...)` is the wire boundary. The closure
// is serialized, sent through the channel, evaluated by exoeval with
// `api` bound to the cap root, and the result comes back as JSON.
// Pass the result to `output()` and it renders in the panel on the
// right — Promises render once; AsyncIterables (e.g. `.live(api.db)`)
// keep streaming until you click Stop.

import { client } from "../server/api";

const result = client.run(async (api) => {
  const op = await api.operator("op_brightship_alice");

  return op.orders()
    .groupBy(({ orders }) => [orders.status])
    .orderBy(({ orders }) => orders.status)
    .select(({ orders }) => ({
      status: orders.status,
      count: orders.id.count(),
    }))
    .live(api.db);
});

output(result);
