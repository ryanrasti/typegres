import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { byRef } from "typegres/capnweb";
import { connect, loggedCall, loggedDoRpc, type RoomStub, type UserStub } from "./rpc";
import { wireInput, wireLog } from "./wire-log";
import { WireLog } from "./components/WireLog";

type RoomRow = { id: number; name: string };
type Msg = { id: number; body: string; author: string; at: string };
type Current = { stub: RoomStub; id: number; name: string };

// Toy session persistence so a page refresh keeps you logged in and in your
// current room (explicit logout is the way out).
const AUTH_KEY = "chat-auth";
const ROOM_KEY = "chat-room";

// Persisting the password is a local-dev convenience only. Never keep it on a
// deployed origin — there, a refresh just re-prompts for login.
const CAN_STORE_AUTH =
  location.hostname === "localhost" ||
  location.hostname === "127.0.0.1" ||
  location.hostname === "[::1]";

const login = async (username: string, password: string): Promise<UserStub> => {
  const api = connect();
  const user = await loggedCall(`api.login({ username: "${username}", … })`, () =>
    api.login({ username, password }),
  );
  return user;
};

export const App = () => {
  const [user, setUser] = useState<UserStub | null>(null);
  const [userName, setUserName] = useState("");
  const [booting, setBooting] = useState(true);

  // Auto-login from stored credentials on mount (local dev only).
  useEffect(() => {
    if (!CAN_STORE_AUTH) {
      // On a deployed origin, never keep a password around — clear any left
      // by an earlier build and start unauthenticated.
      localStorage.removeItem(AUTH_KEY);
      setBooting(false);
      return;
    }
    const raw = localStorage.getItem(AUTH_KEY);
    if (!raw) {
      setBooting(false);
      return;
    }
    void (async () => {
      try {
        const { username, password } = JSON.parse(raw) as { username: string; password: string };
        const u = await login(username, password);
        setUser(() => u);
        setUserName(username);
      } catch {
        localStorage.removeItem(AUTH_KEY);
        localStorage.removeItem(ROOM_KEY);
      } finally {
        setBooting(false);
      }
    })();
  }, []);

  const onLogout = () => {
    localStorage.removeItem(AUTH_KEY);
    localStorage.removeItem(ROOM_KEY);
    setUser(null);
    setUserName("");
  };

  return (
    <div className="flex h-screen flex-col bg-gray-900 font-sans text-gray-200">
      <Header userName={user ? userName : null} onLogout={user ? onLogout : undefined} />
      {booting ? (
        <div className="flex flex-1 items-center justify-center text-sm text-gray-500">…</div>
      ) : user ? (
        <Shell user={user} userName={userName} />
      ) : (
        <Login
          onLogin={(u, name, password) => {
            if (CAN_STORE_AUTH) {
              localStorage.setItem(AUTH_KEY, JSON.stringify({ username: name, password }));
            }
            // Stubs are callable (that's how capnweb pipelining works), so
            // never hand one to a state setter bare — React would invoke it
            // as an updater, which calls the capability itself over RPC.
            setUser(() => u);
            setUserName(name);
          }}
        />
      )}
    </div>
  );
};

const Header = ({ userName, onLogout }: { userName: string | null; onLogout?: () => void }) => (
  <header className="flex shrink-0 items-center justify-between border-b border-gray-800 bg-gray-950 px-4 py-2">
    <div className="text-sm font-semibold">
      typegres chat
      <span className="ml-2 font-normal text-gray-500">SQLite in a Durable Object · Cap'n Web · client-authored queries</span>
    </div>
    <div className="flex items-center gap-3 text-xs text-gray-400">
      {userName && (
        <span>
          signed in as <span className="text-gray-200">{userName}</span>
        </span>
      )}
      {onLogout && (
        <button
          onClick={onLogout}
          className="rounded border border-gray-700 px-2 py-0.5 text-gray-400 transition-colors hover:bg-gray-800 hover:text-gray-200"
        >
          log out
        </button>
      )}
    </div>
  </header>
);

