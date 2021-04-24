import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import { BlurView } from "expo-blur";
import MyNavigator from "./MyNavigator";
import Ionicons from "react-native-vector-icons/Ionicons";
import HomeScreen from "../screens/HomeScreen";
import ChatScreen from "../screens/ChatScreen";
import MyScreen from "../screens/MyScreen";
import ReminderScreen from "../screens/ReminderScreen";

const Tab = createBottomTabNavigator();

const ChatStack = createStackNavigator();
const ReminderStack = createStackNavigator();

function ChatStackScreen() {
  return (
    <ChatStack.Navigator>
      <ChatStack.Screen name="Home" component={HomeScreen} />
    </ChatStack.Navigator>
  );
}

function ReminderStackScreen() {
  return (
    <ReminderStack.Navigator>
      <ReminderStack.Screen
        name="日程"
        component={ReminderScreen}
        options={{ headerShown: false }}
      />
    </ReminderStack.Navigator>
  );
}

const TabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === "聊天室") {
            iconName = focused
              ? "chatbox-ellipses"
              : "chatbox-ellipses-outline";
          } else if (route.name === "日程") {
            iconName = focused ? "calendar" : "calendar-outline";
          }

          // You can return any component that you like here!
          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
      tabBarOptions={{
        activeTintColor: "#2685e4",
        inactiveTintColor: "gray",
      }}
    >
      <Tab.Screen
        name="聊天室"
        component={ChatStackScreen}
        options={{ headerShown: true }}
      />
      <Tab.Screen name="日程" component={ReminderStackScreen} />
      {/* <Tab.Screen name="我的" component={MyStackScreen} /> */}
    </Tab.Navigator>
  );
};

export default TabNavigator;

const styles = StyleSheet.create({});
