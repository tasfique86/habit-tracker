import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Tabs } from "expo-router";
import React, { useEffect } from 'react';
import { getDatabase } from '../database/database';

export default function TabsLayout() {
  useEffect(() => {
    getDatabase();
  }, []);

  return (
    <Tabs screenOptions={{ tabBarActiveTintColor: "tomato" }}>
      <Tabs.Screen
        name="index"
        options={{
          title: "Today's Habits",
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="calendar-today" size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="streaks"
        options={{
          title: "Streaks",
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="chart-line" size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="add-habit"
        options={{
          title: "Add Habit",
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="plus-circle" size={24} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
