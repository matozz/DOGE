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
import MusicScreen from "../screens/MusicScreen";
import { Host } from "react-native-portalize";
import AgendaScreen from "../components/Calendar";

const Tab = createBottomTabNavigator();

const ChatStack = createStackNavigator();
const ReminderStack = createStackNavigator();
const MusicStack = createStackNavigator();

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
        name="Reminder"
        component={AgendaScreen}
        options={{
          // headerStyleInterpolator: forFade,
          headerTintColor: "white",
          headerShown: false,
          headerStyle: { backgroundColor: "#c0c0c0" },
          headerTitleStyle: { fontWeight: "bold" },
        }}
      />
    </ReminderStack.Navigator>
  );
}

function MusicStackScreen() {
  return (
    <MusicStack.Navigator>
      <MusicStack.Screen
        name="Music"
        component={MusicScreen}
        options={{
          headerStyle: {
            backgroundColor: "#111111",
            shadowColor: "transparent",
          },
          headerTitleStyle: {
            color: "#fff",
          },
        }}
      />
    </MusicStack.Navigator>
  );
}

const TabNavigator = () => {
  return (
    <Host>
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
            } else {
              iconName = focused ? "musical-notes" : "musical-notes-outline";
            }

            // You can return any component that you like here!
            return <Ionicons name={iconName} size={size} color={color} />;
          },
        })}
        tabBarOptions={{
          activeTintColor: "#2685e4",
          inactiveTintColor: "gray",
          style: {
            backgroundColor: "#111111",
            borderTopWidth: 0,
          },
        }}
      >
        <Tab.Screen
          name="聊天室"
          component={ChatStackScreen}
          options={{ headerShown: true }}
        />
        <Tab.Screen name="日程" component={ReminderStackScreen} />
        <Tab.Screen name="创作" component={MusicStackScreen} />
      </Tab.Navigator>
    </Host>
  );
};

export default TabNavigator;

const styles = StyleSheet.create({});
