import { useCallback, useEffect, useState } from "react";
import { doRpc } from "typegres/capnweb";
import type { Notes, Users } from "../server/api";
import {
  listNotes,
  login,
  loginUser,
  type Credentials,
  type Note,
} from "./rpc";

type Draft = { title: string; body: string };
const emptyDraft: Draft = { title: "", body: "" };
export default function App() {
  const [credentials, setCredentials] = useState<Credentials>();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [notes, setNotes] = useState<Note[]>([]);
  const [selectedId, setSelectedId] = useState<string>();
  const [draft, setDraft] = useState<Draft>(emptyDraft);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  const refresh = useCallback(async () => {
    if (!credentials) { return; }
    try {
      const rows = await listNotes(credentials);
      setNotes(rows);
      setSelectedId((current) => current && rows.some((note) => note.id === current)
        ? current
        : rows[0]?.id);
    } catch (reason) {
      setError(reason instanceof Error ? reason.message : String(reason));
    }
  }, [credentials]);

  useEffect(() => {
    if (credentials) { void refresh(); }
  }, [refresh, credentials]);

  const selected = notes.find((note) => note.id === selectedId);
  useEffect(() => {
    setDraft(selected ? { title: selected.title, body: selected.body } : emptyDraft);
  }, [selected]);

  const submitLogin = async (event: React.FormEvent) => {
    event.preventDefault();
    setBusy(true);
    setError("");
    try {
      const next = await login(username, password);
      setCredentials(next);
      setPassword("");
    } catch (reason) {
      setError(reason instanceof Error ? reason.message : String(reason));
    } finally {
      setBusy(false);
    }
  };

  const create = async () => {
    if (!credentials) { return; }
    setBusy(true);
    try {
      await doRpc(loginUser(credentials), (user: Users) => {
        const created = user.createNote({ title: "Untitled note", body: "" }) as unknown as {
          map: (fn: () => undefined) => undefined;
        };
        return created.map(() => undefined);
      });
      const rows = await listNotes(credentials);
      setNotes(rows);
      setSelectedId(rows[0]?.id);
    } finally {
      setBusy(false);
    }
  };

  const save = async () => {
    if (!credentials || !selected || !draft.title.trim()) { return; }
    setBusy(true);
    setError("");
    try {
      await doRpc(loginUser(credentials), (user: Users) => {
        const note = user.notes()
          .where(({ notes }) => notes.id.eq(selected.id))
          .one() as unknown as Notes;
        return note.update({
          title: draft.title.trim(),
          body: draft.body,
        }).execute();
      });
      await refresh();
    } catch (reason) {
      setError(reason instanceof Error ? reason.message : String(reason));
    } finally {
      setBusy(false);
    }
  };

  const remove = async () => {
    if (!credentials || !selected || !confirm(`Delete “${selected.title}”?`)) { return; }
    setBusy(true);
    try {
      await doRpc(loginUser(credentials), (user: Users) => {
        const note = user.notes()
          .where(({ notes }) => notes.id.eq(selected.id))
          .one() as unknown as Notes;
        return note.delete().execute();
      });
      await refresh();
    } finally {
      setBusy(false);
    }
  };

  const logout = () => {
    setCredentials(undefined);
    setNotes([]);
    setSelectedId(undefined);
  };

  if (!credentials) {
    return <main className="login-shell">
      <section className="login-card">
        <div className="brand-mark">t</div>
        <p className="eyebrow">TYPEGRES + ORACLE</p>
        <h1>Your ideas,<br /><span>brightly organized.</span></h1>
        <p className="lede">A tiny, typed notes app backed by Oracle Database.</p>
        <form onSubmit={submitLogin}>
          <label>Username<input autoComplete="username" value={username} onChange={(event) => setUsername(event.target.value)} required /></label>
          <label>Password<input type="password" autoComplete="current-password" value={password} onChange={(event) => setPassword(event.target.value)} required /></label>
          {error && <div className="error">{error}</div>}
          <button disabled={busy}>{busy ? "Opening…" : "Open my notes"}</button>
        </form>
        <p className="hint">New username? We’ll create it. Returning? Use the same password.</p>
      </section>
      <div className="orb orb-one" /><div className="orb orb-two" />
    </main>;
  }

  return <main className="app-shell">
    <aside className="sidebar">
      <header><div className="brand-mark small">t</div><div><strong>Oracle Notes</strong><span>@{credentials.username}</span></div></header>
      <button className="new-note" onClick={create} disabled={busy}>＋ New note</button>
      <nav>
        {notes.map((note) => <button key={note.id} className={note.id === selectedId ? "active" : ""} onClick={() => setSelectedId(note.id)}>
          <strong>{note.title}</strong>
          <span>{note.body.slice(0, 72) || "Empty note"}</span>
        </button>)}
        {notes.length === 0 && <p className="empty-list">No notes yet.<br />Make something lovely.</p>}
      </nav>
      <button className="logout" onClick={logout}>Sign out</button>
    </aside>
    <section className="editor">
      {selected ? <>
        <div className="editor-top"><span>Updated {new Date(selected.updated_at).toLocaleString()}</span><button className="delete" onClick={remove}>Delete</button></div>
        <input className="title" value={draft.title} onChange={(event) => setDraft({ ...draft, title: event.target.value })} maxLength={120} />
        <textarea value={draft.body} onChange={(event) => setDraft({ ...draft, body: event.target.value })} maxLength={3_500} placeholder="Start writing…" />
        <footer>{error ? <span className="error-text">{error}</span> : <span>Saved securely in Oracle</span>}<button onClick={save} disabled={busy || !draft.title.trim()}>{busy ? "Saving…" : "Save note"}</button></footer>
      </> : <div className="blank-state"><div>✦</div><h2>A fresh page awaits.</h2><p>Create a note to get started.</p><button onClick={create}>Create my first note</button></div>}
    </section>
  </main>;
}