const Login = ({ onLogin }: { onLogin: (user: UserStub, name: string, password: string) => void }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  const doLogin = async (name: string, pw: string) => {
    setBusy(true);
    setError(null);
    try {
      const user = await login(name, pw);
      onLogin(user, name, pw);
    } catch (err) {
      setError(err instanceof Error ? err.message : String(err));
      setBusy(false);
    }
  };

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    void doLogin(username, password);
  };

  // One click, no typing: a fresh anonymous identity. login() is still the
  // nobody→principal amplification — a guest just skips choosing a name.
  const continueAsGuest = () => {
    const id = crypto.randomUUID().slice(0, 4);
    void doLogin(`guest-${id}`, crypto.randomUUID());
  };

  return (
    <div className="flex flex-1 items-center justify-center">
      <div className="w-80 rounded-lg border border-gray-800 bg-gray-950 p-6">
        <button
          onClick={continueAsGuest}
          disabled={busy}
          className="mb-4 w-full rounded bg-blue-600 py-2 text-sm font-medium transition-colors hover:bg-blue-500 disabled:opacity-50"
        >
          {busy ? "…" : "Continue as guest"}
        </button>

        <div className="mb-4 flex items-center gap-2 text-[10px] tracking-wide text-gray-600 uppercase">
          <span className="h-px flex-1 bg-gray-800" /> or claim a name <span className="h-px flex-1 bg-gray-800" />
        </div>

        <form onSubmit={submit}>
          <p className="mb-3 text-xs text-gray-500">
            First login creates the account; the password just claims the name. Toy auth — don't reuse a real
            password.
          </p>
          <input
            className="mb-2 w-full rounded border border-gray-700 bg-gray-900 px-3 py-2 text-sm outline-none focus:border-blue-500"
            placeholder="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            className="mb-3 w-full rounded border border-gray-700 bg-gray-900 px-3 py-2 text-sm outline-none focus:border-blue-500"
            placeholder="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {error && <div className="mb-3 text-xs text-red-400">{error}</div>}
          <button
            disabled={busy || !username || !password}
            className="w-full rounded border border-gray-700 py-2 text-sm font-medium text-gray-300 transition-colors hover:bg-gray-800 disabled:opacity-50"
          >
            {busy ? "…" : "Enter"}
          </button>
        </form>
      </div>
    </div>
  );
};

const Shell = ({ user, userName }: { user: UserStub; userName: string }) => {
  const [directory, setDirectory] = useState<RoomRow[]>([]);
  const [myRoomIds, setMyRoomIds] = useState<Set<number>>(new Set());
  const [current, setCurrent] = useState<Current | null>(null);
  const [defaultRoom, setDefaultRoom] = useState<RoomStub | null>(null);
  const restoredRef = useRef(false);

  const refreshRooms = useCallback(async () => {
    const all = await loggedDoRpc(user, (u) =>
      u
        .directory()
        .select(({ rooms }) => ({ id: rooms.id, name: rooms.name }))
        .orderBy(({ rooms }) => rooms.name)
        .execute(),
    );
    setDirectory(all);
    // My grants — a client-authored query over the grant table.
    const mine = await loggedDoRpc(user, (u) =>
      u
        .memberships()
        .select(({ room_members }) => ({ room_id: room_members.room_id }))
        .execute(),
    );
    setMyRoomIds(new Set(mine.map((m) => m.room_id)));
  }, [user]);

  useEffect(() => {
    void refreshRooms();
  }, [refreshRooms]);

  // Opening a room IS joining it (join is idempotent and returns the
  // grant — a membership row); the grant then amplifies to the member
  // facet, which is the only class with messages()/post().
  const openRoom = useCallback(
    async (row: RoomRow) => {
      const grant = await loggedCall(`user.joinRoom(${row.id})`, () => user.joinRoom(row.id));
      const stub = await loggedDoRpc(user, () => grant.room().one());
      localStorage.setItem(ROOM_KEY, String(row.id));
      setCurrent({ stub, id: row.id, name: row.name });
      void refreshRooms();
    },
    [user, refreshRooms],
  );

  // Back to the playground (deselect the current room).
  const goHome = useCallback(() => {
    localStorage.removeItem(ROOM_KEY);
    setCurrent(null);
  }, []);

  // A default room for the wire prompt so room-scoped queries run before you
  // open one: `room` is your current room if you're in one, else the lobby
  // (joined idempotently once the directory has loaded).
  useEffect(() => {
    if (defaultRoom) {
      return;
    }
    const lobby = directory.find((r) => r.name === "lobby");
    if (!lobby) {
      return;
    }
    let disposed = false;
    void (async () => {
      const grant = await loggedCall(`user.joinRoom(${lobby.id})`, () => user.joinRoom(lobby.id));
      const stub = await loggedDoRpc(user, () => grant.room().one());
      // Stubs are callable, so set via an updater function, not bare.
      if (!disposed) {
        setDefaultRoom(() => stub);
      } else {
        // Resolved after the effect was torn down (directory changed mid-join)
        // — release the orphaned stub instead of leaking it.
        (stub as unknown as Disposable)[Symbol.dispose]();
      }
    })();
    return () => {
      disposed = true;
    };
  }, [directory, defaultRoom, user]);

  // Restore the last-open room across a refresh (once, after the directory
  // has loaded so we have its name).
  useEffect(() => {
    if (restoredRef.current || current || directory.length === 0) {
      return;
    }
    restoredRef.current = true;
    const stored = Number(localStorage.getItem(ROOM_KEY));
    const row = directory.find((r) => r.id === stored);
    if (row) {
      void openRoom(row);
    }
  }, [directory, current, openRoom]);

  const createRoom = async (name: string) => {
    const grant = await loggedCall(`user.createRoom("${name}")`, () => user.createRoom(name));
    const stub = await loggedDoRpc(user, () => grant.room().one());
    await refreshRooms();
    const created = await loggedDoRpc(user, (u) =>
      u
        .directory()
        .where(({ rooms }) => rooms.name.eq(name))
        .select(({ rooms }) => ({ id: rooms.id }))
        .execute(),
    );
    setCurrent({ stub, id: created[0]!.id, name });
  };

  return (
    <div className="flex min-h-0 flex-1">
      <Sidebar
        directory={directory}
        myRoomIds={myRoomIds}
        currentId={current?.id ?? null}
        onHome={goHome}
        onOpen={(r) => void openRoom(r)}
        onCreate={(name) => void createRoom(name)}
      />
      <div className="flex min-w-0 flex-1 flex-col">
        <div className="flex min-h-0 flex-1">
          {current ? (
            <RoomView key={current.id} current={current} userName={userName} />
          ) : (
            <ConsolePlayground />
          )}
        </div>
        <div className="h-52 shrink-0">
          <WireLog user={user} room={current?.stub ?? defaultRoom ?? undefined} />
        </div>
      </div>
    </div>
  );
};

