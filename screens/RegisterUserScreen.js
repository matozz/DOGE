import React, { useLayoutEffect, useState, useEffect } from "react";
import { ScrollView } from "react-native";
import { KeyboardAvoidingView, StatusBar } from "react-native";
import { StyleSheet, View } from "react-native";
import { Input, Button, Text } from "react-native-elements";
import { auth } from "../firebase";

const RegisterUserScreen = ({ navigation }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [photoURL, setPhotoURL] = useState("");

  useLayoutEffect(() => {
    navigation.setOptions({
      headerBackTitle: "返回",
    });
  }, [navigation]);

  const register = () => {
    auth
      .createUserWithEmailAndPassword(email, password)
      .then((authUser) => {
        authUser.user.updateProfile({
          displayName: name,
          photoURL: photoURL,
        });
        navigation.replace("Home");
      })
      .catch((err) => alert(err.message));
  };

  return (
    <KeyboardAvoidingView behavior="padding" style={styles.container}>
      <StatusBar
        animated={true}
        backgroundColor="#61dafb"
        barStyle="light-content"
      />
      <Text h3 style={{ marginBottom: 50 }}>
        创建一个叮咚账号
      </Text>
      <View style={styles.inputContainer}>
        <Input
          placeholder="你的名字"
          autofocus
          type="text"
          autoCapitalize="none"
          value={name}
          onChangeText={(text) => setName(text)}
        />
        <Input
          placeholder="邮箱"
          type="email"
          value={email}
          keyboardType="email-address"
          onChangeText={(text) => setEmail(text)}
          autoCapitalize="none"
        />
        <Input
          placeholder="密码"
          type="password"
          secureTextEntry
          value={password}
          onChangeText={(text) => setPassword(text)}
        />
        <Input
          placeholder="头像 (URL)"
          value={photoURL}
          onChangeText={(text) => setPhotoURL(text)}
          spellCheck={false}
          textContentType="URL"
          keyboardType="url"
        />
      </View>
      <Button
        raised
        onPress={register}
        buttonStyle={{
          height: 40,
          fontWeight: "bold",
          backgroundColor: "#2685e4",
        }}
        title="我好了"
        style={styles.button}
      />
      <View style={{ height: 100 }} />
    </KeyboardAvoidingView>
  );
};

export default RegisterUserScreen;

const styles = StyleSheet.create({
  container: {
    marginTop: 55,
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
  },
  inputContainer: {
    width: 300,
    marginBottom: 20,
  },
  button: {
    width: 200,
  },
});
