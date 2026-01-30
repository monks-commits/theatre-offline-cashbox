import express from "express";
import cors from "cors";
import db from "./db.js";

const app = express();
app.use(cors());
app.use(express.json());

/* -------- SHOWS -------- */

app.get("/api/shows", (req, res) => {
  const rows = db.prepare("SELECT * FROM shows").all();
  res.json(rows);
});

app.post("/api/shows", (req, res) => {
  const { id, title, date, time } = req.body;
  db.prepare(
    "INSERT INTO shows (id,title,date,time) VALUES (?,?,?,?)"
  ).run(id, title, date, time);
  res.json({ ok: true });
});

/* -------- SEATS -------- */

app.get("/api/tickets/:showId", (req, res) => {
  const rows = db.prepare(
    "SELECT seat_key,status FROM tickets WHERE show_id=?"
  ).all(req.params.showId);
  res.json(rows);
});

/* -------- SELL / RESERVE -------- */

app.post("/api/tickets", (req, res) => {
  const { show_id, seat_key, status, channel, price } = req.body;

  db.prepare(`
    INSERT INTO tickets
    (show_id, seat_key, status, channel, price, sold_at)
    VALUES (?,?,?,?,?,datetime('now'))
  `).run(show_id, seat_key, status, channel, price);

  res.json({ ok: true });
});

app.listen(3000, () => {
  console.log("Offline server running on http://localhost:3000");
});
