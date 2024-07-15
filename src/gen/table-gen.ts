import fs from "fs";
import { $ } from "zx";
import { asType } from "./gen";

type ColumnDefinition = {
  type: string;
  not_null: boolean;
};

type TableGenFile = {
  [schema: string]: {
    [table: string]: {
      [column: string]: ColumnDefinition;
    };
  };
};

const canonicalType = (type: string): string => {
  switch (type) {
    case "varchar":
      return "text";
    default:
      return type;
  }
};

const main = async () => {
  const input = JSON.parse(fs.readFileSync("./tables.json", "utf-8"));

  await $`[[ -f ./tables.ts ]] && rm ./tables.ts || true`;

  const output = await fs.promises.open("./tables.ts", "w");

  /* Output format is:
    const db = database({
        pet: {
            id: Int8 as typeof Int8<1> & typeof Generated,
            ownerId: Int8<1>,
            name: Text<1>,
            age: Numeric<1>,
            species: Text<1>,
        },
        person: {
            id: Int8 as typeof Int8<1> & typeof Generated,
            firstName: Text<1>,
            lastName: Text<1 | 0>,
        },
    });    
  */

  await output.write(`import * as Types from "../types";\n\n`);
  await output.write(`import { database } from "../query/db";\n\n`);
  await output.write(`export const db = database({\n`);
  const tables = (input as TableGenFile)["public"];
  if (!tables) {
    throw new Error("No tables found in the input file.");
  }
  for (const [table, columns] of Object.entries(tables)) {
    await output.write(`    ${table}: {\n`);
    for (const [column, definition] of Object.entries(columns)) {
      const type = canonicalType(definition.type);
      await output.write(
        `      ${column}: ${asType(type, { nullable: !definition.not_null })},\n`,
      );
    }
    await output.write(`    },\n`);
  }
  await output.write(`});\n`);
  await output.close();
};

void main();
