import { UserHabit } from "../types/userHabit";
import { getDatabase } from "./database";

export async function addUserHabit(
  habit: Omit<UserHabit, "id">
): Promise<void> {
  const db = await getDatabase();
  const {
    title,
    user_id,
    description,
    streak_count = 0,
    last_completed = null,
    frequency = "daily",
    created_at = new Date().toISOString(),
  } = habit;

  await db.runAsync(
    `
    INSERT INTO usersHabit1 (user_id, title, description, streak_count, last_completed, frequency, created_at)
    VALUES (?, ?, ?, ?, ?, ?, ?)
    `,
    [
      user_id,
      title,
      description,
      streak_count,
      last_completed,
      frequency,
      created_at,
    ]
  );

}

export async function getUserHabits(
    userId: number
  ): Promise<UserHabit[]> {
    const db = await getDatabase();
    const result = await db.getAllAsync(
      `SELECT * FROM usersHabit1 WHERE user_id = ?`,
      [userId]
    );
    return result as UserHabit[];
  }