const Sidebar = ({
  directory,
  myRoomIds,
  currentId,
  onHome,
  onOpen,
  onCreate,
}: {
  directory: RoomRow[];
  myRoomIds: Set<number>;
  currentId: number | null;
  onHome: () => void;
  onOpen: (r: RoomRow) => void;
  onCreate: (name: string) => void;
}) => {
  const [newName, setNewName] = useState("");
  const mine = directory.filter((r) => myRoomIds.has(r.id));
  const others = directory.filter((r) => !myRoomIds.has(r.id));

  return (
    <aside className="flex w-60 shrink-0 flex-col border-r border-gray-800 bg-gray-950">
      <div className="px-2 pt-2">
        <button
          onClick={onHome}
          className={`block w-full rounded px-2 py-1 text-left text-sm transition-colors ${
            currentId === null ? "bg-blue-600/20 text-blue-300" : "text-gray-300 hover:bg-gray-800"
          }`}
        >
          ⌂ Home
        </button>
      </div>

      <SectionLabel>Your rooms</SectionLabel>
      <div className="px-2">
        {mine.map((r) => (
          <button
            key={r.id}
            onClick={() => onOpen(r)}
            className={`block w-full rounded px-2 py-1 text-left text-sm transition-colors ${
              r.id === currentId ? "bg-blue-600/20 text-blue-300" : "text-gray-300 hover:bg-gray-800"
            }`}
          >
            #{r.name}
          </button>
        ))}
        {mine.length === 0 && <div className="px-2 py-1 text-xs text-gray-600">none yet</div>}
      </div>

      <SectionLabel>
        Directory <span className="normal-case text-gray-600">(listing only — join to read)</span>
      </SectionLabel>
      <div className="min-h-0 flex-1 overflow-auto px-2">
        {others.map((r) => (
          <div key={r.id} className="flex items-center justify-between rounded px-2 py-1 text-sm text-gray-400">
            <span className="truncate">#{r.name}</span>
            <button
              onClick={() => onOpen(r)}
              className="ml-2 shrink-0 rounded bg-gray-800 px-2 py-0.5 text-xs text-gray-300 transition-colors hover:bg-blue-600 hover:text-white"
            >
              join
            </button>
          </div>
        ))}
        {others.length === 0 && <div className="px-2 py-1 text-xs text-gray-600">nothing to join</div>}
      </div>

      <form
        className="border-t border-gray-800 p-2"
        onSubmit={(e) => {
          e.preventDefault();
          if (newName) {
            onCreate(newName);
            setNewName("");
          }
        }}
      >
        <input
          className="w-full rounded border border-gray-700 bg-gray-900 px-2 py-1 text-sm outline-none focus:border-blue-500"
          placeholder="new room…"
          value={newName}
          onChange={(e) => setNewName(e.target.value)}
        />
      </form>
    </aside>
  );
};

