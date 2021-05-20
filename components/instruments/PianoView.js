import React, { useState } from "react";
import { TouchableOpacity } from "react-native";
import { StyleSheet, Text, View } from "react-native";
import { Piano } from "react-native-piano";

const PianoView = () => {
  const [pianoNote, setPianoNote] = useState("---");
  const [pianoOctive, setPianoOctive] = useState(4);
  const [pianoOpen, setPianoOpen] = useState(false);

  const togglePianoOpen = () => {
    if (pianoOpen) setPianoOpen(false);
    else setPianoOpen(true);
  };

  const onNotePlay = (e) => {
    // console.log(e);
    if (!pianoOpen) return;
    setPianoNote(e);
  };
  const onNoteStop = (e) => {
    // console.log(e);
    setPianoNote("---");
  };

  const playAudio = () => {};

  return (
    <View style={styles.piano}>
      <View>
        <View style={{ height: 80, backgroundColor: "#303030" }}>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Text
              style={{
                color: "white",
                fontSize: 30,
                fontWeight: "bold",
                margin: 4,
              }}
            >
              KORG
            </Text>
            <View
              style={{
                marginRight: 10,
                backgroundColor: "purple",
                padding: 4,
                borderRadius: 4,
              }}
            >
              <Text style={styles.pianoBtn}>{pianoNote}</Text>
            </View>
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <TouchableOpacity onPress={togglePianoOpen}>
              <View
                style={{
                  backgroundColor: pianoOpen ? "green" : "darkred",
                  marginRight: "auto",
                  marginTop: 2,
                  paddingVertical: 2,
                  paddingHorizontal: 4,
                  borderRadius: 4,
                }}
              >
                <Text style={styles.pianoBtn}>{pianoOpen ? "ON" : "OFF"}</Text>
              </View>
            </TouchableOpacity>
            <View style={{ flexDirection: "row" }}>
              <TouchableOpacity
                onPress={() => setPianoOctive(pianoOctive - 1)}
                disabled={pianoOctive == 1}
              >
                <View style={{ marginRight: 10 }}>
                  <Text
                    style={
                      pianoOctive == 1
                        ? { color: "gray", fontWeight: "bold" }
                        : { color: "white", fontWeight: "bold" }
                    }
                  >
                    Octive-
                  </Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => setPianoOctive(pianoOctive + 1)}
                disabled={pianoOctive == 8}
              >
                <View>
                  <Text
                    style={
                      pianoOctive == 8
                        ? { color: "gray", fontWeight: "bold" }
                        : { color: "white", fontWeight: "bold" }
                    }
                  >
                    Octive+
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </View>
        {pianoOctive && (
          <Piano
            noteRange={{
              first: `c${pianoOctive}`,
              last: `e${pianoOctive + 1}`,
            }}
            onPlayNoteInput={onNotePlay}
            onStopNoteInput={onNoteStop}
            dumps={pianoOctive}
          />
        )}
      </View>
    </View>
  );
};

export default PianoView;

const styles = StyleSheet.create({
  piano: {
    // alignItems: "center",
    padding: 10,
    margin: 20,
    backgroundColor: "#303030",
    height: 240,
    borderRadius: 10,
  },
  pianoBtn: {
    color: "white",
    fontWeight: "bold",
  },
});
