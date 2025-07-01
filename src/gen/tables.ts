import * as Types from "../types";

import { database } from "../query/db";

export const db = database({
    person: {
      firstName: Types.Text<1>,
      lastName: Types.Text<0>,
      gender: Types.Text<1>,
      id: Types.Int4<1>,
      createdAt: Types.Timestamp<1>,
    },
    kysely_migration: {
      name: Types.Text<1>,
      timestamp: Types.Text<1>,
    },
    pet: {
      name: Types.Text<1>,
      ownerId: Types.Int4<1>,
      species: Types.Text<1>,
      age: Types.Int4<1>,
      id: Types.Int4<1>,
    },
    kysely_migration_lock: {
      id: Types.Text<1>,
      is_locked: Types.Int4<1>,
    },
});
