import * as Types from "../types";

import { database } from "../query/db";

export const makeDb = () => database({
    kysely_migration_lock: {
      id: Types.Text<1>,
      is_locked: Types.Int4<1>,
    },
    update_test_users: {
      id: Types.Int4<1>,
      active: Types.Int4<0 | 1>,
      name: Types.Text<1>,
      email: Types.Text<1>,
      role: Types.Text<0 | 1>,
    },
    kysely_migration: {
      name: Types.Text<1>,
      timestamp: Types.Text<1>,
    },
    example_3d_array: {
      data: Types.Array<0 | 1, Types.Int4<0 | 1>>,
      id: Types.Int4<1>,
      data_1d: Types.Array<0 | 1, Types.Int4<0 | 1>>,
    },
    users: {
      name: Types.Text<1>,
      email: Types.Text<1>,
      role: Types.Text<0 | 1>,
      id: Types.Int4<1>,
      active: Types.Int4<0 | 1>,
    },
    person: {
      firstName: Types.Text<1>,
      lastName: Types.Text<0 | 1>,
      gender: Types.Text<1>,
      id: Types.Int4<1>,
      createdAt: Types.Timestamp<1>,
    },
    pet: {
      name: Types.Text<1>,
      ownerId: Types.Int4<1>,
      species: Types.Text<1>,
      age: Types.Int4<1>,
      id: Types.Int4<1>,
    },
    update_test_posts: {
      title: Types.Text<1>,
      content: Types.Text<0 | 1>,
      user_id: Types.Int4<1>,
      id: Types.Int4<1>,
      published: Types.Int4<0 | 1>,
    },
    test_users: {
      name: Types.Text<1>,
      id: Types.Int4<1>,
      balance: Types.Int4<0 | 1>,
    },
    posts: {
      title: Types.Text<1>,
      content: Types.Text<0 | 1>,
      user_id: Types.Int4<1>,
      id: Types.Int4<1>,
      published: Types.Int4<0 | 1>,
    },
    comments: {
      post_id: Types.Int4<1>,
      user_id: Types.Int4<1>,
      content: Types.Text<1>,
      id: Types.Int4<1>,
    },
});
