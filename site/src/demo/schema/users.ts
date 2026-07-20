import { expose } from "typegres";
import { Int8, Text } from "typegres/postgres";
import { db } from "../runtime";
import { Organizations } from "./organizations";
export class Users extends db.Table("users", { live: true }) {
  // @generated-start
  @expose() id = (Int8<1>).column({ nonNull: true, generated: true });
  @expose() organization_id = (Int8<1>).column({ nonNull: true });
  @expose() name = (Text<1>).column({ nonNull: true });
  @expose() email = (Text<1>).column({ nonNull: true });
  @expose() role = (Text<1>).column({ nonNull: true });
  @expose() token = (Text<1>).column({ nonNull: true });
  // relations
  @expose() organization() { return Organizations.scope(Users.contextOf(this)).where(({ organizations }) => organizations.id["="](this.organization_id)).cardinality("one"); }
  // @generated-end
}
