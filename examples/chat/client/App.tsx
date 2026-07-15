import { useEffect, useRef, useState } from "react";
import { doRpc, type ShimStub } from "typegres/capnweb";
import type { Room, User } from "../src/capabilities";
import { connect, type Root } from "./api";

type Client = ShimStub<User>;
type RoomInfo = { id: number; name: string };
type Msg = { id: number; author: string; body: string };

export function App() {
  const [name, setName] = useState("");
  const [client, setClient] = useState<Client | null>(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!client) {
    return (
      <div className="max-w-md mx-auto mt-[12vh] p-6 text-center">
        <h1 className="text-2xl font-semibold m-0">typegres chat</h1>
        <p className="text-muted">
          Queries you send run inside a Cloudflare Durable Object&apos;s SQLite, over Cap&apos;n Web.
        </p>
        <form
          className="flex gap-2 mt-4"
          onSubmit={(e) => {
            e.preventDefault();
            const n = name.trim();
            if (!n || busy) return;
            setBusy(true);
            setError(null);
            // Root is ChatApi; userByName is on the capability graph (not ?user=).
            // A capnweb stub is a callable Proxy — wrap for React setState.
            const root: Root = connect();
            void doRpc(root, (api) => api.userByName(n))
              .then((user) => setClient(() => user as unknown as Client))
              .catch((err: unknown) => setError(err instanceof Error ? err.message : String(err)))
              .finally(() => setBusy(false));
          }}
        >
          <input
            className="flex-1"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="your name"
            autoFocus
          />
          <button type="submit" disabled={busy}>
            {busy ? "…" : "Join"}
          </button>
        </form>
        {error && <p className="text-red-400 text-sm mt-3">{error}</p>}
      </div>
    );
  }
  return <Chat client={client} me={name} />;
}

