// Taken from:https://github.com/brianc/node-postgres/blob/8d493f3b5531bfe226d40c1d64d1d020ee33fd6f/packages/pg/lib/utils.js#L175

export const escapeLiteral = function (str: string) {
  let hasBackslash = false;
  let escaped = "'";

  if (str == null) {
    return "''";
  }

  if (typeof str !== "string") {
    return "''";
  }

  for (let i = 0; i < str.length; i++) {
    const c = str[i];
    if (c === "'") {
      escaped += c + c;
    } else if (c === "\\") {
      escaped += c + c;
      hasBackslash = true;
    } else {
      escaped += c;
    }
  }

  escaped += "'";

  if (hasBackslash === true) {
    escaped = " E" + escaped;
  }

  return escaped;
};
