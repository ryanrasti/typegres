import { client } from "../server/api";

const result = client.run(async (api) => {
  // This code is serialized and then (safely) run over RPC.

  // `user` is whoever's selected in the dropdown on the right.
  //  it scopes all operations to the current user.
  const user = await api.currentUser();
  //  ... e.g. user.orders() automatically has a
  //          `where organization_id = ?` inserted into it
  //           so it is scoped to the current user.
  return user.orders()
    .groupBy(({ orders }) => [orders.status])
    .orderBy(({ orders }) => orders.status)
    .select(({ orders }) => ({
      status: orders.status,
      count: orders.id.count(),
    }))
    .live(api.db);
});

// Render the result in the table on the right:
output(result);
