import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
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
  TouchableOpacity,
} from "react-native";
import Clipboard from "expo-clipboard";
import { Avatar } from "react-native-elements";
import { AntDesign, FontAwesome, Ionicons } from "@expo/vector-icons";
import { StatusBar } from "expo-status-bar";
import { ScrollView } from "react-native";
import { TextInput } from "react-native";
import { db, auth, storage } from "../firebase";
import firebase from "firebase";
import { Audio } from "expo-av";
import * as ImagePicker from "expo-image-picker";
import { Modalize } from "react-native-modalize";
import ChatOptions from "../components/ChatOptions";
import uuid from "react-native-uuid";
import { Image } from "react-native";
import Message from "../components/Message";
import ActionTip from "react-native-action-tips";

const ChatScreen = ({ navigation, route }) => {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [recording, setRecording] = useState();
  const [image, setImage] = useState(null);
  const scrollViewRef = useRef();
  const modalizeRef = useRef(null);
  const actionTipRef = useRef(null);

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
          <TouchableOpacity onPress={() => navigation.navigate("Music")}>
            <Ionicons name="musical-notes" size={24} color="white" />
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
        const { status } =
          await ImagePicker.requestMediaLibraryPermissionsAsync();
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
      quality: 0.2,
    });

    console.log(result);

    if (!result.cancelled) {
      setImage(result);
      await db
        .collection("chats")
        .doc(route.params.id)
        .collection("messages")
        .add({
          timestamp: firebase.firestore.FieldValue.serverTimestamp(),
          picture: "",
          duration: 0,
          displayName: auth.currentUser.displayName,
          email: auth.currentUser.email,
          photoURL: auth.currentUser.photoURL,
          type: "picture",
        })
        .then(function (docRef) {
          console.log("Document written with ID: ", docRef.id);
          uploadStorage("picture", result, docRef.id);
        });
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
    let duration;
    recording
      .getStatusAsync()
      .then((status) => (duration = status.durationMillis));
    console.log("Stopping recording..");
    setRecording(undefined);
    await recording.stopAndUnloadAsync();
    const uri = recording.getURI();

    console.log("Recording stopped and stored at", uri);

    db.collection("chats")
      .doc(route.params.id)
      .collection("messages")
      .add({
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        audio: "",
        duration: 0,
        displayName: auth.currentUser.displayName,
        email: auth.currentUser.email,
        photoURL: auth.currentUser.photoURL,
        type: "audio",
      })
      .then(function (docRef) {
        console.log("Document written with ID: ", docRef.id);
        uploadStorage("audio", recording, docRef.id, duration);
      });
  }

  const uploadStorage = async (type, content, id, duration) => {
    let uri;
    if (type === "audio") uri = content.getURI();
    if (type === "picture") uri = content.uri;
    console.log(uri);
    const encrypt = uuid.v4();
    try {
      const blob = await new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.onload = () => {
          try {
            resolve(xhr.response);
          } catch (error) {
            console.log("error:", error);
          }
        };
        xhr.onerror = (e) => {
          console.log(e);
          reject(new TypeError("Network request failed"));
        };
        xhr.responseType = "blob";
        xhr.open("GET", uri, true);
        xhr.send(null);
      });
      if (blob != null) {
        const uriParts = uri.split(".");
        const fileType = uriParts[uriParts.length - 1];
        if (type == "audio") {
          firebase
            .storage()
            .ref()
            .child(`audio/${route.params.id}/${encrypt}.${fileType}`)
            .put(blob, {
              contentType: `audio/${fileType}`,
            })
            .then(() => {
              console.log("Upload Success!");
              sendAudio(
                `audio/${route.params.id}/${encrypt}.${fileType}`,
                duration,
                id
              );
            })
            .catch((e) => console.log("error:", e));
        } else if (type == "picture") {
          firebase
            .storage()
            .ref()
            .child(`picture/${route.params.id}/${encrypt}.${fileType}`)
            .put(blob, {
              contentType: `picture/${fileType}`,
            })
            .then(() => {
              console.log("Upload Success!");
              sendPicture(
                `picture/${route.params.id}/${encrypt}.${fileType}`,
                id
              );
            })
            .catch((e) => console.log("error:", e));
        }
      } else {
        console.log("erroor with blob");
      }
    } catch (error) {
      console.log("error:", error);
    }
  };

  const sendAudio = async (path, duration, id) => {
    const uri = await firebase.storage().ref(path).getDownloadURL();

    db.collection("chats")
      .doc(route.params.id)
      .collection("messages")
      .doc(id)
      .update({
        audio: uri,
        duration: duration,
      });

    console.log("uri:", uri);
  };

  const sendPicture = async (path, id) => {
    const uri = await firebase.storage().ref(path).getDownloadURL();

    db.collection("chats")
      .doc(route.params.id)
      .collection("messages")
      .doc(id)
      .update({
        picture: uri,
        width: image.width,
        height: image.height,
      });

    console.log("uri:", uri);
  };

  return (
    <>
      <Modalize ref={modalizeRef} modalHeight={300}>
        <ChatOptions roomId={route.params.id} setLoading={setLoading} />
      </Modalize>
      <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
        <StatusBar style="light" />
        <ActionTip ref={actionTipRef} position={{ top: 20 }} />
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
                    <ActivityIndicator
                      style={{ position: "absolute", top: 16, left: -30 }}
                      animating={data.audio !== "" ? false : true}
                    />
                    <ActivityIndicator
                      style={{ position: "absolute", top: 36, left: -30 }}
                      animating={data.picture !== "" ? false : true}
                    />
                    <Avatar
                      position="absolute"
                      rounded
                      // WEB
                      containerStyle={{
                        position: "absolute",
                        top: 9,
                        right: -40,
                      }}
                      top={9}
                      right={-40}
                      size={30}
                      source={{ uri: data.photoURL }}
                    />
                    <Message
                      roll="reciever"
                      data={data}
                      actionTipRef={actionTipRef}
                    />
                  </View>
                ) : (
                  <View key={id} style={styles.sender}>
                    <ActivityIndicator
                      style={{ position: "absolute", top: 16, right: -30 }}
                      animating={data.audio !== "" ? false : true}
                    />
                    <ActivityIndicator
                      style={{ position: "absolute", top: 36, right: -30 }}
                      animating={data.picture !== "" ? false : true}
                    />
                    <Avatar
                      position="absolute"
                      rounded
                      // WEB
                      containerStyle={{
                        position: "absolute",
                        top: 9,
                        left: -40,
                      }}
                      // bottom={8}
                      top={9}
                      left={-40}
                      size={30}
                      source={{ uri: data.photoURL }}
                    />
                    <Message
                      roll="sender"
                      data={data}
                      actionTipRef={actionTipRef}
                    />
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
    </>
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
  tooptip: {
    padding: 12,
    borderBottomWidth: 0.2,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    borderBottomColor: "#adadad",
  },
  tooptip2: {
    padding: 12,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  tooptip3: {
    // padding: 12,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
});
