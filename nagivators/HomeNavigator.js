import React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import {
  createStackNavigator,
  TransitionPresets,
} from "@react-navigation/stack";
import { BlurView } from "expo-blur";
import AddChatScreen from "../screens/AddChatScreen";
import TabNavigator from "./TabNavigator";
import MyScreen from "../screens/MyScreen";
import MyNavigator from "./MyNavigator";
import AddReminderScreen from "../screens/AddReminderScreen";

const HomeStack = createStackNavigator();

const HomeNavigator = () => {
  return (
    <HomeStack.Navigator
      initialRouteName={"Home"}
      mode="modal"
      screenOptions={({ route }) => {
        return {
          headerStyle: { backgroundColor: "#2C6BED" },
          headerTitleStyle: { color: "white" },
          headerTintColor: "white",
          gestureEnabled: true,
          cardOverlayEnabled: true,
          ...TransitionPresets.ModalPresentationIOS,
        };
      }}
    >
      <HomeStack.Screen
        name="Home"
        component={TabNavigator}
        options={{ headerShown: false }}
      />
      <HomeStack.Screen
        name="AddChat"
        component={AddChatScreen}
        options={{
          headerStatusBarHeight: 0,
          headerStyle: { height: 55 },
          headerTitleStyle: {
            color: "black",
          },
          headerTintColor: "black",
          headerTransparent: true,
          headerBackground: () => (
            <BlurView
              tint="light"
              intensity={100}
              style={StyleSheet.absoluteFill}
            />
          ),
        }}
      />
      <HomeStack.Screen
        name="AddReminder"
        component={AddReminderScreen}
        options={{
          headerStatusBarHeight: 0,
          headerStyle: { height: 55 },
          headerTitleStyle: {
            color: "black",
          },
          headerTintColor: "black",
          headerTransparent: true,
          headerBackground: () => (
            <BlurView
              tint="light"
              intensity={100}
              style={StyleSheet.absoluteFill}
            />
          ),
        }}
      />
      <HomeStack.Screen
        name="Setting"
        component={MyNavigator}
        options={{
          headerShown: false,
        }}
      />
    </HomeStack.Navigator>
  );
};

export default HomeNavigator;

const styles = StyleSheet.create({});
