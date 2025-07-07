export interface UserHabit {
    id: number;
    user_id: number; // ID of the user who created the habit
    title: string; // Title of the habit
    description: string; // Description of the habit
    streak_count?: number; // Number of consecutive days the habit has been completed
    last_completed?: string; // Date when the habit was last completed
    frequency?: 'daily' | 'weekly' | 'monthly'; // Frequency of the habit
    created_at?: string; // Timestamp when the habit was created
}