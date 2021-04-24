import React, { useLayoutEffect } from "react";
import { ScrollView } from "react-native";
import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  TouchableOpacity,
  Alert,
} from "react-native";
import { Avatar } from "react-native-elements";
import { db, auth } from "../firebase";

const MyScreen = ({ navigation }) => {
  useLayoutEffect(() => {
    navigation.setOptions({
      title: "设置",
      // headerBackTitle: "返回",
      headerLeft: () => null,
      headerRight: () => (
        <TouchableOpacity
          style={{ marginRight: 20 }}
          onPress={() => navigation.goBack()}
        >
          <Text style={{ fontSize: 17, fontWeight: "bold" }}>完成</Text>
        </TouchableOpacity>
      ),
    });
  }, [navigation]);

  const signOutUser = () => {
    Alert.alert("退出登入", null, [
      {
        text: "退出",
        onPress: () => {
          auth.signOut().then(() => {
            navigation.replace("Auth");
          });
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
    <ScrollView style={styles.container}>
      <StatusBar
        animated={true}
        backgroundColor="#61dafb"
        barStyle="light-content"
      />
      <TouchableOpacity
        activeOpacity={0.5}
        onPress={() => navigation.navigate("Info")}
      >
        <View style={styles.card}>
          <View style={styles.header}>
            <View style={styles.info}>
              <Text style={{ fontSize: 28, fontWeight: "500" }}>
                {auth?.currentUser?.displayName}
              </Text>
              <Text style={styles.status}>猜猜我是谁</Text>
            </View>
            <Avatar
              avatarStyle={{ borderRadius: 10 }}
              width={60}
              height={60}
              source={{
                uri:
                  auth?.currentUser?.photoURL ||
                  "https://img.favpng.com/19/19/7/logo-apple-icon-information-png-favpng-LgLa8kMeALfAyE0iKbRnAJtnE.jpg",
              }}
            />
          </View>
        </View>
      </TouchableOpacity>
      <TouchableOpacity onPress={signOutUser} activeOpacity={0.5}>
        <View style={styles.card}>
          <View style={{ alignItems: "center" }}>
            <Text
              style={{ fontSize: 17, fontWeight: "bold", color: "darkred" }}
            >
              退出登入
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default MyScreen;

const styles = StyleSheet.create({
  container: {
    marginTop: 55,
  },
  card: {
    backgroundColor: "white",
    margin: 16,
    padding: 20,
    borderRadius: 10,
    justifyContent: "center",
    // height: 100,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  info: {
    justifyContent: "space-between",
  },
  status: {
    marginTop: 10,
    backgroundColor: "#eeeeee",
    padding: 6,
    marginRight: "auto",
    color: "#808080",
  },
});
