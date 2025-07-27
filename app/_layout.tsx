import { NotificationProvider } from "@/context/NotificationContext";
import { requestNotificationPermission } from "@/utils/localNotification";
import * as Notifications from "expo-notifications";
import { Stack, useRouter, useSegments } from "expo-router";
import { useEffect } from "react";
import { Alert } from "react-native";
import AuthProvider, { useAuth } from "./authProvider";
import { getDatabase } from "./database/database";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
    shouldShowBanner: true, // ✅ required for iOS 15+
    shouldShowList: true    // ✅ required for iOS 15+
  }),
});



function RouterGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const segments = useSegments();
  const { user, isLoadingUser } = useAuth();

  useEffect(() => {
    getDatabase();
    requestNotificationPermission().catch((error) => {
      console.error("Error requesting notification permission:", error);
      Alert.alert("Error", "Failed to request notification permission.");
    });
  }, []);
  useEffect(() => {
    if (isLoadingUser) return;

    const isAuthRoute = segments[0] === "auth";

    if (!user && !isAuthRoute) {
      router.replace("/auth");
    } else if (user && isAuthRoute) {
      router.replace("/");
    }
  }, [user, segments, isLoadingUser,router]);

  // Don't render anything until user loading is done
  if (isLoadingUser) return null;

  return <>{children}</>;
}

export default function RootLayout() {
  return (
    <NotificationProvider>
      <AuthProvider>
      <RouterGuard>
        <Stack>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="auth" options={{ headerShown: false }} />
        </Stack>
      </RouterGuard>
    </AuthProvider>
    </NotificationProvider>
  );
}


