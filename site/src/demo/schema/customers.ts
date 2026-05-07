import { Int8, Text, TypegresLiveEvents, tool } from "typegres";
import { db } from "../runtime";
import { Orders } from "./orders";
import { Organizations } from "./organizations";
export class Customers extends db.Table("customers", { transformer: TypegresLiveEvents.makeTransformer() }) {
  // @generated-start
  @tool() id = (Int8<1>).column({ nonNull: true, generated: true });
  @tool() organization_id = (Int8<1>).column({ nonNull: true });
  @tool() name = (Text<1>).column({ nonNull: true });
  @tool() email = (Text<1>).column({ nonNull: true });
  // relations
  @tool() organization() { return Organizations.scope(Customers.contextOf(this)).where(({ organizations }) => organizations.id["="](this.organization_id)).cardinality("one"); }
  @tool() orders() { return Orders.scope(Customers.contextOf(this)).where(({ orders }) => orders.customer_id["="](this.id)).cardinality("many"); }
  // @generated-end
}
