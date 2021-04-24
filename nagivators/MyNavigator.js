import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import MyScreen from "../screens/MyScreen";
import { BlurView } from "expo-blur";
import EditInfoScreen from "../screens/EditInfoScreen";

const MyStack = createStackNavigator();

const MyNavigator = () => {
  return (
    <MyStack.Navigator initialRouteName={"Setting"}>
      <MyStack.Screen
        name="Setting"
        component={MyScreen}
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
              tint="default"
              intensity={100}
              style={StyleSheet.absoluteFill}
            />
          ),
        }}
      />
      <MyStack.Screen
        name="Info"
        component={EditInfoScreen}
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
              tint="default"
              intensity={100}
              style={StyleSheet.absoluteFill}
            />
          ),
        }}
      />
    </MyStack.Navigator>
  );
};

export default MyNavigator;

const styles = StyleSheet.create({});
