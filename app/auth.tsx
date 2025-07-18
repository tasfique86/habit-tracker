import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  View,
} from "react-native";
import { Button, Text, TextInput, useTheme } from "react-native-paper";
import { useAuth } from "./authProvider";

export default function Auth() {
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const { signIn, signUp } = useAuth();
  const router = useRouter();
  const theme = useTheme();

  const handleSwitch = () => {
    setIsSignUp((prev) => !prev);
    setError(null);
  };

  const handleAuth = async () => {
    if (!email || !password) {
      setError("Please fill in all fields");
      return;
    }
    if (password.length < 6) {
      setError("Password must be at least 6 characters long");
      return;
    }

    setError(null);
    setLoading(true);

    try {
      const authError = isSignUp
        ? await signUp(email, password)
        : await signIn(email, password);

      if (authError) {
        setError(authError);
      } else {
        router.replace("/"); // Go to home/habit screen
      }
    } catch (err) {
      setError("An unexpected error occurred");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "android" ? "padding" : "height"}
      style={styles.container}
    >
      <View style={styles.content}>
        <Text style={[styles.heading, isSignUp? styles.headingSignUp:styles.headingLogin]}>Habit Tracker</Text>
        <Text style={styles.title}>
          {isSignUp ? "Create Account" : "Log In"}
        </Text>

        <TextInput
          label="Email"
          autoCapitalize="none"
          keyboardType="email-address"
          placeholder="example@gmail.com"
          mode="outlined"
          style={styles.input}
          value={email}
          onChangeText={setEmail}
        />

        <TextInput
          label="Password"
          autoCapitalize="none"
          secureTextEntry
          mode="outlined"
          style={styles.input}
          value={password}
          onChangeText={setPassword}
        />

        {error && <Text style={{ color: theme.colors.error }}>{error}</Text>}

        {loading ? (
          <ActivityIndicator style={{ marginTop: 10 }} />
        ) : (
          <>
            <Button
              mode="contained"
              style={[
                styles.button,
                isSignUp ? styles.signUpButton : styles.signInButton,
              ]}
              onPress={handleAuth}
            >
              {isSignUp ? "Sign Up" : "Sign In"}
            </Button>
            <Button
              mode="text"
              onPress={handleSwitch}
              style={styles.switchButton}
              labelStyle={{ color: "#F97316" }} // orange-500
            >
              {isSignUp
                ? "Already have an account? Sign In"
                : "Don't have an account? Sign Up"}
            </Button>
          </>
        )}
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  content: {
    flex: 1,
    justifyContent: "center",
    padding: 16,
  },
  heading: {
    textAlign: "center",
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 24,
    color: "#22223b", // Primary color
    // color: "#F97316", // orange-500
    // color: "#7C3AED", // violet-600
    letterSpacing: 1,
    textTransform: "uppercase",
    textShadowColor: "#e0d7f7",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
    fontFamily: "Roboto_700Bold", // Ensure you have this font loaded
  },
  headingLogin:{
    color: "#22223b" 
  },headingSignUp:{
    color:"#15803D"
  },
  title: {
    textAlign: "center",
    fontSize: 24,
    marginBottom: 20,
  },
  input: {
    marginBottom: 10,
  },
  button: {
    marginTop: 10,
  },
  signUpButton: {
    backgroundColor: "#166534", // green for sign up
  },
  signInButton: {
    backgroundColor: "#22223b", // violet for sign in
  },
  switchButton: {
    marginTop: 16,
    textAlign: "center",
    color:"#F97316",
   
  },
});
