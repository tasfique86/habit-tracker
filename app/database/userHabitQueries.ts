import { UserHabit } from "../types/userHabit";
import { getDatabase } from "./database";

export async function addUserHabit(
  habit: Omit<UserHabit, "id">
): Promise<void> {
  try {
    const db = await getDatabase();
    const {
      title,
      user_id,
      description,
      streak_count = 0,
      last_completed = null,
      frequency = "daily",
      reminder = null,
      notificationId,
      created_at = new Date().toISOString(),
    } = habit;

    await db.runAsync(
      `
    INSERT INTO usersHabits (user_id, title, description, streak_count, last_completed, frequency,reminder,notificationId, created_at)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `,
      [
        user_id,
        title,
        description,
        streak_count,
        last_completed,
        frequency,
        reminder,
        notificationId,
        created_at,
      ]
    );
  } catch (error) {
    console.error("Failed to add user habit:", error);
    throw error; // or handle it as you prefer
  }
}

export async function getUserHabits(userId: number): Promise<UserHabit[]> {
  try {
    const db = await getDatabase();
    const result = await db.getAllAsync(
      `SELECT * FROM usersHabits WHERE user_id = ?`,
      [userId]
    );
    return result as UserHabit[];
  } catch (error) {
    console.error("Failed to fetch user habits:", error);
    throw error; // or handle it as you prefer
  }
}

export async function getUserHabitsWithStreak(userId: number): Promise<UserHabit[]> {
  try {
    const db = await getDatabase();
    const result = await db.getAllAsync(
      `SELECT * FROM usersHabits WHERE user_id = ? AND streak_count > 0`,
      [userId]
    );
    return result as UserHabit[];
  } catch (error) {
    console.error("Failed to fetch user habits with streaks:", error);
    throw error;
  }
}

export async function deleteUserHabit(habitId: number): Promise<string | undefined> {
  try {
    const db = await getDatabase();
    
    const result = await db.getFirstAsync(
      `SELECT notificationId FROM usersHabits WHERE id = ?`,
      [habitId]
    ) as { notificationId?: string } | null;

    await db.runAsync(`DELETE FROM usersHabits WHERE id = ?`, [habitId]);

    return result?.notificationId ?? undefined; // Return the notificationId if it exists
  } catch (error) {
    console.error("Failed to delete habit:", error);
    throw error;
  }
}


export async function updateHabitStreak(habitId: number): Promise<void> {
  try {
    const db = await getDatabase();
    const today = new Date().toISOString().slice(0, 10);
    //console.log(today+"updateHabitStreak");
    await db.runAsync(
      `UPDATE usersHabits SET streak_count = streak_count + 1, last_completed = ? WHERE id = ?`,
      [today, habitId]
    );
  } catch (error) {
    console.error("Failed to update habit streak:", error);
    throw error; // or handle it as you prefer
  }
}




export async function addCompletedHabit(
  userId: number,
  habitId: number
): Promise<void> {
  try {
    const db = await getDatabase();
    const completed_at = new Date().toISOString();
    await db.runAsync(
      `INSERT INTO completedHabit (user_id, habit_id, completed_at) VALUES (?, ?, ?)`,
      [userId, habitId, completed_at]
    );
  } catch (error) {
    console.error("Failed to add completed habit:", error);
    throw error; // or handle it as you prefer
  }
}





export async function getCompletedHabits(
  userId: number
): Promise<{ completed_at: string }[]> {
  try {
    const db = await getDatabase();
    const result = await db.getAllAsync(
      `SELECT completed_at FROM completedHabit WHERE user_id = ? AND habit_id = ?`,
      [userId]
    );
    return result as { completed_at: string }[];
  } catch (error) {
    console.error("Failed to fetch completed habits:", error);
    throw error; // or handle it as you prefer
  }
}

export async function updateLastCompleted(habitId: number): Promise<void> {
  try {
    const db = await getDatabase();
    const today = new Date().toISOString().slice(0, 10); // format: YYYY-MM-DD

    await db.runAsync(
      `UPDATE completedHabit SET last_completed = ? WHERE id = ?`,
      [today, habitId]
    );
  } catch (error) {
    console.error("❌ Failed to update last completed date:", error);
    throw error;
  }
}


