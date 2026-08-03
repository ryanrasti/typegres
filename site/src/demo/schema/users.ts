import { Relation, expose } from "typegres";
import { Int8, Text } from "typegres/postgres";
import { db } from "../runtime";
import { Organizations } from "./organizations";
export class Users extends db.Table("users", { live: true }) {
  // @generated-start
  @expose() id = Int8.column({ nonNull: true, generated: true });
  @expose() organization_id = Int8.column({ nonNull: true });
  @expose() name = Text.column({ nonNull: true });
  @expose() email = Text.column({ nonNull: true });
  @expose() role = Text.column({ nonNull: true });
  @expose() token = Text.column({ nonNull: true });
  // relations
  @expose() organization() { return Relation.belongsTo(this, Organizations, { id: this.organization_id }); }
  // @generated-end
}
