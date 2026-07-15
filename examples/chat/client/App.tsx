import { useEffect, useRef, useState } from "react";
import {
  connect,
  createRoom,
  feed,
  joinRoom,
  listAllRooms,
  listRooms,
  post,
  type Client,
  type Msg,
  type RoomInfo,
} from "./api";

export function App() {
  const [name, setName] = useState("");
  const [client, setClient] = useState<Client | null>(null);

  if (!client) {
    return (
      <div className="login">
        <h1>typegres chat</h1>
        <p>Queries you send run inside a Cloudflare Durable Object's SQLite, over Cap'n Web.</p>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            // A capnweb stub is a callable Proxy; React's setState would treat
            // it as a functional updater and invoke it. Wrap so it's stored, not called.
            if (name.trim()) {
              const c = connect(name.trim());
              setClient(() => c);
            }
          }}
        >
          <input value={name} onChange={(e) => setName(e.target.value)} placeholder="your name" autoFocus />
          <button type="submit">Join</button>
        </form>
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

  const refreshRooms = () =>
    Promise.all([listAllRooms(client), listRooms(client)]).then(([all, joined]) => {
      setRooms(all);
      setMine(new Set(joined.map((r) => r.id)));
    });
  useEffect(() => {
    void refreshRooms();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Poll the current room's feed (Phase 6 will push instead).
  useEffect(() => {
    if (roomId == null) return;
    let alive = true;
    const tick = () => feed(client, roomId).then((m) => alive && setMessages(m)).catch(() => {});
    void tick();
    const t = setInterval(tick, 1000);
    return () => {
      alive = false;
      clearInterval(t);
    };
  }, [client, roomId]);

  // Open a room I'm already a member of (feed/post are authorized by membership).
  const open = (id: number) => {
    setRoomId(id);
    setMessages([]);
  };

  // Join a room from the directory, then open it.
  const join = async (id: number) => {
    await joinRoom(client, id);
    await refreshRooms();
    open(id);
  };

  const send = async (e: React.FormEvent) => {
    e.preventDefault();
    if (roomId == null || !draft.trim()) return;
    await post(client, roomId, draft.trim());
    setDraft("");
    setMessages(await feed(client, roomId));
  };

  const addRoom = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newRoom.trim()) return;
    await createRoom(client, newRoom.trim());
    setNewRoom("");
    await refreshRooms();
  };

  return (
    <div className="chat">
      <aside>
        <div className="me">signed in as <b>{me}</b></div>
        <h2>rooms</h2>
        <ul>
          {rooms.map((r) =>
            mine.has(r.id) ? (
              <li key={r.id}>
                <button className={r.id === roomId ? "active" : ""} onClick={() => open(r.id)}>
                  #{r.name}
                </button>
              </li>
            ) : (
              <li key={r.id} className="joinable">
                <span>#{r.name}</span>
                <button className="join" onClick={() => void join(r.id)}>
                  Join
                </button>
              </li>
            ),
          )}
        </ul>
        <form onSubmit={addRoom}>
          <input value={newRoom} onChange={(e) => setNewRoom(e.target.value)} placeholder="new room" />
          <button type="submit">+</button>
        </form>
      </aside>

      <main>
        {roomId == null ? (
          <div className="empty">pick or create a room</div>
        ) : (
          <>
            <Feed messages={messages} />
            <form className="composer" onSubmit={send}>
              <input value={draft} onChange={(e) => setDraft(e.target.value)} placeholder="message" autoFocus />
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
    <div className="feed">
      {messages.map((m) => (
        <div className="msg" key={m.id}>
          <span className="author">{m.author}</span>
          <span className="body">{m.body}</span>
        </div>
      ))}
      <div ref={end} />
    </div>
  );
}
