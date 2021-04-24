import React, { useEffect, useState } from "react";
import { KeyboardAvoidingView } from "react-native";
import {
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  StatusBar,
} from "react-native";
import { Button, Input, Image } from "react-native-elements";
import { auth } from "../firebase";

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const signIn = () => {
    setSubmitting(true);
    if (email !== "" && password !== "") {
      setLoading(true);

      auth
        .signInWithEmailAndPassword(email, password)
        .then((user) => {
          console.log(user);
          navigation.replace("Home");
          setLoading(false);
        })
        .then(() => setLoading(false))
        .catch((error) => {
          alert(error.message);
          setLoading(false);
        });
    }
  };

  return (
    <KeyboardAvoidingView behavior="padding" enabled style={styles.container}>
      <StatusBar
        animated={true}
        backgroundColor="#61dafb"
        barStyle="dark-content"
      />
      <ActivityIndicator
        size="large"
        animating={loading}
        style={{
          position: "absolute",
          backgroundColor: "#EEEEEE",
          width: 100,
          height: 100,
          borderRadius: 10,
          opacity: loading ? 1 : 0,
        }}
      />

      <View style={{ alignItems: "center" }}>
        <Image
          style={{ width: 100, height: 100 }}
          source={{
            uri:
              "https://media.macosicons.com/parse/files/macOSicons/549a2b756295c6c43bdac924e2c9eb33_Dingding.png",
          }}
        />
        <Text
          style={{
            fontSize: 32,
            marginTop: 20,
            marginBottom: 40,
          }}
        >
          叮咚
        </Text>
      </View>
      <View style={{ width: 300, alignItems: "center" }}>
        <Input
          placeholder="邮箱"
          type="email"
          // autoFocus
          value={email}
          autoCapitalize="none"
          spellCheck={false}
          onChangeText={(text) => setEmail(text)}
          errorStyle={{ color: "red" }}
          errorMessage={email === "" && submitting ? "请输入邮箱" : null}
        />
        <Input
          placeholder="密码"
          type="password"
          secureTextEntry
          value={password}
          onChangeText={(text) => setPassword(text)}
          errorStyle={{ color: "red" }}
          errorMessage={password === "" && submitting ? "请输入密码" : null}
        />
        <Button
          containerStyle={styles.button}
          buttonStyle={{
            height: 40,
            fontWeight: "bold",
            backgroundColor: "#2685e4",
          }}
          title="登入"
          onPress={signIn}
        />
        <Button
          containerStyle={styles.button}
          buttonStyle={{
            height: 40,
            fontWeight: "bold",
            borderWidth: 1,
            borderColor: "#2685e4",
          }}
          title="注册"
          type="outline"
          onPress={() => navigation.navigate("Register")}
        />
        <View style={{ height: 100 }} />
      </View>
    </KeyboardAvoidingView>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
  },
  input: {
    width: 300,
  },
  button: {
    width: 200,
    marginTop: 20,
  },
});
