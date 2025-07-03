import AntDesign from '@expo/vector-icons/AntDesign';
import Entypo from '@expo/vector-icons/Entypo';
import { Tabs } from "expo-router";
export default function TabsLayout() {
  return( 
  <Tabs screenOptions={{ tabBarActiveTintColor: "tomato"}}>
   
    <Tabs.Screen name="index" options={{ title: "Abc" ,tabBarIcon: ({color,focused})=>
      {return focused ? (<Entypo name="home" size={24} color={color}/>) : (<AntDesign name="home" size={24} color="black" />)}
    ,} } />
    <Tabs.Screen name="login" options={{ title: "Login"}} />
  </Tabs>
  
);

}
