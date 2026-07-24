export { ChatDo } from "./chat-do";

// The Worker does exactly one thing: hand the Cap'n Web WebSocket to the
// Durable Object. Static assets (the SPA) are served by the assets binding;
// wrangler.jsonc routes /ws here first.
export default {
  async fetch(request, env): Promise<Response> {
    const url = new URL(request.url);
    if (url.pathname === "/ws") {
      return env.CHAT.get(env.CHAT.idFromName("global")).fetch(request);
    }
    return new Response("Not found", { status: 404 });
  },
} satisfies ExportedHandler<Env>;
