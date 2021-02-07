import React, { useLayoutEffect } from "react";
import { SafeAreaView, StyleSheet, Text, View, ScrollView } from "react-native";
import { Avatar } from "react-native-elements";
import CustomListItem from "../components/CustomListItem";
import { auth, db } from "../firebase";

const HomeScreen = ({ navigation }) => {
  useLayoutEffect(() => {
    navigation.setOptions({
      title: "Signal",
      headerStyle: { backgroundColor: "#ffffff" },
      headerTitleStyle: { color: "black" },
      headerTintColor: { color: "white" },
      headerLeft: () => (
        <View style={{ marginLeft: 20 }}>
          <Avatar
            rounded
            source={{
              uri:
                "https://avatars.dicebear.com/api/bottts/12484678180.svg?dataUri=true",
            }}
            avatarStyle={{ backgroundColor: "gray" }}
          />
        </View>
      ),
    });
  }, []);

  return (
    <SafeAreaView>
      <ScrollView>
        <CustomListItem />
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({});
