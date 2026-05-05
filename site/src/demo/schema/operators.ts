import { Int8, Text, Timestamptz, TypegresLiveEvents, sql, tool } from "typegres";
import { db } from "../runtime";
import { Organizations } from "./organizations";
export class Operators extends db.Table("operators", { transformer: TypegresLiveEvents.makeTransformer() }) {
  // @generated-start
  @tool() id = (Int8<1>).column({ nonNull: true, generated: true });
  @tool() organization_id = (Int8<1>).column({ nonNull: true });
  @tool() name = (Text<1>).column({ nonNull: true });
  @tool() email = (Text<1>).column({ nonNull: true });
  @tool() role = (Text<1>).column({ nonNull: true });
  @tool() token = (Text<1>).column({ nonNull: true });
  @tool() created_at = (Timestamptz<1>).column({ nonNull: true, default: sql`now()` });
  // relations
  @tool() organization() { return Organizations.scope(Operators.contextOf(this)).where(({ organizations }) => organizations.id["="](this.organization_id)).cardinality("one"); }
  // @generated-end
}
