import "react-native-gesture-handler";
import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import AuthNavigator from "./nagivators/AuthNavigator";
import HomeNavigator from "./nagivators/HomeNavigator";
import ChatNavigator from "./nagivators/ChatNavigator";
import ChatScreen from "./screens/ChatScreen";
import TabNavigator from "./nagivators/TabNavigator";
import "moment";
import "moment/locale/zh-cn";
import MusicScreen from "./screens/MusicScreen";

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        // initialRouteName={"Home"}
        screenOptions={{
          headerShown: false,
        }}
        // initialRouteName="Home"
      >
        <Stack.Screen name="Auth" component={AuthNavigator} />
        <Stack.Screen name="Home" component={HomeNavigator} />
        <Stack.Screen
          name="Chats"
          component={ChatScreen}
          options={{ headerShown: true }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
