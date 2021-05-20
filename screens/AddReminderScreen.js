import React, { useLayoutEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  StatusBar,
} from "react-native";
import { Button, Input } from "react-native-elements";
import Icon from "react-native-vector-icons/FontAwesome";
import { db } from "../firebase";
import firebase from "firebase";
import DateTimePicker from "@react-native-community/datetimepicker";
import { AutoGrowingTextInput } from "react-native-autogrow-textinput";
import AsyncStorage from "@react-native-async-storage/async-storage";

const AddReminderScreen = ({ navigation }) => {
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState("date");
  const [show, setShow] = useState(true);
  const [text, setText] = useState("");
  const [desc, setDesc] = useState("");

  useLayoutEffect(() => {
    navigation.setOptions({
      title: "创建新日程",
      headerBackTitle: "返回",
    });
  }, [navigation]);

  const formatDate = (date) => {
    var d = new Date(date),
      month = "" + (d.getMonth() + 1),
      day = "" + d.getDate(),
      year = d.getFullYear();

    if (month.length < 2) month = "0" + month;
    if (day.length < 2) day = "0" + day;

    return [year, month, day].join("-");
  };

  const createAgenda = () => {
    const DATE = formatDate(Date.now());
    const newAgendaObject = {
      [DATE]: [
        {
          id: DATE,
          name: text,
          desc: desc,
          // height: this.state.value,
        },
      ],
    };
    save(newAgendaObject).then(console.log(newAgendaObject));
  };

  const save = async (value) => {
    try {
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem("@storage_Key", jsonValue);
      navigation.goBack();
    } catch (error) {
      console.log("Error saving data" + error);
    }
  };

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === "ios");
    setDate(currentDate);
  };

  return (
    <View style={styles.container}>
      <StatusBar
        animated={true}
        backgroundColor="#61dafb"
        barStyle="light-content"
      />
      <ActivityIndicator
        size="large"
        animating={loading}
        style={{
          position: "absolute",
          backgroundColor: "lightgrey",
          width: 100,
          height: 100,
          borderRadius: 10,
          opacity: loading ? 1 : 0,
        }}
      />
      <View style={styles.content}>
        <Input
          placeholder="标题"
          value={text}
          autoFocus
          onChangeText={(text) => setText(text)}
          // onSubmitEditing={createAgenda}
          // leftIcon={
          //   <Icon name="wechat" type="antdesign" size={24} color="black" />
          // }
          errorMessage={input === "" && submitting ? "请输入房间名" : null}
        />
        <AutoGrowingTextInput
          onChangeText={(text) => setDesc(text)}
          value={desc}
          style={[
            {
              minHeight: 150,
              marginTop: 10,
              marginBottom: 20,
              width: "100%",
              textAlign: "left",
              fontSize: 17,
              borderWidth: 1,
              borderRadius: 10,
              paddingTop: 10,
              paddingBottom: 10,
              padding: 10,
              borderColor: "#909090",
            },
          ]}
          placeholder={"详情"}
        />
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Text style={{ fontSize: 17 }}>日期: </Text>
          <DateTimePicker
            testID="dateTimePicker"
            value={date}
            mode={mode}
            is24Hour={true}
            display="default"
            onChange={onChange}
            style={{ flex: 1, marginLeft: 10 }}
          />
        </View>

        <Button
          onPress={createAgenda}
          buttonStyle={{
            height: 40,
            marginVertical: 20,
            fontWeight: "bold",
            backgroundColor: "#2685e4",
          }}
          title="新建"
          disabled={!text || !desc || !date}
        />
      </View>
    </View>
  );
};

export default AddReminderScreen;

const styles = StyleSheet.create({
  container: {
    marginTop: 55,
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  content: {
    height: "100%",
    width: "100%",
    padding: 24,
  },
  textInput: {
    fontSize: 30,
  },
});
