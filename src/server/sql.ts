import { Database } from "bun:sqlite";

const db = new Database("app.db");

// Run migrations immediately on module load
db.run(`
  CREATE TABLE IF NOT EXISTS videos (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    url TEXT NOT NULL
  )
`);

export default db;