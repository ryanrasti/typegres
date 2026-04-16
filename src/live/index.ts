import { QueryBuilder } from "../builder/query";

export async function* live(builder: QueryBuilder<any, any, any, any>): AsyncIterable<unknown[]> {
  using subscribtion = db.subscriptions.create();
  while (true) {
    const { data, preds, cursor } = await db.transaction("REPEATABLE READ", async () => {
      const cursor = await db
        .query("SELECT pg_current_snapshot() AS cursor")
        .then((r) => r[0].cursor);
      const preds = await extractPreds(builder).execute();
      const data = await builder.execute();
      return { data, preds, cursor };
    });
    yield data;
    await subscribtion.waitNext(preds, cursor);
  }
}

// TODOs:
//   1. db needs to be accessible on `builder` for live() to work. Perhaps a small refactor:
//        * queries carry no operational state:
//        *   db.execute(table.from()...) -> regular result
//        *   db.live(table.from()...) -> live result
//   2. extractPreds:
//        * traverses over the builder:
//        * creates 1 top level query with
//           - every table selected over (FROM and JOIN)
//           - every equality predicate selected
//               * more precisely, top-level AND-connected predicates
//           - grouped by every column of the select (i.e., distinct)

/*
extracting preds notes:
- nested selects

*/