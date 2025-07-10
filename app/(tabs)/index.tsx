import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useFocusEffect } from "@react-navigation/native";
import { useCallback, useEffect, useState } from "react";
import { ActivityIndicator, ScrollView, StyleSheet, View } from "react-native";
import { Button, SegmentedButtons, Surface, Text } from "react-native-paper";
import { useAuth } from "../authProvider";
import {
  deleteUserHabit,
  getUserHabits,
  updateHabitStreak,
} from "../database/userHabitQueries";
import { UserHabit } from "../types/userHabit";

const FREQUENCIES = ["daily", "weekly", "monthly"] as const;
type Frequency = (typeof FREQUENCIES)[number];

export default function Index() {
  const { signOut, user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [userHabits, setUserHabits] = useState<UserHabit[]>([]);

  const [frequency, setFrequency] = useState<Frequency>("daily");

  const today = new Date().toISOString().slice(0, 10);
  // const loadUserHabits = async () => {
  //   const result: UserHabit[] = await getUserHabits(user?.id || 0);
  //   setUserHabits(result);
  // }

  useFocusEffect(
    useCallback(() => {
      if (user) {
        fetchUserHabits();
      }
    }, [user?.id])
  );

  useEffect(() => {
    if (user) {
      fetchUserHabits();
      // sortByCompletedhabits(userHabits);
    }
  }, [user]);

  useEffect(() => {
    if (user) {
      refilterHabits();
    }
  }, [frequency]);

  const refilterHabits = async () => {
    if (!user?.id) return;
   // setLoading(true);
    try {
      const habits = await getUserHabits(user.id);
      const filtered = filterFrequencyHabits(habits, frequency);
      const sorted = sortByCompletedhabits(filtered);
      setUserHabits(sorted);
    } catch (error) {
      console.error("Error filtering habits by frequency:", error);
    }
  };

 

  const handleComplete = async (habit: object, habitId: number) => {
    console.log(habit);
    try {
      await updateHabitStreak(habitId); // call database update
      await fetchUserHabits(); // refresh UI
    } catch (error) {
      console.error("Error updating streak:", error);
    }
  };

  const handleDelete = async (habitId: number) => {
    try {
      await deleteUserHabit(habitId);
      setUserHabits((prevHabits) =>
        prevHabits.filter((habit) => habit.id !== habitId)
      );
    } catch (error) {
      console.error("Error deleting habit:", error);
    }
  };

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  const checkHabitCompleted = (habit: UserHabit) => {
    const lastDate = new Date(habit.last_completed);
    const today = new Date();
    console.log((today.getTime() - lastDate.getTime()) / (1000 * 60 * 60 * 24))
    const diff = Math.floor((today.getTime() - lastDate.getTime()) / (1000 * 60 * 60 * 24));
  
    // console.log(`Difference in days for [${habit.frequency}]:`, diff);
  
    if (habit.frequency === "weekly") {
      return diff < 7;
    } else if (habit.frequency === "monthly") {
      return diff < 30; 
    } else {
      return diff < 1;
    }
    
  //  return habit.last_completed === today; 

  };
  

  const sortByCompletedhabits = (habits: UserHabit[]) => {
    return habits.sort((a, b) => {
      const aCompleted = a.last_completed === today ? 1 : 0;
      const bCompleted = b.last_completed === today ? 1 : 0;
      return aCompleted - bCompleted; // ✅ completed habits last
    });
  };

  const filterFrequencyHabits = (habits: UserHabit[], frequency: Frequency) => {
    // console.log("Filtering habits by frequency:", frequency);
    return habits.filter((habit) => habit.frequency === frequency);
  };



  const fetchUserHabits = async () => {
    if (!user?.id) return;
    setLoading(true);
    try {
      const habits = await getUserHabits(user.id);
      const filtered = filterFrequencyHabits(habits, frequency);
      const sorted = sortByCompletedhabits(filtered);
      setUserHabits(sorted);
    } catch (error) {
      console.error("Error fetching user habits:", error);
    } finally {
      setLoading(false);
    }
  };

  // setUserHabits(sortByCompletedhabits(userHabits));

  return (
    <View style={styles.container}>
      {/* <View style={styles.header}>
        <Text variant="headlineSmall" style={styles.title}>
          Todays Habits
        </Text>
        <Button
          mode="text"
          onPress={signOut}
          icon="logout"
          labelStyle={{ color: "red", fontWeight: "bold" }}
          style={{ borderColor: "red", borderWidth: 1, borderRadius: 5 }}
        >
          Sign Out
        </Button>
      </View> */}

      <View style={styles.frequencyContainer}>
        <SegmentedButtons
          value={frequency}
          onValueChange={(value) => {
            setFrequency(value as Frequency);
          }}
          buttons={FREQUENCIES.map((freq) => ({
            value: freq,
            label: freq,
          }))}
        />
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        {userHabits?.length === 0 ? (
          <View style={styles.emptyState}>
            <Text style={styles.emptyStateText}>
              No habits found. Please add some habits.
            </Text>
          </View>
        ) : (
          userHabits.map((habit, key) => (
            <Surface key={key} style={styles.card}>
              <View style={styles.cardContent}>
                <View style={styles.cardHeader}>
                  <Text style={styles.cardTitle}>{habit.title}</Text>
                  <MaterialCommunityIcons
                    name="trash-can-outline"
                    size={22}
                    color="red"
                    onPress={() => handleDelete(habit.id)}
                  />
                </View>
                <Text style={styles.cardDescription}>{habit.description}</Text>
                <View style={styles.cardFooter}>
                  <View style={styles.streakBadge}>
                    <MaterialCommunityIcons
                      name="fire"
                      size={18}
                      color="#ff9800"
                    />
                    <Text style={styles.streakText}>
                      {habit.streak_count} day streak
                    </Text>
                  </View>
                  <View style={styles.frequencyBadge}>
                    <Text style={styles.frequencyText}>{habit.frequency}</Text>
                  </View>

                  {checkHabitCompleted(habit) ? (
                    <Text style={styles.completed}>Completed</Text>
                  ) : (
                    <Button
                      compact
                      onPress={() => handleComplete(habit, habit.id)}
                      style={{ backgroundColor: "#4ADE80" }}
                      mode="contained"
                    >
                      Complete
                    </Button>
                  )}
                </View>
              </View>
            </Surface>
          ))
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f5f5f5", // soft gray-blue background
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  title: {
    fontWeight: "bold",
    fontSize: 22,
    color: "#1E293B", // dark blue-gray
  },
  frequencyContainer: {
    marginBottom: 24,
    borderRadius: 8,
    overflow: "hidden",
  },
  card: {
    marginBottom: 16,
    backgroundColor: "#FFFFFF",
    borderRadius: 6,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 6,
    elevation: 5,
  },
  cardContent: {
    padding: 18,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#0F172A", // title dark navy
    marginBottom: 4,
  },
  cardDescription: {
    fontSize: 15,
    color: "#475569", // slate-600
  },
  cardFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 12,
  },
  cardCompleted: {
    backgroundColor: "#E6F4EA",
    borderColor: "#34D399",
    borderWidth: 1,
  },
  streakBadge: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFF7ED",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 999,
  },
  streakText: {
    marginLeft: 6,
    color: "#F97316", // orange-500
    fontWeight: "600",
    fontSize: 14,
  },
  frequencyBadge: {
    backgroundColor: "#EDE9FE",
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 999,
  },
  frequencyText: {
    color: "#7C3AED", // violet-600
    fontWeight: "600",
    fontSize: 14,
  },
  emptyState: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 100,
  },
  emptyStateText: {
    fontSize: 16,
    color: "#9CA3AF", // gray-400
    textAlign: "center",
  },
  swipeActionsLeft: {
    justifyContent: "center",
    alignItems: "flex-start",
    flex: 1,
    backgroundColor: "#F87171", // red-400
    borderRadius: 18,
    marginBottom: 18,
    marginTop: 2,
    paddingLeft: 16,
  },
  swipeActionsRight: {
    justifyContent: "center",
    alignItems: "flex-end",
    flex: 1,
    backgroundColor: "#4ADE80", // green-400
    borderRadius: 18,
    marginBottom: 18,
    marginTop: 2,
    paddingRight: 16,
  },
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 4,
  },
  completed: {
    color: "#10B981", // green-500
    fontSize: 12,
    fontWeight: "bold",
    opacity: 0.4,
  },
});
