// `rpc(async (api) => ...)` is the wire boundary. The closure is
// serialized, sent through the channel, evaluated by exoeval with
// `api` bound to the cap root, and the result comes back as JSON.
// Edit the closure body and click Run.

import { rpc } from "../rpc";

rpc(async (api) => {
  const op = await api.operator("op_brightship_alice");

  // `op.orders()` is pre-`where`'d to op's organization. Switch the
  // token above to "op_atlas_dave" — same query, different scope,
  // different data. Hydrated rows carry `op` as their context, so
  // `order.customer()` traversals stay scoped automatically.
  return op.orders()
    .where(({ orders }) => orders.status["="]("packed"))
    .select(({ orders }) => ({
      id: orders.id,
      status: orders.status,
      customer: orders.customer().select(({ customers }) => customers.name).scalar(),
    }))
    .execute(api.db);
});
