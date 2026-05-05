// The default-exported function runs when you click Run. Edit it.
// Types and autocomplete come from the imports — Ctrl+Space inside
// the function body to see what's available.

import { db } from "../runtime";
import { Orders } from "../schema/orders";
import { Customers } from "../schema/customers";
import { operatorFromToken } from "../server/api";

export default async function widget() {
  const op = await operatorFromToken("op_brightship_alice");

  // All `op.<table>()` reads are pre-`where`'d to op's organization.
  // Switch the token above to "op_atlas_dave" — same query, different
  // scope, different data.
  return Orders.from()
    .where(({ orders }) => orders.organization_id["="](op.organizationId))
    .where(({ orders }) => orders.status["="]("packed"))
    .select(({ orders }) => ({
      id: orders.id,
      status: orders.status,
      customer: Customers.from()
        .where(({ customers }) => customers.id["="](orders.customer_id))
        .select(({ customers }) => ({ name: customers.name }))
        .cardinality("one")
        .scalar(),
    }))
    .execute(db);
}
