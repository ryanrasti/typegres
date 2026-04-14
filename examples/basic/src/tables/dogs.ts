import { db } from "../db";
import { Int8, Text, Timestamptz } from "typegres/types";
import { sql } from "typegres/sql-builder";

export class Dogs extends db.Table("dogs") {
  // @generated-start
  id = (Int8<1>).column({ nonNull: true, generated: true });
  name = (Text<1>).column({ nonNull: true });
  breed = (Text<0 | 1>).column();
  created_at = (Timestamptz<1>).column({ nonNull: true, default: sql`now()` });
  // @generated-end
}
