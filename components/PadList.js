import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import PadItem from "./PadItem";

const PAD_COLOR = {
  Drum: "#71CE73",
  HiHat: "orange",
  Bass: "#5786CB",
  Chord: "#C151A2",
  Melody: "pink",
  Synth: "pink",
  Guitar: "#6E49C9",
  Strings: "#71CEC3",
  Piano: "indianred",
  Vocal: "purple",
  FX: "brown",
};

const PadList = ({ type, time, bpm, status, padItems }) => {
  const [itemNumber, setItemNumber] = useState([1, 2, 3, 4, 5]);
  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-evenly",
        borderWidth: 1,
        marginHorizontal: 10,
        borderRadius: 10,
        backgroundColor: "#262929",
        marginVertical: 4,
      }}
    >
      {padItems.map((value, index) => (
        <View style={{ flexDirection: "row" }} key={index}>
          <PadItem
            type={type}
            color={PAD_COLOR[value.instrument]}
            displayName={value.displayName}
            time={time}
            instrument={value.instrument}
            bpm={bpm}
            status={status}
            sampleName={value.sampleName}
            steps={value.steps}
          />
          {index != itemNumber.length - 1 && (
            <View style={{ borderRightWidth: 1 }} />
          )}
        </View>
      ))}
    </View>
  );
};

export default PadList;

const styles = StyleSheet.create({});
