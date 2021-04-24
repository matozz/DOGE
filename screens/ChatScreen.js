import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import { TouchableOpacity } from "react-native";
import {
  StyleSheet,
  Text,
  View,
  Alert,
  ActivityIndicator,
  Platform,
  Keyboard,
  SafeAreaView,
  KeyboardAvoidingView,
} from "react-native";
import { Avatar } from "react-native-elements";
import { AntDesign, FontAwesome, Ionicons } from "@expo/vector-icons";
import { StatusBar } from "expo-status-bar";
import { ScrollView } from "react-native";
import { TextInput } from "react-native";
import { TouchableWithoutFeedback } from "react-native";
import { db, auth } from "../firebase";
import * as firebase from "firebase";
import { Audio } from "expo-av";
import * as ImagePicker from "expo-image-picker";
import { Modalize } from "react-native-modalize";
import ChatOptions from "../components/ChatOptions";

const ChatScreen = ({ navigation, route }) => {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [recording, setRecording] = useState();
  const [image, setImage] = useState(null);
  const scrollViewRef = useRef();
  const modalizeRef = useRef(null);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerStyle: { backgroundColor: "#2685e4" },
      headerTitleStyle: { color: "white" },
      headerTintColor: "white",
      headerBackTitleVisible: false,
      headerTitleAlign: "left",
      title: "Chat",
      headerTitle: () => (
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <Avatar
            rounded
            source={{
              uri:
                messages[0]?.data.photoURL ||
                "https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fb-ssl.duitang.com%2Fuploads%2Fitem%2F201705%2F07%2F20170507160618_ATMGm.jpeg&refer=http%3A%2F%2Fb-ssl.duitang.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1621773719&t=5aae9b2cc9521fbb0bafa0e47133da3f",
            }}
          />
          <Text
            style={{
              color: "white",
              marginLeft: 10,
              fontWeight: "700",
              width: 200,
            }}
            numberOfLines={1}
          >
            {messages[0]?.data.displayName
              ? route.params.chatName +
                " (" +
                messages[0]?.data.displayName +
                ")"
              : route.params.chatName}
          </Text>
        </View>
      ),
      headerLeft: () => (
        <TouchableOpacity
          style={{ marginLeft: 10 }}
          onPress={navigation.goBack}
        >
          <AntDesign name="arrowleft" size={24} color="white" />
        </TouchableOpacity>
      ),
      headerRight: () => (
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            width: 80,
            marginRight: 20,
          }}
        >
          <TouchableOpacity>
            <Ionicons name="call" size={24} color="white" />
          </TouchableOpacity>
          <TouchableOpacity onPress={openOptions}>
            <Ionicons name="settings" size={24} color="white" />
          </TouchableOpacity>
        </View>
      ),
    });
  }, [navigation, messages]);

  useLayoutEffect(() => {
    const unsubscribe = db.collection("chats").onSnapshot((snapshot) => {
      let rooms = [];
      rooms.push(...snapshot.docs.map((doc) => doc.id));
      if (rooms.filter((value) => route.params.id == value).length === 0) {
        setLoading(false);
        if (Platform.OS == "web") {
          window.alert("房间已被删除");
          navigation.goBack();
        }

        Alert.alert("房间已被删除", null, [
          {
            text: "确认",
            style: "cancel",
            onPress: () => {
              navigation.goBack();
            },
          },
        ]);
      }
    });

    return unsubscribe;
  }, [route]);

  useLayoutEffect(() => {
    const unsubscribe = db
      .collection("chats")
      .doc(route.params.id)
      .collection("messages")
      .orderBy("timestamp", "asc")
      .onSnapshot((snapshot) => {
        setTimeout(() => {
          scrollViewRef.current.scrollToEnd({ animated: true });
        }, 200);
        setMessages(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            data: doc.data(),
          }))
        );
      });

    return unsubscribe;
  }, [route]);

  useEffect(() => {
    setTimeout(() => {
      scrollViewRef.current.scrollToEnd({ animated: true });
    }, 200);
  }, []);

  useEffect(() => {
    scrollViewRef.current.scrollToEnd({ animated: true });
  }, [messages]);

  useEffect(() => {
    (async () => {
      if (Platform.OS !== "web") {
        const {
          status,
        } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== "granted") {
          alert("Sorry, we need camera roll permissions to make this work!");
        }
      }
    })();
  }, []);

  const openOptions = () => {
    Keyboard.dismiss();
    modalizeRef.current?.open();
  };

  const deleteRoom = () => {
    Alert.alert("删除房间", "本操作无法撤回", [
      {
        text: "确认",
        onPress: () => {
          setLoading(true);
          db.collection("chats")
            .doc(route.params.id)
            .delete()
            .then(() => navigation.goBack());
        },
        style: "destructive",
      },
      {
        text: "取消",
        style: "cancel",
      },
    ]);
  };

  const sendMessage = () => {
    if (input === "") return;

    Keyboard.dismiss();

    db.collection("chats").doc(route.params.id).collection("messages").add({
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      message: input,
      displayName: auth.currentUser.displayName,
      email: auth.currentUser.email,
      photoURL: auth.currentUser.photoURL,
      type: "text",
    });

    setInput("");
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: false,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.cancelled) {
      setImage(result.uri);
    }
  };

  async function startRecording() {
    try {
      console.log("Requesting permissions..");
      await Audio.requestPermissionsAsync();
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        playsInSilentModeIOS: true,
      });
      console.log("Starting recording..");
      const recording = new Audio.Recording();
      await recording.prepareToRecordAsync(
        Audio.RECORDING_OPTIONS_PRESET_HIGH_QUALITY
      );
      await recording.startAsync();
      setRecording(recording);
      console.log("Recording started");
    } catch (err) {
      console.error("Failed to start recording", err);
    }
  }

  async function stopRecording() {
    console.log("Stopping recording..");
    setRecording(undefined);
    await recording.stopAndUnloadAsync();
    const uri = recording.getURI();
    console.log("Recording stopped and stored at", uri);
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
      <StatusBar style="light" />
      <ActivityIndicator
        size="large"
        animating={loading}
        style={{
          position: "absolute",
          top: "40%",
          right: "50%",
          transform: [{ translateX: "50%" }],
          backgroundColor: "#EEEEEE",
          width: 100,
          height: 100,
          borderRadius: 10,
          opacity: loading ? 1 : 0,
        }}
      />
      <Modalize ref={modalizeRef} modalHeight={400}>
        <ChatOptions roomId={route.params.id} setLoading={setLoading} />
      </Modalize>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.container}
        keyboardVerticalOffset={90}
      >
        {/* <TouchableWithoutFeedback> */}
        <>
          <ScrollView
            ref={scrollViewRef}
            contentContainerStyle={{
              paddingTop: 15,
            }}
          >
            {messages.map(({ id, data }) =>
              data.email === auth.currentUser.email ? (
                <View key={id} style={styles.reciever}>
                  <Avatar
                    position="absolute"
                    rounded
                    // WEB
                    containerStyle={{
                      position: "absolute",
                      top: 8,
                      right: -40,
                    }}
                    top={8}
                    right={-40}
                    size={30}
                    source={{ uri: data.photoURL }}
                  />
                  <Text style={styles.recieverText}>{data.message}</Text>
                </View>
              ) : (
                <View key={id} style={styles.sender}>
                  <Avatar
                    position="absolute"
                    rounded
                    // WEB
                    containerStyle={{
                      position: "absolute",
                      top: 8,
                      left: -40,
                    }}
                    // bottom={8}
                    top={8}
                    left={-40}
                    size={30}
                    source={{ uri: data.photoURL }}
                  />
                  {data.type == "text" && (
                    <Text style={styles.senderText}>{data.message}</Text>
                  )}
                  {data.type == "audio" && (
                    <View style={styles.senderText}></View>
                  )}

                  <Text numberOfLines={1} style={styles.senderName}>
                    {data.displayName}
                  </Text>
                </View>
              )
            )}
          </ScrollView>
          <View style={styles.footer}>
            <TextInput
              placeholder="说点啥好呢?"
              style={styles.textInput}
              value={input}
              onChangeText={(text) => setInput(text)}
              onFocus={() =>
                setTimeout(
                  () => scrollViewRef.current.scrollToEnd({ animated: true }),
                  100
                )
              }
              onSubmitEditing={sendMessage}
            />
            <TouchableOpacity
              activeOpacity={0.5}
              style={{ marginRight: 12 }}
              onPress={pickImage}
            >
              <Ionicons name="image" size={24} color="#2685e4" />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={recording ? stopRecording : startRecording}
              activeOpacity={0.5}
              style={{ marginRight: 12 }}
            >
              <Ionicons
                name="mic"
                size={24}
                color={recording ? "red" : "#2685e4"}
              />
            </TouchableOpacity>
            <TouchableOpacity onPress={sendMessage} activeOpacity={0.5}>
              <Ionicons name="logo-twitter" size={24} color="#2685e4" />
            </TouchableOpacity>
          </View>
        </>
        {/* </TouchableWithoutFeedback> */}
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default ChatScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  reciever: {
    padding: 15,
    backgroundColor: "#ECECEC",
    alignSelf: "flex-end",
    borderRadius: 12,
    marginRight: 15,
    marginBottom: 24,
    maxWidth: "80%",
    // minWidth: 80,
    position: "relative",
    marginRight: 50,
  },
  sender: {
    padding: 15,
    backgroundColor: "#2685e4",
    alignSelf: "flex-start",
    borderRadius: 12,
    marginBottom: 16,
    margin: 15,
    maxWidth: "80%",
    // minWidth: 80,
    position: "relative",
    marginLeft: 50,
  },
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
  senderName: {
    position: "absolute",
    top: -16,
    left: 2,
    paddingRight: 10,
    fontSize: 12,
    color: "black",
  },
  footer: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    padding: 15,
  },
  textInput: {
    bottom: 0,
    height: 40,
    flex: 1,
    marginRight: 15,
    borderColor: "transparent",
    backgroundColor: "#ECECEC",
    borderWidth: 1,
    padding: 10,
    color: "grey",
    borderRadius: 30,
  },
});
