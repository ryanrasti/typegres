import type oracledb from "oracledb";

export const oraclePoolAttributes = (value = process.env["ORACLE_URL"]): oracledb.PoolAttributes => {
  if (!value) { throw new Error("ORACLE_URL is required"); }
  try {
    const url = new URL(value);
    if (url.protocol !== "oracle:") { throw new Error(); }
    const user = decodeURIComponent(url.username);
    const password = decodeURIComponent(url.password);
    const service = decodeURIComponent(url.pathname);
    if (!user || !password || !url.host || service === "" || service === "/") { throw new Error(); }
    return {
      user,
      password,
      connectString: `${url.host}${service}`,
      poolMin: 1,
      poolMax: Number(process.env["ORACLE_POOL_MAX"] ?? 8),
      poolIncrement: 1,
    };
  } catch {
    throw new Error("ORACLE_URL must use oracle://user:password@host:port/service");
  }
};

export const port = Number(process.env["PORT"] ?? 3000);
export const staticRoot = process.env["STATIC_ROOT"] ?? new URL("../dist/client", import.meta.url).pathname;
