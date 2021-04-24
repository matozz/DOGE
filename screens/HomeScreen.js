import React, { useEffect, useLayoutEffect, useState } from "react";
import { TouchableOpacity } from "react-native";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  ScrollView,
  Alert,
  StatusBar,
} from "react-native";
import { Avatar } from "react-native-elements";
import { AntDesign } from "@expo/vector-icons";
import CustomListItem from "../components/CustomListItem";
import { auth, db } from "../firebase";

const HomeScreen = ({ navigation }) => {
  const [chats, setChats] = useState([]);

  useEffect(() => {
    const unsubscribe = db
      .collection("chats")
      .orderBy("timestamp", "desc")
      .onSnapshot((snapshot) =>
        setChats(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            data: doc.data(),
          }))
        )
      );

    return unsubscribe;
  }, []);

  useLayoutEffect(() => {
    navigation.setOptions({
      title: "叮咚",
      headerStyle: { backgroundColor: "#ffffff" },
      headerTitleStyle: { color: "black" },
      headerTintColor: { color: "white" },
      headerLeft: () => (
        <View style={{ marginLeft: 20 }}>
          <TouchableOpacity
            activeOpacity={0.5}
            onPress={() => navigation.navigate("Setting")}
          >
            <Avatar
              rounded
              source={{
                uri: auth?.currentUser?.photoURL,
              }}
            />
          </TouchableOpacity>
        </View>
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
          <TouchableOpacity activeOpacity={0.5}>
            <AntDesign name="camerao" size={24} color="black" />
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.5}
            onPress={() => navigation.navigate("AddChat")}
          >
            <AntDesign name="plus" size={24} color="black" />
          </TouchableOpacity>
        </View>
      ),
    });
  }, [navigation]);

  const enterChat = (id, chatName) => {
    navigation.navigate("Chats", {
      id: id,
      chatName: chatName,
    });
  };

  return (
    <SafeAreaView>
      <StatusBar
        animated={true}
        backgroundColor="#61dafb"
        barStyle="dark-content"
      />
      <ScrollView style={styles.container}>
        {chats.map(({ id, data: { chatName } }) => (
          <CustomListItem
            key={id}
            id={id}
            chatName={chatName}
            enterChat={enterChat}
          />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    height: "100%",
  },
});
