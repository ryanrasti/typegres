import { db } from "../db";
import { expose, sql } from "typegres";
import { Int8, Text, Timestamptz } from "typegres/postgres";
import { Teams } from "./teams";
import { Collars } from "./collars";
import { Microchips } from "./microchips";
import { Toys } from "./toys";

export class Dogs extends db.Table("dogs") {
  // @generated-start
  @expose() id = Int8.column({ nonNull: true, generated: true });
  @expose() name = Text.column({ nonNull: true });
  @expose() breed = Text.column();
  @expose() created_at = Timestamptz.column({ nonNull: true, default: sql`now()` });
  @expose() team_id = Int8.column({ nonNull: true });
  @expose() rival_id = Int8.column();
  // relations
  @expose() rival() { return Dogs.scope(Dogs.contextOf(this)).where(({ dogs }) => dogs.id.eq(this.rival_id)).cardinality("maybe"); }
  @expose() team() { return Teams.scope(Dogs.contextOf(this)).where(({ teams }) => teams.id.eq(this.team_id)).cardinality("one"); }
  @expose() collars() { return Collars.scope(Dogs.contextOf(this)).where(({ collars }) => collars.dog_id.eq(this.id)).cardinality("one"); }
  @expose() dogs() { return Dogs.scope(Dogs.contextOf(this)).where(({ dogs }) => dogs.rival_id.eq(this.id)).cardinality("many"); }
  @expose() microchips() { return Microchips.scope(Dogs.contextOf(this)).where(({ microchips }) => microchips.dog_id.eq(this.id)).cardinality("maybe"); }
  @expose() toys() { return Toys.scope(Dogs.contextOf(this)).where(({ toys }) => toys.dog_id.eq(this.id)).cardinality("many"); }
  // @generated-end
}
