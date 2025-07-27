> Part 4: Project Documentation Habit Tracker App
>
> 1 Architecture Overview
>
> The Habit Tracker app is developed using the following technologies:
>
> – React Native (Expo) — UI development and mobile features.
>
> – SQLite (via expo-sqlite) — Local persistent storage of habit data.
>
> – Firebase Cloud Messaging (FCM) — Push notification scheduling.
>
> – AsyncStorage — Persistent user sessions.
>
> – JSON Server (Mock Backend) — API simulation during development.
>
> The app uses component-based structure with screens such as:
>
> – add-habit.tsx — Add a new habit.
>
> – index.tsx — Display and manage today’s habits.
>
> – streaks.tsx — Show best streaks and ranking.
>
> – authProvider.tsx — Authentication context (Sign In / Sign Up).





> 2 SQLite Schema and Setup
>
> Tables are created during initialization using SQL queries:
>
> usersHabits Table

CREATE TABLE IF NOT EXISTS usersHabits ( id INTEGER PRIMARYKEY
AUTOINCREMENT, user id INTEGER NOT NULL,

> title TEXT NOT NULL, description TEXT NOT NULL,
>
> streak count INTEGER DEFAULT 0, last completed TEXT,
>
> frequency TEXT DEFAULT ’ daily ’ ,
>
> created at TEXT DEFAULT (datetime( ’now’ , ’ localtime ’ )) );
>
> 1
>
> completedHabits Table

CREATE TABLE IF NOT EXISTS completedHabits ( id INTEGER PRIMARYKEY
AUTOINCREMENT,

> user id INTEGER NOT NULL, habit id INTEGER NOT NULL, completed at TEXT
> NOT NULL,
>
> FOREIGN KEY( habit id ) REFERENCES usersHabit1(id) );
>




> 3 Login Flow and Mock Server Usage
>
> Authentication is handled via Axios and a mock API server. User
> information is stored in AsyncStorage after login or signup.
>
> Example: Sign Up Logic
>
> const res = await axios . post ( ‘\${API ~~U~~RL}/signup ‘ , { email ,
> password }); await AsyncStorage . setItem ( ’ users ’ , JSON.
> stringify ( res . data ));
>
> setUser ( res . data );
>





> 4 Notification Flow with FCM :
> Send a daily notification to all users of the Habit Tracker app from Firebase.




>
> 5 Assumptions, Corner Cases, and Improvements
>
> • Assumes consistent local time for date comparisons.
>
> • A habit is considered “completed” based on last completed date.
>
> • Current UI uses basic calendar logic; monthly/weekly filters are
> manual.
>
> • Notifications do not persist after app uninstall.
>
> • Improvements include streak badges, calendar view, and progress
> tracking.
>
> 2
