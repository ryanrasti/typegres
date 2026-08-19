import { createReadStream, existsSync, statSync } from "node:fs";
import { createServer } from "node:http";
import { extname, join, normalize } from "node:path";
import { nodeHttpBatchRpcResponse, toRpc } from "typegres/capnweb";
import { OracleDriver } from "typegres/drivers/oracle";
import { Api, db } from "./api.js";
import { oraclePoolAttributes, port, staticRoot } from "./config.js";
import { migrate } from "./migrate.js";

const mimeTypes: { [extension: string]: string } = {
  ".css": "text/css; charset=utf-8",
  ".html": "text/html; charset=utf-8",
  ".ico": "image/x-icon",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".svg": "image/svg+xml",
};

const driver = await OracleDriver.create(oraclePoolAttributes());
const conn = db.connect(driver);
await migrate(conn);

const server = createServer(async (request, response) => {
  const url = new URL(request.url ?? "/", `http://${request.headers.host ?? "localhost"}`);
  if (url.pathname === "/healthz") {
    response.writeHead(200, { "content-type": "text/plain; charset=utf-8" });
    response.end("ok\n");
    return;
  }
  if (url.pathname === "/api" && request.method === "POST") {
    try {
      await nodeHttpBatchRpcResponse(request, response, toRpc(new Api()));
    } catch (error) {
      console.error("RPC request failed:", error);
      if (!response.headersSent) { response.writeHead(500, { "content-type": "text/plain" }); }
      response.end("RPC request failed");
    }
    return;
  }
  if (request.method !== "GET") {
    response.writeHead(405).end();
    return;
  }

  const requested = normalize(decodeURIComponent(url.pathname)).replace(/^(\.\.[/\\])+/, "");
  let file = join(staticRoot, requested === "/" ? "index.html" : requested);
  if (!file.startsWith(staticRoot) || !existsSync(file) || !statSync(file).isFile()) {
    file = join(staticRoot, "index.html");
  }
  response.writeHead(200, {
    "cache-control": file.endsWith("index.html") ? "no-cache" : "public, max-age=31536000, immutable",
    "content-type": mimeTypes[extname(file)] ?? "application/octet-stream",
  });
  createReadStream(file).pipe(response);
});

server.listen(port, "0.0.0.0", () => {
  console.log(`Oracle Notes listening on http://0.0.0.0:${port}`);
});

let stopping = false;
const stop = (): void => {
  if (stopping) { return; }
  stopping = true;
  server.close(() => {
    void conn.close().finally(() => process.exit(0));
  });
  setTimeout(() => process.exit(1), 10_000).unref();
};
process.on("SIGINT", stop);
process.on("SIGTERM", stop);
