import { db } from "../db";
import { Int8, Text, Timestamptz } from "typegres/types";
import { tool } from "typegres/exoeval";
import { Customers } from "./customers";
import { OrderLines } from "./order_lines";
import { Organizations } from "./organizations";
import { Shipments } from "./shipments";
import { sql } from "typegres/sql-builder";

export class Orders extends db.Table("orders") {
  // @generated-start
  @tool() id = (Int8<1>).column({ nonNull: true, generated: true });
  @tool() customer_id = (Int8<1>).column({ nonNull: true });
  @tool() status = (Text<1>).column({ nonNull: true, default: sql`'draft'::text` });
  @tool() priority = (Int8<1>).column({ nonNull: true, default: sql`0` });
  @tool() ship_by = (Timestamptz<0 | 1>).column();
  @tool() created_at = (Timestamptz<1>).column({ nonNull: true, default: sql`now()` });
  @tool() organization_id = (Int8<1>).column({ nonNull: true });
  // relations
  @tool() customer() { return Customers.from().where(({ customers }) => customers.id["="](this.customer_id)).cardinality("one"); }
  @tool() organization() { return Organizations.from().where(({ organizations }) => organizations.id["="](this.organization_id)).cardinality("one"); }
  @tool() order_lines() { return OrderLines.from().where(({ order_lines }) => order_lines.order_id["="](this.id)).cardinality("many"); }
  @tool() shipments() { return Shipments.from().where(({ shipments }) => shipments.order_id["="](this.id)).cardinality("many"); }
  // @generated-end
}
