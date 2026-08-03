import { Relation, sql, expose } from "typegres";
import { Int8, Text, Timestamptz } from "typegres/postgres";
import { db } from "../runtime";
import { Orders } from "./orders";
import { Organizations } from "./organizations";
export class Shipments extends db.Table("shipments", { live: true }) {
  // @generated-start
  @expose() id = Int8.column({ nonNull: true, generated: true });
  @expose() organization_id = Int8.column({ nonNull: true });
  @expose() order_id = Int8.column({ nonNull: true });
  @expose() carrier = Text.column({ nonNull: true });
  @expose() cutoff_at = Timestamptz.column({ nonNull: true });
  @expose() shipped_at = Timestamptz.column();
  @expose() status = Text.column({ nonNull: true, default: sql`'pending'::text` });
  // relations
  @expose() order() { return Relation.belongsTo(this, Orders, { id: this.order_id }); }
  @expose() organization() { return Relation.belongsTo(this, Organizations, { id: this.organization_id }); }
  // @generated-end
}
