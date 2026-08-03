import { Relation, expose } from "typegres";
import { Int8, Text } from "typegres/postgres";
import { db } from "../runtime";
import { Orders } from "./orders";
import { Organizations } from "./organizations";
export class Customers extends db.Table("customers", { live: true }) {
  // @generated-start
  @expose() id = Int8.column({ nonNull: true, generated: true });
  @expose() organization_id = Int8.column({ nonNull: true });
  @expose() name = Text.column({ nonNull: true });
  @expose() email = Text.column({ nonNull: true });
  // relations
  @expose() organization() { return Relation.belongsTo(this, Organizations, { id: this.organization_id }); }
  @expose() orders() { return Relation.has(this, Orders, { customer_id: this.id }); }
  // @generated-end
}
