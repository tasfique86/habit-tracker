import { Text, View } from "react-native";
import { Button } from "react-native-paper";

export default function Index() {

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text>Welcome To Our Project</Text>
      <Button mode='text' icon="logout">Sign Out</Button>
    </View>
  );
}