function Chat({ client, me }: { client: Client; me: string }) {
  const [rooms, setRooms] = useState<RoomInfo[]>([]); // the public directory (all rooms)
  const [mine, setMine] = useState<Set<number>>(new Set()); // ids of rooms I've joined
  const [roomId, setRoomId] = useState<number | null>(null);
  const [messages, setMessages] = useState<Msg[]>([]);
  const [draft, setDraft] = useState("");
  const [newRoom, setNewRoom] = useState("");
  // member id → name, filled when a room is opened so the client can label messages
  // without a server-side join wrapper (Room.members() + Room.messages() are both
  // client-refined builders).
  const namesRef = useRef<Map<number, string>>(new Map());

  // Client-authored queries: the browser writes the select; it runs in the DO.
  const refreshRooms = () =>
    Promise.all([
      doRpc(client, (u) =>
        u.allRooms().select(({ rooms }) => ({ id: rooms.id, name: rooms.name })).orderBy(({ rooms }) => rooms.id).execute(u.conn),
      ),
      doRpc(client, (u) =>
        u.rooms().select(({ rooms }) => ({ id: rooms.id, name: rooms.name })).orderBy(({ rooms }) => rooms.id).execute(u.conn),
      ),
    ]).then(([all, joined]) => {
      setRooms(all);
      setMine(new Set(joined.map((r) => r.id)));
    });
  useEffect(() => {
    void refreshRooms();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Load member names once per open room, then poll a client-authored messages query.
  useEffect(() => {
    if (roomId == null) return;
    let alive = true;

    const loadNames = doRpc(client, (u) =>
      (u.room(roomId) as unknown as Room)
        .members()
        .select(({ users }) => ({ id: users.id, name: users.name }))
        .execute(u.conn),
    ).then((rows) => {
      if (!alive) return;
      namesRef.current = new Map(rows.map((r) => [r.id, r.name]));
    });

    const loadFeed = (): Promise<void> =>
      doRpc(client, (u) =>
        (u.room(roomId) as unknown as Room)
          .messages()
          .select(({ messages }) => ({ id: messages.id, userId: messages.user_id, body: messages.body }))
          .orderBy(({ messages }) => messages.id)
          .execute(u.conn),
      ).then((rows) => {
        if (!alive) return;
        const names = namesRef.current;
        setMessages(
          rows.map((r) => ({
            id: r.id,
            author: names.get(r.userId) ?? `#${r.userId}`,
            body: r.body,
          })),
        );
      });

    void loadNames.then(() => loadFeed()).catch(() => {});
    const t = setInterval(() => void loadFeed().catch(() => {}), 1000);
    return () => {
      alive = false;
      clearInterval(t);
    };
  }, [client, roomId]);

  // Open a room I'm already a member of (messages/post are authorized by membership).
  const open = (id: number) => {
    setRoomId(id);
    setMessages([]);
  };

  // Join a room from the directory, then open it.
  const join = async (id: number) => {
    await doRpc(client, (u) => u.joinRoom(id));
    await refreshRooms();
    open(id);
  };

  const send = async (e: React.FormEvent) => {
    e.preventDefault();
    if (roomId == null || !draft.trim()) return;
    const body = draft.trim();
    await doRpc(client, (u) => (u.room(roomId) as unknown as Room).post(body));
    setDraft("");
    // Immediate re-read with the same client-authored query the poll uses.
    const rows = await doRpc(client, (u) =>
      (u.room(roomId) as unknown as Room)
        .messages()
        .select(({ messages }) => ({ id: messages.id, userId: messages.user_id, body: messages.body }))
        .orderBy(({ messages }) => messages.id)
        .execute(u.conn),
    );
    const names = namesRef.current;
    setMessages(
      rows.map((r) => ({
        id: r.id,
        author: names.get(r.userId) ?? `#${r.userId}`,
        body: r.body,
      })),
    );
  };

  const addRoom = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newRoom.trim()) return;
    await doRpc(client, (u) => u.createRoom(newRoom.trim()));
    setNewRoom("");
    await refreshRooms();
  };

  return (
    <div className="grid grid-cols-[220px_1fr] h-screen">
      <aside className="bg-panel border-r border-line p-4 flex flex-col gap-3">
        <div className="text-muted text-[13px]">
          signed in as <b className="text-text">{me}</b>
        </div>
        <h2 className="m-0 text-xs uppercase text-muted tracking-wider">rooms</h2>
        <ul className="list-none m-0 p-0 flex flex-col gap-1 flex-1 overflow-auto">
          {rooms.map((r) =>
            mine.has(r.id) ? (
              <li key={r.id}>
                <button
                  className={
                    r.id === roomId
                      ? "w-full text-left font-medium px-2.5 py-2 bg-accent text-accent-ink"
                      : "w-full text-left font-medium px-2.5 py-2 bg-transparent text-text hover:bg-line"
                  }
                  onClick={() => open(r.id)}
                >
                  #{r.name}
                </button>
              </li>
            ) : (
              <li key={r.id} className="flex items-center justify-between px-2.5 py-1 text-muted">
                <span className="overflow-hidden text-ellipsis whitespace-nowrap">#{r.name}</span>
                <button
                  className="w-auto px-2.5 py-0.5 text-xs shrink-0"
                  onClick={() => void join(r.id)}
                >
                  Join
                </button>
              </li>
            ),
          )}
        </ul>
        <form className="flex gap-1.5" onSubmit={addRoom}>
          <input
            className="flex-1 min-w-0"
            value={newRoom}
            onChange={(e) => setNewRoom(e.target.value)}
            placeholder="new room"
          />
          <button type="submit">+</button>
        </form>
      </aside>

      <main className="flex flex-col min-w-0">
        {roomId == null ? (
          <div className="m-auto text-muted">pick or create a room</div>
        ) : (
          <>
            <Feed messages={messages} />
            <form className="flex gap-2 p-4 border-t border-line" onSubmit={send}>
              <input
                className="flex-1"
                value={draft}
                onChange={(e) => setDraft(e.target.value)}
                placeholder="message"
                autoFocus
              />
              <button type="submit">Send</button>
            </form>
          </>
        )}
      </main>
    </div>
  );
}

function Feed({ messages }: { messages: Msg[] }) {
  const end = useRef<HTMLDivElement>(null);
  useEffect(() => {
    end.current?.scrollIntoView();
  }, [messages]);
  return (
    <div className="flex-1 overflow-auto p-4 flex flex-col gap-2">
      {messages.map((m) => (
        <div className="flex gap-2 items-baseline" key={m.id}>
          <span className="text-accent font-semibold min-w-16">{m.author}</span>
          <span className="whitespace-pre-wrap">{m.body}</span>
        </div>
      ))}
      <div ref={end} />
    </div>
  );
}
