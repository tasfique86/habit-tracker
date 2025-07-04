import { Stack, useRouter, useSegments } from "expo-router";
import { useEffect } from "react";
import AuthProvider, { useAuth } from "./authProvider";


function RouterGuard({ children } :{ children: React.ReactNode }) {

  const router =useRouter();
  const {user, isLoadingUser} = useAuth();// Replace with actual authentication logic

  const segments = useSegments()
  
  useEffect(() => {
    const isAuthRoute = segments[0] === "auth";

    // if(!user)
    //   router.replace("/auth");

    if (!user && !isAuthRoute && !isLoadingUser) {
      router.replace("/auth");
    }else if (user && isAuthRoute && !isLoadingUser) {
      router.replace("/");
    }
  }, [user, segments]);
  return <>{children}</>;
}

export default function RootLayout() {
  return( 
      <AuthProvider>
      <RouterGuard>
      <Stack >
        <Stack.Screen name="(tabs)" options={{ headerShown : false}} />  
      </Stack>
    </RouterGuard>
    </AuthProvider>
 
  
    
  
);

}
