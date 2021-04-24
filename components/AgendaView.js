import { locale } from "moment";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import CalendarStrip from "react-native-calendar-strip";
import moment from "moment";

const AgendaView = () => {
  const onWeekChanged = (start, end) => {
    console.log(start, end);
  };

  return (
    <View style={styles.container}>
      <CalendarStrip
        scrollable
        scrollerPaging
        onWeekScrollEnd={onWeekChanged}
        locale={{ name: "zh-cn", config: locale("zh-cn") }}
        selectedDate={moment()}
        calendarAnimation={{ type: "sequence", duration: 30 }}
        daySelectionAnimation={{
          type: "background",
          duration: 200,
          highlightColor: "#2685e4",
        }}
        style={{ height: 120, paddingTop: 15 }}
        calendarColor={"white"}
        highlightDateNumberStyle={{ color: "white" }}
        highlightDateNameStyle={{ color: "white" }}
        calendarHeaderStyle={{ color: "black" }}
        dateNumberStyle={{ color: "black" }}
        dateNameStyle={{ color: "black" }}
        iconContainer={{ flex: 0.1 }}
      />
    </View>
  );
};

export default AgendaView;

const styles = StyleSheet.create({
  container: { flex: 1 },
});
