import * as Device from "expo-device";
import * as Notifications from "expo-notifications";
import { Alert } from "react-native";

export async function requestNotificationPermission()  {
  if (!Device.isDevice) {
    Alert.alert("Error", "Must use physical device for notifications.");
    return;
  }

  const { status: existingStatus } = await Notifications.getPermissionsAsync();
  let finalStatus = existingStatus;

  if (existingStatus !== "granted") {
    const { status } = await Notifications.requestPermissionsAsync();
    finalStatus = status;
  }

  if (finalStatus !== "granted") {
    Alert.alert("Permission Denied", "Notification permission is required.");
  }
}
