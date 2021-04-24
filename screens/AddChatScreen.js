import React, { useLayoutEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  StatusBar,
} from "react-native";
import { Button, Input } from "react-native-elements";
import Icon from "react-native-vector-icons/FontAwesome";
import { db } from "../firebase";
import firebase from "firebase";

const AddChatScreen = ({ navigation }) => {
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  useLayoutEffect(() => {
    navigation.setOptions({
      title: "创建新的聊天室",
      headerBackTitle: "返回",
    });
  }, [navigation]);

  const createChat = async () => {
    setSubmitting(true);
    if (input !== "") {
      setLoading(true);
      await db
        .collection("chats")
        .add({
          chatName: input,
          timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        })
        .then(() => {
          navigation.goBack();
          setLoading(false);
        })
        .catch((err) => {
          alert(err);
          setLoading(false);
        });
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar
        animated={true}
        backgroundColor="#61dafb"
        barStyle="light-content"
      />
      <ActivityIndicator
        size="large"
        animating={loading}
        style={{
          position: "absolute",
          backgroundColor: "lightgrey",
          width: 100,
          height: 100,
          borderRadius: 10,
          opacity: loading ? 1 : 0,
        }}
      />
      <View style={styles.content}>
        <Input
          placeholder="请输入房间名"
          value={input}
          autoFocus
          onChangeText={(text) => setInput(text)}
          onSubmitEditing={createChat}
          // leftIcon={
          //   <Icon name="wechat" type="antdesign" size={24} color="black" />
          // }
          errorMessage={input === "" && submitting ? "请输入房间名" : null}
        />
        <Button
          onPress={createChat}
          buttonStyle={{
            height: 40,
            fontWeight: "bold",
            backgroundColor: "#2685e4",
          }}
          title="创建"
          disabled={!input}
        />
      </View>
    </View>
  );
};

export default AddChatScreen;

const styles = StyleSheet.create({
  container: {
    marginTop: 55,
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  content: {
    height: "100%",
    width: "100%",
    padding: 24,
  },
});
