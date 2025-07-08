import { UserHabit } from "../types/userHabit";
import { getDatabase } from "./database";

export async function addUserHabit(
  habit: Omit<UserHabit, "id">
): Promise<void> {
  try{
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
  }catch(error) {
    console.error('Failed to add user habit:', error);
    throw error; // or handle it as you prefer
  }

}

export async function getUserHabits(
    userId: number
  ): Promise<UserHabit[]> {
    try{
        const db = await getDatabase();
    const result = await db.getAllAsync(
      `SELECT * FROM usersHabit1 WHERE user_id = ?`,
      [userId]
    );
    return result as UserHabit[];
    }catch(error) {
        console.error('Failed to fetch user habits:', error);
        throw error; // or handle it as you prefer
    }
  }

export async function deleteUserHabit(habitId: number): Promise<void> {
    try{
        const db = await getDatabase();
         await db.runAsync(
      `DELETE FROM usersHabit1 WHERE id = ?`,habitId)
    }catch(error) {
        console.error('Failed to delete habit:', error);
        throw error; // or handle it as you prefer
    }
}

export async function updateHabitStreak(habitId: number ): Promise<void> {
    try {
        const db = await getDatabase();
        const today = new Date().toISOString().slice(0, 10);
        //console.log(today+"updateHabitStreak");
        await db.runAsync(
          `UPDATE usersHabit1 SET streak_count = streak_count + 1, last_completed = ? WHERE id = ?`,
          [today, habitId]
        );
      } catch (error) {
        console.error('Failed to update habit streak:', error);
        throw error; // or handle it as you prefer
      }
  }