import { Int8, Text, TypegresLiveEvents, tool } from "typegres";
import { db } from "../runtime";
import { Organizations } from "./organizations";
export class Users extends db.Table("users", { transformer: TypegresLiveEvents.makeTransformer() }) {
  // @generated-start
  @tool() id = (Int8<1>).column({ nonNull: true, generated: true });
  @tool() organization_id = (Int8<1>).column({ nonNull: true });
  @tool() name = (Text<1>).column({ nonNull: true });
  @tool() email = (Text<1>).column({ nonNull: true });
  @tool() role = (Text<1>).column({ nonNull: true });
  @tool() token = (Text<1>).column({ nonNull: true });
  // relations
  @tool() organization() { return Organizations.scope(Users.contextOf(this)).where(({ organizations }) => organizations.id["="](this.organization_id)).cardinality("one"); }
  // @generated-end
}
