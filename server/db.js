import Database from "better-sqlite3";
import fs from "fs";

const DB_FILE = "./server/db.sqlite";

const firstRun = !fs.existsSync(DB_FILE);
const db = new Database(DB_FILE);

if (firstRun) {
  const schema = fs.readFileSync("./server/schema.sql", "utf8");
  db.exec(schema);
  console.log("DB initialized");
}

export default db;
