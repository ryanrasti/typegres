import { db } from "../db";
import { Int8, Text, Timestamptz } from "typegres/types";
import { tool } from "typegres/exoeval";
import { Orders } from "./orders";
import { Organizations } from "./organizations";
import { sql } from "typegres/sql-builder";

export class Customers extends db.Table("customers") {
  // @generated-start
  @tool() id = (Int8<1>).column({ nonNull: true, generated: true });
  @tool() name = (Text<1>).column({ nonNull: true });
  @tool() email = (Text<1>).column({ nonNull: true });
  @tool() created_at = (Timestamptz<1>).column({ nonNull: true, default: sql`now()` });
  @tool() organization_id = (Int8<1>).column({ nonNull: true });
  // relations
  @tool() organization() { return Organizations.from().where(({ organizations }) => organizations.id["="](this.organization_id)).cardinality("one"); }
  @tool() orders() { return Orders.from().where(({ orders }) => orders.customer_id["="](this.id)).cardinality("many"); }
  // @generated-end
}
