// Parse pg_snapshot's text form into something we can index/test in JS.
//
// Format: "<xmin>:<xmax>:<xip_list>" — e.g. "100:120:115,118".
//   xmin: lowest active xid at snapshot time (anything below committed before).
//   xmax: lowest unassigned xid at snapshot time (anything ≥ this isn't committed yet).
//   xip:  comma-separated list of xids that were in-flight at snapshot time.
//
// xid8 is 64-bit unsigned; using BigInt to avoid Number precision loss past 2^53.

export type Cursor = {
  xmin: bigint;
  xmax: bigint;
  xip: Set<bigint>;
};

export const parseSnapshot = (text: string): Cursor => {
  const parts = text.split(":");
  if (parts.length !== 3) {
    throw new Error(`parseSnapshot: expected 3 colon-separated parts, got ${parts.length} ('${text}')`);
  }
  const xmin = BigInt(parts[0]!);
  const xmax = BigInt(parts[1]!);
  const xipText = parts[2]!;
  const xip = new Set<bigint>(
    xipText === "" ? [] : xipText.split(",").map((s) => BigInt(s)),
  );
  return { xmin, xmax, xip };
};

// True iff `xid` is committed-and-visible to the snapshot — i.e. matches
// pg's MVCC visibility rule for snapshots.
export const visible = (cursor: Cursor, xid: bigint): boolean => {
  if (xid < cursor.xmin) { return true; }       // committed before snapshot
  if (xid >= cursor.xmax) { return false; }     // not yet assigned/committed
  return !cursor.xip.has(xid);                  // in [xmin, xmax): visible iff not in-flight
};
