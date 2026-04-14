import { db } from "../db";
import { Int8, Text, Timestamptz } from "typegres/types";
import { Teams } from "./teams";
import { Collars } from "./collars";
import { Microchips } from "./microchips";
import { Toys } from "./toys";
import { sql } from "typegres/sql-builder";

export class Dogs extends db.Table("dogs") {
  // @generated-start
  id = (Int8<1>).column({ nonNull: true, generated: true });
  name = (Text<1>).column({ nonNull: true });
  breed = (Text<0 | 1>).column();
  created_at = (Timestamptz<1>).column({ nonNull: true, default: sql`now()` });
  team_id = (Int8<1>).column({ nonNull: true });
  rival_id = (Int8<0 | 1>).column();
  // relations
  rival = () => Dogs.from().where(({ dogs }) => dogs.id["="](this.rival_id)).cardinality("maybe");
  team = () => Teams.from().where(({ teams }) => teams.id["="](this.team_id)).cardinality("one");
  collars = () => Collars.from().where(({ collars }) => collars.dog_id["="](this.id)).cardinality("one");
  dogs = () => Dogs.from().where(({ dogs }) => dogs.rival_id["="](this.id)).cardinality("many");
  microchips = () => Microchips.from().where(({ microchips }) => microchips.dog_id["="](this.id)).cardinality("maybe");
  toys = () => Toys.from().where(({ toys }) => toys.dog_id["="](this.id)).cardinality("many");
  // @generated-end
}
