import { Database } from "bun:sqlite";

let db;

export function initDB() {
  db = new Database("app.db");
}

export { db };