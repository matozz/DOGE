import React, { useEffect, useRef } from "react";
import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import { AntDesign, FontAwesome, Ionicons } from "@expo/vector-icons";
import { Audio } from "expo-av";

const NOTES = ["do", "re", "mi", "fa", "so", "la", "ti", "do"];
const SCALES = ["Amaj", "Bmaj"];

const Message = ({ roll, data, actionTipRef }) => {
  const playAudio = async (uri) => {
    const soundObject = new Audio.Sound();
    try {
      await soundObject.loadAsync({ uri });
      await soundObject.playAsync();
    } catch (error) {
      console.log("error:", error);
    }
  };

  const showToolTip = () => {
    actionTipRef.current.show("A大调 (A、C#、E) ");
  };

  return (
    <>
      {roll == "reciever" ? (
        <>
          {data.type == "text" && (
            <View style={{ flexDirection: "column" }}>
              {NOTES.filter((notes) => notes == data.message).length != 0 ||
              SCALES.filter((scale) => scale == data.message).length != 0 ? (
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <TouchableOpacity onPress={showToolTip}>
                    <Ionicons name="musical-note" size={20} color="#2685e4" />
                  </TouchableOpacity>
                  <Text style={styles.recieverText} selectable={true}>
                    {data.message}
                  </Text>
                </View>
              ) : (
                <Text style={styles.recieverText} selectable={true}>
                  {data.message}
                </Text>
              )}
            </View>
          )}
          {data.type == "picture" &&
            (data.picture ? (
              <Image
                resizeMethod="scale"
                style={{
                  width: 160,
                  height: 160,
                }}
                source={{
                  uri: data.picture,
                }}
              />
            ) : (
              <Ionicons name="image-outline" size={60} color="#2685e4" />
            ))}
          {data.type == "audio" && (
            <View style={styles.recieverAudio}>
              <TouchableOpacity onPress={() => playAudio(data.audio)}>
                <Ionicons name="mic" size={20} color="#2685e4" />
              </TouchableOpacity>
              {data.audio !== "" && (
                <Text style={{ color: "#2685e4" }}>
                  {Math.floor(data?.duration / 1000) + "s"}
                </Text>
              )}
            </View>
          )}
        </>
      ) : (
        <>
          {data.type == "text" && (
            <View style={{ flexDirection: "column" }}>
              {NOTES.filter((notes) => notes == data.message).length != 0 ||
              SCALES.filter((scale) => scale == data.message).length != 0 ? (
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <TouchableOpacity onPress={showToolTip}>
                    <Ionicons name="musical-note" size={20} color="white" />
                  </TouchableOpacity>
                  <Text style={styles.senderText} selectable={true}>
                    {data.message}
                  </Text>
                </View>
              ) : (
                <Text style={styles.senderText} selectable={true}>
                  {data.message}
                </Text>
              )}
            </View>
          )}
          {data.type == "picture" &&
            (data.picture ? (
              <Image
                resizeMethod="scale"
                style={{
                  width: 160,
                  height: 160,
                }}
                source={{
                  uri: data.picture,
                }}
              />
            ) : (
              <Ionicons name="image-outline" size={60} color="white" />
            ))}
          {data.type == "audio" && (
            <View style={styles.senderAudio}>
              <TouchableOpacity onPress={() => playAudio(data.audio)}>
                <Ionicons name="mic" size={20} color="white" />
              </TouchableOpacity>
              {data.audio !== "" && (
                <Text style={{ color: "white" }}>
                  {Math.floor(data?.duration / 1000) + "s"}
                </Text>
              )}
            </View>
          )}
        </>
      )}
    </>
  );
};

export default Message;

const styles = StyleSheet.create({
  recieverText: {
    color: "black",
    fontWeight: "500",
    lineHeight: 20,
    // marginRight: 10,
  },
  senderText: {
    color: "white",
    fontWeight: "500",
    lineHeight: 20,
    // marginLeft: 10,
    // marginBottom: 10,
  },
  recieverAudio: {
    flexDirection: "row",
    alignItems: "center",
  },
  senderAudio: {
    flexDirection: "row",
    alignItems: "center",
  },
});
