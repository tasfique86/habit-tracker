import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Tabs } from "expo-router";
import React from 'react';
import { View } from 'react-native';
import { Button } from 'react-native-paper';
import { useAuth } from '../authProvider';



export default function TabsLayout() {
  
  const {signOut}= useAuth();
  // useEffect(() => {
  //   getDatabase();
  // }, []);

  return (
    <Tabs
      screenOptions={{
        headerStyle: { backgroundColor: "#f5f5f5" },
        headerShadowVisible: false,
        tabBarStyle: {
          backgroundColor: "#f5f5f5",
          borderTopWidth: 0,
          elevation: 0,
          shadowOpacity: 0,
        },
        tabBarActiveTintColor: "#6200ee",
        tabBarInactiveTintColor: "#666666",
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Today's Habits",
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="calendar-today" size={24} color={color} />
          ),
          headerRight: () => (
            <View style={{ marginEnd: 20 }}>
              <Button
              mode="outlined"
              onPress={signOut}
              icon="logout"
              labelStyle={{ color: "#6200ee", fontWeight: "bold" }}
             style={{ borderColor: "#6200ee", borderWidth: 1, borderRadius: 5 }}
            >
              Logout
            </Button>
            </View>
          )
          
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
