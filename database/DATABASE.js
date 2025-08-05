import Database from "better-sqlite3";

const db = new Database('database/databaseFile/estacionamento_escolar.db');

db.pragma('foreign_keys = ON');

export default db;