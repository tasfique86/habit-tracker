import { Stack, useRouter } from "expo-router";
import { useEffect } from "react";

function RouterGuard({ children } :{ children: React.ReactNode }) {

  const router =useRouter();
 
  const isAuth = true;
  
  useEffect(() => {

    if (!isAuth ) {
      router.replace("/auth")
    }
    });

  return <>{children}</>;
    
};

export default function RootLayout() {
  return( 
    
      <RouterGuard>
      <Stack >
        <Stack.Screen name="(tabs)" options={{ headerShown : false}} />  
      </Stack>
    </RouterGuard>
  
    
  
);

}
