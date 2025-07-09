import * as SQLite from 'expo-sqlite';

let db: SQLite.SQLiteDatabase | null = null;

export async function getDatabase(): Promise<SQLite.SQLiteDatabase> {
  if (db) return db;

  try {
    db = await SQLite.openDatabaseAsync('habitTracker.db');
    await db.execAsync(`PRAGMA foreign_keys = ON;`); // ✅ Ensure foreign key support
    await db.execAsync(`PRAGMA journal_mode = WAL;`);

    // Main habits table
    await db.execAsync(`
      CREATE TABLE IF NOT EXISTS usersHabits (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        user_id INTEGER NOT NULL,
        title TEXT NOT NULL,
        description TEXT NOT NULL,
        streak_count INTEGER DEFAULT 0,
        last_completed TEXT,
        frequency TEXT DEFAULT 'daily',
        reminder TEXT NOT NULL,
        created_at TEXT DEFAULT (datetime('now', 'localtime'))
      );
    `);

    // ✅ Completed habits table with foreign key and ON DELETE CASCADE
    await db.execAsync(`
      CREATE TABLE IF NOT EXISTS completedHabit (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        habit_id INTEGER NOT NULL,
        user_id INTEGER NOT NULL,
        completed_at TEXT NOT NULL,
        FOREIGN KEY(habit_id) REFERENCES usersHabits(id) ON DELETE CASCADE
      );
    `);

    // ✅ Index to speed up queries by user_id or habit_id
    await db.execAsync(`
      CREATE INDEX IF NOT EXISTS idx_completedHabit_user_habit 
      ON completedHabit(user_id, habit_id);
    `);

    // ✅ Optional: prevent duplicate completion for same habit on same day
    await db.execAsync(`
      CREATE UNIQUE INDEX IF NOT EXISTS uniq_habit_date 
      ON completedHabit(habit_id, completed_at);
    `);

    console.log("✅ Database initialized with usersHabits and completedHabit");
    return db;
  } catch (error) {
    console.error("❌ Error opening or initializing DB:", error);
    throw error;
  }
}
