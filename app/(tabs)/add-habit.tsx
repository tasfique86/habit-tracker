import { MaterialCommunityIcons } from "@expo/vector-icons";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useRouter } from "expo-router";
import { useState } from "react";
import { Alert, Platform, Pressable, StyleSheet, View } from "react-native";
import {
  Button,
  SegmentedButtons,
  Text,
  TextInput,
  useTheme,
} from "react-native-paper";
import { useAuth } from "../authProvider";
import { addUserHabit } from "../database/userHabitQueries";

const FREQUENCIES = ["daily", "weekly", "monthly"] as const;
type Frequency = (typeof FREQUENCIES)[number];

export default function AddHabitScreen() {
  const { user } = useAuth();
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [frequency, setFrequency] = useState<Frequency>("daily");
  const [error, setError] = useState<string | null>(null);

  const [reminder, setReminder] = useState<Date | null>(null);
  const [showTimePicker, setShowTimePicker] = useState(false);

  const router = useRouter();
  const theme = useTheme();

  const handleSubmit = async () => {
    if (!user) {
      return Alert.alert("Error", "You must be logged in to add a habit");
    }

    if (!title || !description || !reminder) {
      return Alert.alert("Error", "Title and description are required");
    }

    const created_at = new Date().toISOString().slice(0, 10);
    const last_completed = "not required";

    try {
      const formattedReminder = reminder
        ? reminder.toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
            hour12: true,
          })
        : undefined;
      await addUserHabit({
        user_id: user.id,
        title,
        description,
        frequency,
        created_at,
        last_completed,
        reminder: formattedReminder,
        streak_count: 0,
      });

      setTitle("");
      setDescription("");
      setFrequency("daily");
      setReminder(null);

      Alert.alert("Success", "Habit added successfully");
      router.back(); // ✅ Go back to index
    } catch (error: any) {
      console.error("Error adding habit:", error);
      setError(error.message || "An error occurred while adding the habit");
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        label="Title"
        mode="outlined"
        style={styles.input}
        onChangeText={setTitle}
        value={title}
      />
      <TextInput
        label="Description"
        mode="outlined"
        style={styles.input}
        onChangeText={setDescription}
        value={description}
      />

      <View style={styles.reminderSection}>
        <View style={styles.reminderLabelContainer}>
          <MaterialCommunityIcons
            name="clock-outline"
            size={18}
            color={reminder ? "#333" : "#999"}
            style={{ marginRight: 6 }}
          />
          <Text style={styles.reminderLabelText}>Reminder Time</Text>
        </View>

        <Pressable
          onPress={() => setShowTimePicker(true)}
          style={styles.reminderInput}
        >
          <Text
            style={reminder ? styles.reminderText : styles.reminderPlaceholder}
          >
            {reminder
              ? reminder.toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                  hour12: true,
                })
              : "Pick a time"}
          </Text>
        </Pressable>
      </View>

      {showTimePicker && (
        <DateTimePicker
          value={reminder || new Date()}
          mode="time"
          display={Platform.OS === "ios" ? "spinner" : "default"}
          is24Hour={false}
          onChange={(event, selectedDate) => {
            setShowTimePicker(false);
            if (selectedDate) setReminder(selectedDate);
          }}
        />
      )}

      <View style={styles.frequencyContainer}>
        <SegmentedButtons
          value={frequency}
          onValueChange={(value) => setFrequency(value as Frequency)}
          buttons={FREQUENCIES.map((freq) => ({
            value: freq,
            label: freq,
          }))}
          
        />
      </View>

      <Button
        mode="contained"
        disabled={!title || !description || !reminder}
        onPress={handleSubmit}
      >
        Add Habit
      </Button>

      {error && <Text style={{ color: theme.colors.error }}>{error}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#ffffff",
  },
  input: {
    marginBottom: 16,
    backgroundColor: "#ffffff", // ensures paper inputs are white
  },
  timePicker: {
    borderWidth: 1,
    borderColor: "#ddd",
    padding: 14,
    borderRadius: 8,
    marginBottom: 16,
    backgroundColor: "#fafafa",
    justifyContent: "center",
  },
  timePickerText: {
    color: "#333",
    fontSize: 16,
  },
  timePlaceholderText: {
    color: "#999",
    fontSize: 16,
  },
  frequencyContainer: {
    marginBottom: 24,
    borderRadius: 8,
    overflow: "hidden",
  },
  errorText: {
    color: "red",
    textAlign: "center",
    marginTop: 12,
  },
  reminderSection: {
    marginBottom: 20,
  },

  reminderLabel: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 6,
    color: "#333",
  },

  reminderInput: {
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderRadius: 10,
    backgroundColor: "#f0f0f0",
    borderWidth: 1,
    borderColor: "#ddd",
    elevation: 1, // subtle shadow
  },

  reminderText: {
    fontSize: 16,
    fontWeight: "500",
    color: "#222",
  },

  reminderPlaceholder: {
    fontSize: 16,
    color: "#999",
  },
  reminderLabelContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 6,
    paddingHorizontal: 2,
  },
  
  reminderLabelText: {
    fontSize: 14,
    color: "#333",
    fontWeight: "500",
  },
  
});
