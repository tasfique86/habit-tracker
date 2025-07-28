# Welcome to your Expo app 👋

This is an [Expo](https://expo.dev) project created with [`create-expo-app`](https://www.npmjs.com/package/create-expo-app).

## Get started

🛠️ Setup Instructions
Follow these steps to set up and run the project locally:

1. Clone the repository

https://github.com/tasfique86/habit-tracker.git
cd habit-tracker

2. Install dependencies
Make sure you have Node.js and Expo CLI installed.


npm install

3. Setup Firebase
Go to Firebase Console

Create a project → Add Android app → Download google-services.json

Place the google-services.json file inside the root of your project or under the app directory as configured.


4. Set up Local Database (SQLite)

The SQLite database is automatically created on app launch.
No manual setup is required.
Data is stored locally on the device using expo-sqlite.

5. Enable Push Notifications
Install Expo Go on a physical Android device (FCM does not work on emulators).

Log in to your Expo account in the terminal:

npx expo login
Configure FCM by following Expo Push Notifications guide.

Make sure eas.json is correctly set up for the development build.

6. Run the project
Option A: Using development build
npx expo run:android

Option B: Using Expo Go (limitations apply)

npx expo start

⚠️ Firebase Cloud Messaging won't work in Expo Go. Use a dev build instead.

7. JSON Server for Authentication
If using JSON Server for mock login/logout:

npm install -g json-server
json-server --watch db.json --port 3001
Update API endpoints in your code as needed (e.g., http://localhost:3001/users).



✅ Features Checklist
 User Authentication (mock server)

 Add
 
 Delete Habit

 Streak Counter

 Filter by Frequency (Daily/Weekly/Monthly)

 Local Notifications (Daily Reminder)

 Push Notification with FCM ( for global user)

 SQLite-based persistent storage

