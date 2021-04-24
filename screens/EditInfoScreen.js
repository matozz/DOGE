import React, { useLayoutEffect } from "react";
import { StyleSheet, Text, View } from "react-native";

const EditInfoScreen = ({ navigation }) => {
  useLayoutEffect(() => {
    navigation.setOptions({
      title: "个人信息",
    });
  }, [navigation]);
  return (
    <View style={styles.container}>
      <Text>123</Text>
    </View>
  );
};

export default EditInfoScreen;

const styles = StyleSheet.create({
  container: { marginTop: 55 },
});
