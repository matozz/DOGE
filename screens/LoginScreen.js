import React, { useEffect, useState } from "react";
import { KeyboardAvoidingView } from "react-native";
import { StyleSheet, Text, View, ActivityIndicator } from "react-native";
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
      <ActivityIndicator
        size="large"
        animating={loading}
        style={{
          position: "absolute",
          // backgroundColor: "lightgray",
          // width: 100,
          // height: 100,
          // borderRadius: 10,
        }}
      />
      <Image
        style={{ width: 160, height: 160 }}
        source={{
          uri:
            "https://blog.mozilla.org/internetcitizen/files/2018/08/signal-logo.png",
        }}
      />
      <View style={{ width: 300, alignItems: "center" }}>
        <Input
          placeholder="Email"
          type="email"
          autoFocus
          value={email}
          onChangeText={(text) => setEmail(text)}
          errorStyle={{ color: "red" }}
          errorMessage={
            email === "" && submitting ? "Please enter a valid email" : null
          }
        />
        <Input
          placeholder="Password"
          type="password"
          secureTextEntry
          value={password}
          onChangeText={(text) => setPassword(text)}
          errorStyle={{ color: "red" }}
          errorMessage={
            password === "" && submitting ? "Please enter password" : null
          }
        />
        <Button containerStyle={styles.button} title="Login" onPress={signIn} />
        <Button
          containerStyle={styles.button}
          title="Register"
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
    marginTop: 10,
  },
});
