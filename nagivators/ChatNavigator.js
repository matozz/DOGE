import React from "react";
import { StyleSheet, Text, View } from "react-native";
import {
  createStackNavigator,
  TransitionPresets,
} from "@react-navigation/stack";
import { BlurView } from "expo-blur";
import HomeScreen from "../screens/HomeScreen";

const ChatStack = createStackNavigator();

const ChatNavigator = () => {
  return (
    <ChatStack.Navigator
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
      <ChatStack.Screen name="Home" component={HomeScreen} />
      {/* <ChatStack.Screen
        name="Register"
        component={RegisterUserScreen}
        options={{
          headerStatusBarHeight: 0,
          headerStyle: { height: 55 },
          headerTitle: "",
          headerTintColor: "black",
          headerBackTitle: " ",
          headerTransparent: true,
          // headerLeftContainerStyle: {
          //   margin: 10,
          // },
          headerBackground: () => (
            <BlurView
              tint="light"
              intensity={100}
              style={StyleSheet.absoluteFill}
            />
          ),
        }}
      /> */}
    </ChatStack.Navigator>
  );
};

export default ChatNavigator;

const styles = StyleSheet.create({});
