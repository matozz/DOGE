import React from "react";
import { SafeAreaView } from "react-native";
import { StatusBar } from "react-native";
import { StyleSheet, Text, View } from "react-native";
import AgendaView from "../components/AgendaView";
import AudioRoom from "../components/AudioRoom";

const ReminderScreen = () => {
  return (
    <View style={styles.container}>
      <SafeAreaView>
        <AgendaView />
      </SafeAreaView>
      {/* <Text>Reminder</Text> */}
      {/* <AudioRoom /> */}
    </View>
  );
};

export default ReminderScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
  },
});
