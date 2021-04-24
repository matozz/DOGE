import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { ListItem, Avatar } from "react-native-elements";
import { db } from "../firebase";

const CustomListItem = ({ id, chatName, enterChat }) => {
  const [chatMessages, setChatMessages] = useState([]);

  useEffect(() => {
    const unsubscribe = db
      .collection("chats")
      .doc(id)
      .collection("messages")
      .orderBy("timestamp", "desc")
      .onSnapshot((snapshot) =>
        setChatMessages(snapshot.docs.map((doc) => doc.data()))
      );

    return unsubscribe;
  }, []);
  return (
    <ListItem onPress={() => enterChat(id, chatName)} key={id} bottomDivider>
      <Avatar
        rounded
        source={{
          uri:
            chatMessages?.[0]?.photoURL ||
            "https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fb-ssl.duitang.com%2Fuploads%2Fitem%2F201705%2F07%2F20170507160618_ATMGm.jpeg&refer=http%3A%2F%2Fb-ssl.duitang.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1621773719&t=5aae9b2cc9521fbb0bafa0e47133da3f",
        }}
      />
      <ListItem.Content>
        <ListItem.Title style={{ fontWeight: "800" }}>
          {chatName}
        </ListItem.Title>
        {chatMessages[0] ? (
          <ListItem.Subtitle numberOfLines={1} ellipsizeMode="tail">
            {chatMessages?.[0]?.displayName}: {chatMessages?.[0]?.message}
          </ListItem.Subtitle>
        ) : (
          <ListItem.Subtitle
            numberOfLines={1}
            ellipsizeMode="tail"
          ></ListItem.Subtitle>
        )}
      </ListItem.Content>
    </ListItem>
  );
};

export default CustomListItem;

const styles = StyleSheet.create({});
