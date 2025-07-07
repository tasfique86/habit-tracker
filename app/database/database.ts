import * as SQLite from 'expo-sqlite';

let db: SQLite.SQLiteDatabase | null = null;

export async function getDatabase(): Promise<SQLite.SQLiteDatabase> {
  if (!db) {
    db = await SQLite.openDatabaseAsync('habitDBtest1.db');
    await db.execAsync(`
      PRAGMA journal_mode = WAL;
      CREATE TABLE IF NOT EXISTS usersHabit1 (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        user_id INTEGER NOT NULL,
        title TEXT NOT NULL,
        description TEXT NOT NULL,
        streak_count INTEGER DEFAULT 0,
        last_completed TEXT,
        frequency TEXT DEFAULT 'daily',
        created_at TEXT DEFAULT (datetime('now', 'localtime'))
      );
    `);
  }
  return db;
}
