import { Text, View } from "react-native";
import { Button } from "react-native-paper";
import { useAuth } from "../authProvider";

export default function Index() {
  const { signOut } = useAuth();
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text>Welcome To Our Project</Text>
      <Button mode='text' onPress={signOut} icon="logout">Sign Out</Button>
    </View>
  );
}
