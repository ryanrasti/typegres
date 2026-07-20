import { expose } from "typegres";
import { Int8, Text } from "typegres/postgres";
import { db } from "../runtime";
import { Orders } from "./orders";
import { Organizations } from "./organizations";
export class Customers extends db.Table("customers", { live: true }) {
  // @generated-start
  @expose() id = (Int8<1>).column({ nonNull: true, generated: true });
  @expose() organization_id = (Int8<1>).column({ nonNull: true });
  @expose() name = (Text<1>).column({ nonNull: true });
  @expose() email = (Text<1>).column({ nonNull: true });
  // relations
  @expose() organization() { return Organizations.scope(Customers.contextOf(this)).where(({ organizations }) => organizations.id["="](this.organization_id)).cardinality("one"); }
  @expose() orders() { return Orders.scope(Customers.contextOf(this)).where(({ orders }) => orders.customer_id["="](this.id)).cardinality("many"); }
  // @generated-end
}
