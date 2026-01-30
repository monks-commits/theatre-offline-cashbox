PRAGMA foreign_keys = ON;

-- Сеансы
CREATE TABLE IF NOT EXISTS shows (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  date TEXT NOT NULL,
  time TEXT NOT NULL
);

-- Места
CREATE TABLE IF NOT EXISTS seats (
  seat_key TEXT PRIMARY KEY,
  zone TEXT,
  row INTEGER,
  seat INTEGER
);

-- Продажи / брони
CREATE TABLE IF NOT EXISTS tickets (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  show_id TEXT NOT NULL,
  seat_key TEXT NOT NULL,
  status TEXT CHECK(status IN ('sold','reserved')) NOT NULL,
  channel TEXT CHECK(channel IN ('cash','admin')) NOT NULL,
  price INTEGER NOT NULL,
  sold_at TEXT NOT NULL,
  FOREIGN KEY(show_id) REFERENCES shows(id)
);