const SectionLabel = ({ children }: { children: React.ReactNode }) => (
  <div className="px-4 pt-3 pb-1 text-xs font-medium tracking-wide text-gray-500 uppercase">{children}</div>
);

// A top-posters entry that flashes its count when it changes — so a live
// update is obvious. Re-keying the count span on each change restarts the
// CSS animation.
const StatItem = ({ author, posts }: { author: string; posts: number }) => {
  const prev = useRef(posts);
  const [gen, setGen] = useState(0);
  useEffect(() => {
    if (prev.current !== posts) {
      prev.current = posts;
      setGen((g) => g + 1);
    }
  }, [posts]);
  return (
    <span className="text-gray-300">
      {author}{" "}
      <span
        key={gen}
        className="rounded px-1 text-gray-500"
        style={{ animation: gen > 0 ? "statFlash 1200ms ease-out" : undefined }}
      >
        ×{posts}
      </span>
    </span>
  );
};

const RoomView = ({ current, userName }: { current: Current; userName: string }) => {
  const [messages, setMessages] = useState<Msg[]>([]);
  const [draft, setDraft] = useState("");
  const [stats, setStats] = useState<{ author: string; posts: number }[] | null>(null);
  // Stable by-reference callback for the live-stats edit in runStats (below).
  // Memoized so it isn't a fresh stub every render. `setStats` is identity-
  // stable, so [] deps are correct.
  const setStatsByRef = useMemo(() => byRef(setStats), []);
  const statsSub = useRef<{ unsubscribe: () => unknown } | undefined>(undefined);
  const bottomRef = useRef<HTMLDivElement>(null);

  // Tear down the stats subscription (if the live version is in use) on room
  // switch / unmount, and dispose the by-ref stub.
  useEffect(
    () => () => {
      void statsSub.current?.unsubscribe();
      (setStatsByRef as unknown as Disposable)[Symbol.dispose]();
    },
    [setStatsByRef],
  );

  const stopStats = () => {
    void statsSub.current?.unsubscribe();
    statsSub.current = undefined;
    setStats(null);
  };

  useEffect(() => {
    // The feed is a client-authored live query: the closure (including the
    // onNext callback, which crosses by reference) replays in the Durable
    // Object against the room's granted builder, and the server pushes the
    // rowset here on every committed change. No polling, no feed endpoint —
    // and the subscription can't see past the capability it refined.
    let sub: { unsubscribe: () => unknown } | undefined;
    let cancelled = false;
    const onNext = byRef((rows: Msg[]) => {
      wireLog.push({ kind: "live", t: Date.now(), rows: rows.length });
      setMessages(rows);
    });
    void (async () => {
      const s = await loggedDoRpc(current.stub, (r) =>
        r
          .messages()
          .select(({ messages, users }) => ({
            id: messages.id,
            body: messages.body,
            author: users.name,
            at: messages.created_at,
          }))
          .orderBy(({ messages }) => messages.id)
          .live()
          .observe({ onNext }),
      );
      if (cancelled) {
        void s.unsubscribe();
      } else {
        sub = s;
      }
    })();
    return () => {
      cancelled = true;
      void sub?.unsubscribe();
      // Release the by-reference callback stub so it isn't leaked across
      // room switches / unmounts.
      onNext[Symbol.dispose]();
    };
  }, [current.stub]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages.length]);

  const post = async (e: React.FormEvent) => {
    e.preventDefault();
    const body = draft.trim();
    if (!body) {
      return;
    }
    setDraft("");
    try {
      // No refetch: the live subscription pushes the new rowset.
      await loggedDoRpc(current.stub, (r) => r.post(body).execute());
    } catch {
      // The error is already logged to the wire panel; restore the draft so a
      // transient failure doesn't silently swallow the message.
      setDraft(body);
    }
  };

  const runStats = async () => {
    // The server has no "top posters" endpoint. This aggregation is
    // authored here, client-side, and replayed against the room's granted
    // builder — it cannot reach past this room.
    //
    // This is the LIVE version: .live().observe() re-runs the standings on
    // every committed change and pushes them in via setStatsByRef, so the bar
    // updates itself. The one-shot "what if" would drop the subscription:
    //   const rows = await loggedDoRpc(current.stub, (r) =>
    //     r.messages().groupBy(...).select(...).orderBy(...).execute());
    //   setStats(rows);
    void statsSub.current?.unsubscribe(); // replace any existing subscription
    const stats = await loggedDoRpc(current.stub, (r) =>
      r
        .messages()
        .groupBy(({ users }) => [users.name])
        .select(({ users, messages }) => ({ author: users.name, posts: messages.id.count() }))
        .orderBy(({ messages }) => [messages.id.count(), "desc"])
        .live()
        .observe({ onNext: setStatsByRef })
    );
  };

  return (
    <div className="flex min-w-0 flex-1 flex-col">
      <div className="flex shrink-0 items-center justify-between border-b border-gray-800 px-4 py-2">
        <div className="text-sm font-semibold">#{current.name}</div>
        <button onClick={() => void runStats()} className="rounded bg-gray-800 px-2 py-1 text-xs text-gray-300 transition-colors hover:bg-gray-700">
          top posters (client-side aggregation)
        </button>
      </div>

      {stats && (
        <div className="flex items-center gap-4 border-b border-gray-800 bg-gray-950 px-4 py-2 text-xs">
          <span className="text-gray-500">top posters:</span>
          {stats.map((s) => (
            <StatItem key={s.author} author={s.author} posts={s.posts} />
          ))}
          <button onClick={stopStats} className="ml-auto text-gray-600 hover:text-gray-400">
            ×
          </button>
        </div>
      )}

      <div className="min-h-0 flex-1 overflow-auto px-4 py-3">
        {messages.map((m) => (
          <div key={m.id} className="mb-2">
            <span className={`text-sm font-medium ${m.author === userName ? "text-blue-400" : "text-emerald-400"}`}>
              {m.author}
            </span>
            <span className="ml-2 text-xs text-gray-600">{m.at.slice(11, 16)} UTC</span>
            <div className="text-sm text-gray-200">{m.body}</div>
          </div>
        ))}
        <div ref={bottomRef} />
      </div>

      <form onSubmit={(e) => void post(e)} className="shrink-0 border-t border-gray-800 p-3">
        <input
          className="w-full rounded border border-gray-700 bg-gray-950 px-3 py-2 text-sm outline-none focus:border-blue-500"
          placeholder={`Message #${current.name}`}
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
        />
      </form>
    </div>
  );
};

