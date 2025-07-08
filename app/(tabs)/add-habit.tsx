import { useRouter } from "expo-router";
import { useState } from "react";
import { Alert, StyleSheet, View } from "react-native";
import {
  Button,
  SegmentedButtons,
  Text,
  TextInput,
  useTheme,
} from "react-native-paper";
import { useAuth } from "../authProvider";
import { addUserHabit } from "../database/userHabitQueries";


const FREQUENCIES = ["daily", "weekly", "monthly"];
type Frequency = (typeof FREQUENCIES)[number];

export default function AddHabitScreen() {
  const { user } = useAuth();
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [frequency, setFrequency] = useState<Frequency>("daily");
  const [error, setError] = useState<string | null>(null);

  const router = useRouter();
  const theme = useTheme();

  const handleSubmit = async () => {
    if (!user) {
      return Alert.alert("Error", "You must be logged in to add a habit");
    }

    if (!title || !description) {
      return Alert.alert("Error", "Title and description are required");
    }

    const created_at = new Date().toISOString().slice(0, 10);
    const last_completed = "not required";

    try {
      await addUserHabit({
        user_id: user.id,
        title,
        description,
        frequency,
        created_at,
        last_completed,
        streak_count: 0,
      });

      setTitle("");
      setDescription("");
      setFrequency("daily");

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

      {/* <TimeInput
        isDisabled
        defaultValue={new Time(11, 45)}
        label="Event Time"
      /> */}

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
        disabled={!title || !description}
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
    padding: 16,
    backgroundColor: "#f5f5f5",
  },
  input: {
    marginBottom: 16,
  },
  frequencyContainer: {
    marginBottom: 24,
  },
});
