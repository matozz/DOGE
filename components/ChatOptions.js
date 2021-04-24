import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Alert,
  Platform,
} from "react-native";
import { db } from "../firebase";

const ChatOptions = ({ roomId, setLoading }) => {
  const deleteRoom = () => {
    if (Platform.OS == "web") {
      const r = window.confirm("删除房间");
      if (r == true) {
        setLoading(true);
        db.collection("chats")
          .doc(roomId)
          .delete()
          .then(() => {});
      }
    }
    Alert.alert("删除房间", "本操作无法撤回", [
      {
        text: "确认",
        onPress: () => {
          setLoading(true);
          db.collection("chats")
            .doc(roomId)
            .delete()
            .then(() => {});
        },
        style: "destructive",
      },
      {
        text: "取消",
        style: "cancel",
      },
    ]);
  };

  return (
    <View>
      <TouchableOpacity onPress={deleteRoom} activeOpacity={0.5}>
        <View style={styles.card}>
          <View style={{ alignItems: "center" }}>
            <Text
              style={{ fontSize: 17, fontWeight: "bold", color: "darkred" }}
            >
              删除聊天室
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default ChatOptions;

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#eeeeee",
    margin: 16,
    padding: 20,
    borderRadius: 10,
    justifyContent: "center",
    // height: 100,
  },
});
