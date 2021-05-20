import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { TouchableOpacity } from "react-native";

let allBpm = [];
for (let i = 0; i < 120; i++) {
  allBpm.push(60 + i);
}

const MuiscOption = ({ bpm, setSelectedBpm, setPackIndex }) => {
  const [bpm1, setBpm1] = useState(bpm);

  const PACKS = [
    { title: "The ChainSmokers" },
    { title: "Jay Chou" },
    { title: "Trap" },
    { title: "Tropical House" },
  ];

  return (
    <View>
      <Text
        style={{
          color: "white",
          marginTop: 20,
          fontSize: 17,
          fontWeight: "600",
          textAlign: "center",
        }}
      >
        BPM
      </Text>
      <Picker
        selectedValue={String(bpm1)}
        onValueChange={(itemValue, itemIndex) => {
          setBpm1(itemValue);
          setSelectedBpm(itemValue);
        }}
      >
        {/* <Picker.Item label="1" value="1" color="white" /> */}
        {allBpm.map((value, index) => (
          <Picker.Item
            key={value}
            label={String(value)}
            value={String(value)}
            color="white"
          />
        ))}
      </Picker>
      <Text
        style={{
          color: "white",
          marginBottom: 20,
          fontSize: 17,
          fontWeight: "600",
          textAlign: "center",
        }}
      >
        Packs
      </Text>
      <View
        style={{
          width: 370,
          flexDirection: "row",
          justifyContent: "space-between",
          marginHorizontal: 10,
          flexWrap: "wrap",
        }}
      >
        {PACKS.map((value, index) => (
          <TouchableOpacity
            style={styles.pack}
            key={index}
            activeOpacity={0.5}
            onPress={() => setPackIndex(index)}
          >
            <Text style={{ color: "white", fontWeight: "bold" }}>
              {value.title}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

export default MuiscOption;

const styles = StyleSheet.create({
  pack: {
    backgroundColor: "#303030",
    width: 180,
    // marginHorizontal: 16,
    marginBottom: 10,
    padding: 20,
    borderRadius: 10,
    justifyContent: "center",
    // height: 100,
  },
});
