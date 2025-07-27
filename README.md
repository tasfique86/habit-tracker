# 📱 Habit Tracker App

A React Native app to help you build and track daily habits. Features include login/logout, habit creation, SQLite-based tracking, push notifications via Firebase Cloud Messaging (FCM), and streak history.

---

## 🚀 Features

- ✅ User Authentication (Mock Server)
- 📅 Daily Habit Scheduling
- 🔔 Push Notifications via Firebase
- 📊 Streak & Completion Tracking
- 🧠 SQLite for Local Habit Storage
- 🎯 Automatic Daily Reset of Habits

---

## 🛠️ Technologies Used

- React Native (Expo)
- TypeScript
- SQLite (`expo-sqlite`)
- Firebase Cloud Messaging (`@react-native-firebase/messaging`)
- Express (for backend scheduling)
- Node.js + Firebase Admin SDK

---

## 📦 Project Setup

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/tasfique86/habit-tracker.git
cd habit-tracker
```

---

### 2️⃣ Install Dependencies & Start the App

```bash
npm install
npx expo start
```

> 📱 Now scan the QR code with the **Expo Go app** on your Android or iOS device to run the app.

---

### 3️⃣ Setup Mock Authentication Server

The app uses a mock server to simulate user authentication.

#### 👉 Step 1: Create `db.json`

In the root of your project, create a file called `db.json` and add the following content:

```json
{
  "users": [
    {
      "id": "9017",
      "email": "tasfique1217@gmail.com",
      "password": "123456789"
    }
  ]
}
```

#### 👉 Step 2: Install JSON Server

```bash
npm install json-server
```

#### 👉 Step 3: Start the Server

```bash
npx json-server db.json --watch --port 3000
```

> This will start your mock API at: `http://192.168.0.140:3000/users`

---

## ✅ You're All Set!

- Start the React Native app with `npx expo start`
- Start the mock backend with `npx json-server db.json`
- Log in using the credentials from your mock database
- Start adding habits, setting reminders, and tracking your streaks!

---

## 📄 License

This project is licensed under the MIT License.

---

## ✨ Author

Developed by [@tasfique86](https://github.com/tasfique86)
