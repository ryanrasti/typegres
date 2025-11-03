import { Table } from "../../query/db";
import * as Types from "../../types";

export const Todos = Table("todos", {
  completed: { type: Types.Bool<1>, required: false },
  created_at: { type: Types.Timestamptz<1>, required: false },
  id: { type: Types.Int4<1>, required: false },
  title: { type: Types.Text<1>, required: true },
  user_id: { type: Types.Int4<1>, required: true },
});

export const User = Table("user", {
  created_at: { type: Types.Timestamptz<1>, required: false },
  id: { type: Types.Int4<1>, required: false },
  username: { type: Types.Text<1>, required: true },
});
