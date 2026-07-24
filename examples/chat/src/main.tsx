import { createRoot } from "react-dom/client";
import { App } from "./App";
import "./styles.css";

// No StrictMode: its double-mounted effects send every query twice, which
// muddies the wire panel — the whole point of this demo is that the wire
// log is exactly what the client authored.
createRoot(document.getElementById("root")!).render(<App />);
