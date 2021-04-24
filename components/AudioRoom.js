import React, { useEffect, useRef, useState } from "react";
import { StyleSheet, Text, View, Button } from "react-native";
import { Audio } from "expo-av";
import { auth, db } from "../firebase";

const AudioRoom = () => {
  const [recording, setRecording] = useState();

  useEffect(() => {}, []);

  //   async function startRecording() {
  //     try {
  //       console.log("Requesting permissions..");
  //       await Audio.requestPermissionsAsync();
  //       await Audio.setAudioModeAsync({
  //         allowsRecordingIOS: true,
  //         playsInSilentModeIOS: true,
  //       });
  //       console.log("Starting recording..");
  //       const recording = new Audio.Recording();
  //       await recording.prepareToRecordAsync(
  //         Audio.RECORDING_OPTIONS_PRESET_HIGH_QUALITY
  //       );
  //       await recording.startAsync();
  //       setRecording(recording);
  //       console.log("Recording started");
  //     } catch (err) {
  //       console.error("Failed to start recording", err);
  //     }
  //   }

  //   async function stopRecording() {
  //     console.log("Stopping recording..");
  //     setRecording(undefined);
  //     await recording.stopAndUnloadAsync();
  //     const uri = recording.getURI();
  //     console.log("Recording stopped and stored at", uri);
  //   }
  return (
    <View>
      {/* <Button
        title={recording ? "Stop Recording" : "Start Recording"}
        onPress={recording ? stopRecording : startRecording}
      /> */}
      <Text>1</Text>
    </View>
  );
};

export default AudioRoom;

const styles = StyleSheet.create({});
