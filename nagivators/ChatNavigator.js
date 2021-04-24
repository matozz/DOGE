import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import ChatScreen from "../screens/ChatScreen";

const ChatStack = createStackNavigator();

const ChatNavigator = () => {
  return (
    <ChatStack.Navigator>
      <ChatStack.Screen name="Chat" component={ChatScreen} />
    </ChatStack.Navigator>
  );
};

export default ChatNavigator;

const styles = StyleSheet.create({});
