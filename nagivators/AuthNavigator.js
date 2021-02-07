import React from "react";
import { StyleSheet, Text, View } from "react-native";
import {
  createStackNavigator,
  TransitionPresets,
} from "@react-navigation/stack";
import { BlurView } from "expo-blur";
import RegisterUserScreen from "../screens/RegisterUserScreen";
import LoginScreen from "../screens/LoginScreen";

const AuthStack = createStackNavigator();

const AuthNavigator = () => {
  return (
    <AuthStack.Navigator
      initialRouteName={"Login"}
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
      <AuthStack.Screen name="Login" component={LoginScreen} />
      <AuthStack.Screen
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
      />
    </AuthStack.Navigator>
  );
};

export default AuthNavigator;

const styles = StyleSheet.create({});
