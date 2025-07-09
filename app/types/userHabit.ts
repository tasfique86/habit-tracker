export interface UserHabit {
    id: number;
    user_id: number; // ID of the user who created the habit
    title: string; // Title of the habit
    description: string; // Description of the habit
    streak_count?: number; // Number of consecutive days the habit has been completed
    last_completed?: string; // Date when the habit was last completed
    frequency?: 'daily' | 'weekly' | 'monthly'; // Frequency of the habit
    reminder?: string; // Reminder for the habit, can be null
    created_at?: string; // Timestamp when the habit was created
}
export interface HabitCompletion {
    id: number; 
    user_id: string;    
    habit_id: string;
    completed_at?: string; // ISO date string 
}