import { Database } from "bun:sqlite";

const db = new Database("app.db");

db.run(`
  CREATE TABLE IF NOT EXISTS videos (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    url TEXT NOT NULL UNIQUE
  )
`);

export default db;