const SNIPPETS = [
  {
    title: "List the room directory",
    code: `await doRpc(user, (u) =>
  u.directory()
    .select(({ rooms }) => ({ id: rooms.id, name: rooms.name }))
    .execute())`,
  },
  {
    title: "Aggregate — top posters in a room (no server endpoint)",
    code: `await doRpc(room, (r) =>
  r.messages()
    .groupBy(({ users }) => [users.name])
    .select(({ users, messages }) => ({ author: users.name, posts: messages.id.count() }))
    .orderBy(({ messages }) => [messages.id.count(), "desc"])
    .execute())`,
  },
  {
    title: "Filter my rooms by name",
    code: `await doRpc(user, (u) =>
  u.directory()
    .where(({ rooms }) => rooms.name.eq("lobby"))
    .select(({ rooms }) => ({ id: rooms.id, name: rooms.name }))
    .execute())`,
  },
  {
    title: "Splice the room into one transcript — SQLite group_concat",
    code: `await doRpc(room, (r) =>
  r.messages()
    .select(({ messages }) => ({ transcript: messages.body.groupConcat("\\n") }))
    .execute())`,
  },
];

const ConsolePlayground = () => (
  // Scroll container: center the content when it fits, scroll (not overflow
  // onto the neighboring panes) once it's taller than the pane — e.g. zoomed in.
  <div className="min-w-0 flex-1 overflow-auto px-8">
    <div className="mx-auto flex min-h-full max-w-xl flex-col items-center justify-center gap-4 py-8 text-center">
      <div className="text-sm text-gray-400">
        Pick a room on the left — or author a query yourself: click a snippet to load it into the wire prompt
        below (<code className="text-gray-300">user</code>, <code className="text-gray-300">room</code> (your
        current room, or <code className="text-gray-300">#lobby</code>),{" "}
        <code className="text-gray-300">doRpc</code>, <code className="text-gray-300">byRef</code> are in scope).
      </div>
      {SNIPPETS.map((s) => (
        <button
          key={s.title}
          onClick={() => wireInput.set(s.code)}
          className="w-full rounded border border-gray-800 bg-gray-950 p-3 text-left transition-colors hover:border-gray-600"
        >
          <div className="mb-1 text-xs text-gray-500">{s.title}</div>
          <pre className="overflow-x-auto font-mono text-[11px] leading-relaxed text-gray-300">{s.code}</pre>
        </button>
      ))}
      <div className="text-xs text-gray-600">
        The client composes these queries; each replays inside the Durable Object against the capability you
        hold. There's no per-query authorization — access is reachability.
      </div>
    </div>
  </div>
);
