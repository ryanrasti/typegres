import type oracledb from "oracledb";

export const parseOraclePoolAttributes = (value: string): oracledb.PoolAttributes => {
  try {
    const url = new URL(value);
    const user = decodeURIComponent(url.username);
    const password = decodeURIComponent(url.password);
    const service = decodeURIComponent(url.pathname);
    if (
      url.protocol !== "oracle:" ||
      !user ||
      !password ||
      !url.host ||
      service === "" ||
      service === "/"
    ) {
      throw new Error();
    }
    return { user, password, connectString: `${url.host}${service}` };
  } catch {
    throw new Error(
      `ORACLE_URL must be oracle://user:password@host:port/service, got ${JSON.stringify(value)}`,
    );
  }
};

export const requireOraclePoolAttributes = (): oracledb.PoolAttributes => {
  const value = process.env["ORACLE_URL"];
  if (!value) {
    throw new Error("ORACLE_URL is not set. Run bin/startora and export its URL before Oracle codegen.");
  }
  return parseOraclePoolAttributes(value);
};
