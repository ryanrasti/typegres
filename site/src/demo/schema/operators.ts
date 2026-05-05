import { db } from "../runtime";
import { Int8, Text, Timestamptz } from "typegres/types";
import { tool } from "typegres/exoeval";
import { Organizations } from "./organizations";
import { sql } from "typegres/sql-builder";

export class Operators extends db.Table("operators") {
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
