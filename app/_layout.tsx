import { Stack, useRouter, useSegments } from "expo-router";
import { useEffect } from "react";
import AuthProvider, { useAuth } from "./authProvider";

function RouterGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const segments = useSegments();
  const { user, isLoadingUser } = useAuth();

  useEffect(() => {
    if (isLoadingUser) return;

    const isAuthRoute = segments[0] === "auth";

    if (!user && !isAuthRoute) {
      router.replace("/auth");
    } else if (user && isAuthRoute) {
      router.replace("/");
    }
  }, [user, segments, isLoadingUser]);

  // Don't render anything until user loading is done
  if (isLoadingUser) return null;

  return <>{children}</>;
}

export default function RootLayout() {
  return (
    <AuthProvider>
      <RouterGuard>
        <Stack>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="auth" options={{ headerShown: false }} />
        </Stack>
      </RouterGuard>
    </AuthProvider>
  );
}
