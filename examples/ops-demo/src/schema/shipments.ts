import { Int8, Text, Timestamptz, sql, tool } from "typegres";
import { db } from "../db";
import { Orders } from "./orders";
import { Organizations } from "./organizations";
export class Shipments extends db.Table("shipments") {
  // @generated-start
  @tool() id = (Int8<1>).column({ nonNull: true, generated: true });
  @tool() order_id = (Int8<1>).column({ nonNull: true });
  @tool() carrier = (Text<1>).column({ nonNull: true });
  @tool() cutoff_at = (Timestamptz<1>).column({ nonNull: true });
  @tool() shipped_at = (Timestamptz<0 | 1>).column();
  @tool() status = (Text<1>).column({ nonNull: true, default: sql`'pending'::text` });
  @tool() organization_id = (Int8<1>).column({ nonNull: true });
  // relations
  @tool() order() { return Orders.scope(Shipments.contextOf(this)).where(({ orders }) => orders.id["="](this.order_id)).cardinality("one"); }
  @tool() organization() { return Organizations.scope(Shipments.contextOf(this)).where(({ organizations }) => organizations.id["="](this.organization_id)).cardinality("one"); }
  // @generated-end
}
