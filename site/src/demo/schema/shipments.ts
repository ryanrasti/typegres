import { TypegresLiveEvents, sql, expose } from "typegres";
import { Int8, Text, Timestamptz } from "typegres/postgres";
import { db } from "../runtime";
import { Orders } from "./orders";
import { Organizations } from "./organizations";
export class Shipments extends db.Table("shipments", { transformer: TypegresLiveEvents.makeTransformer() }) {
  // @generated-start
  @expose() id = (Int8<1>).column({ nonNull: true, generated: true });
  @expose() organization_id = (Int8<1>).column({ nonNull: true });
  @expose() order_id = (Int8<1>).column({ nonNull: true });
  @expose() carrier = (Text<1>).column({ nonNull: true });
  @expose() cutoff_at = (Timestamptz<1>).column({ nonNull: true });
  @expose() shipped_at = (Timestamptz<0 | 1>).column();
  @expose() status = (Text<1>).column({ nonNull: true, default: sql`'pending'::text` });
  // relations
  @expose() order() { return Orders.scope(Shipments.contextOf(this)).where(({ orders }) => orders.id["="](this.order_id)).cardinality("one"); }
  @expose() organization() { return Organizations.scope(Shipments.contextOf(this)).where(({ organizations }) => organizations.id["="](this.organization_id)).cardinality("one"); }
  // @generated-end
}
