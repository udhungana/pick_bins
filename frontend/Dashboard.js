import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Card } from "react-native-paper";

import AsyncStorage from "@react-native-community/async-storage";
import axios from "axios";

/**
 *
 * @param {string} date - used to keep date of pickup
 * @param {string} time - used to keep estimated time of pickup
 * @param {string} location - used to keep location of pickup of user
 */
const Dashboard = ({ navigation }) => {
  const [date, setDate] = useState();

  const [time, setTime] = useState();

  const [location, setLocation] = useState();

  const [userName, setUserName] = useState();

  /**
   * Here the use effects gets duration store from database. Here duration from drivers location to users is calculated and shown to user.
   */
  useEffect(() => {
    var today = new Date(),
      date =
        today.getFullYear() +
        "-" +
        (today.getMonth() + 1) +
        "-" +
        today.getDate();
    setDate(date);

    AsyncStorage.getItem("token").then((response) => {
      console.log("###############");
      console.log("token from async");
      console.log(response);
      console.log("###############");

      axios
        //.get("http://192.168.1.176:4000/getSchedule", {   himal ko
        .get("http://192.168.1.228:4000/getSchedule", {
          headers: { Authorization: `Bearer ${response}` },
        })
        .then((response) => {
          console.log("###############");
          console.log(response.data);
          console.log("###############");
          var time = 0;

          if (today.getMinutes() + response.data.duration >= 60) {
            var hr = Math.floor(
              (today.getMinutes() + response.data.duration) / 60
            );
            var minutes = (today.getMinutes() + response.data.duration) % 60;
            var ampm = hr >= 12 ? "pm" : "am";

            time =
              today.getHours() +
              hr +
              ":" +
              minutes +
              ":" +
              today.getSeconds() +
              " " +
              ampm;
          } else {
            var ampm = today.getHours() >= 12 ? "pm" : "am";

            time =
              today.getHours() +
              ":" +
              (today.getMinutes() + response.data.duration) +
              ":" +
              today.getSeconds() +
              " " +
              ampm;
          }

          if (response.data.duration === 0) {
            setTime("Completed");
          } else {
            setTime(time);
          }

          setLocation(response.data.location);
          setUserName(response.data.firstName);
        })
        .catch((error) => {
          console.log(error);
        });
    });
  }, []);

  return (
    <View style={styles.container}>
      <Text
        style={{ fontSize: 30, fontWeight: "bold", margin: 5, color: "green" }}
      >
        Hello,
      </Text>
      <Text
        style={{ fontSize: 30, fontWeight: "bold", margin: 5, color: "green" }}
      >
        {userName}!
      </Text>
      <Text style={{ fontSize: 18, margin: 5, color: "green" }}>
        Your next pickup is scheduled for:
      </Text>
      <Card style={styles.cardDesign}>
        <View
          style={{
            alignItems: "center",
            justifyContent: "flex-start",
            flexDirection: "row",
            height: 50,
            marginTop: 10,
          }}
        >
          <Text style={styles.textDesign}>Date: </Text>
          <Text style={styles.rightMargin}>{date}</Text>
        </View>
        <View
          style={{
            alignItems: "center",
            justifyContent: "flex-start",
            flexDirection: "row",
            height: 50,
          }}
        >
          <Text style={styles.textDesign}>ETA:</Text>
          <Text style={styles.rightMargin}>{time}</Text>
        </View>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <View
            style={{
              alignItems: "center",
              justifyContent: "flex-start",
              flexDirection: "row",
              flex: 1,
              height: 50,
            }}
          >
            <Text style={styles.textDesign}>Location:</Text>
            <Text style={{ marginLeft: 10, textAlign: "left", flex: 1 }}>
              {" "}
              {location}
            </Text>
          </View>
          <View style={{ flexDirection: "row", textAlign: "center" }}></View>
        </View>
      </Card>
    </View>
  );
};
export default Dashboard;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  cardDesign: {
    flex: 0.4,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    padding: 10,
    margin: 15,
    flexWrap: "wrap",
  },
  textDesign: {
    textAlign: "left",
    fontSize: 18,
    fontWeight: "bold",
  },
  rightMargin: {
    marginLeft: 50,
    textAlign: "left",
  },
  box: {
    height: 50,
  },
  pickUpButton: {
    textAlign: "center",
    backgroundColor: "#00A600",
    justifyContent: "center",
    height: 55,
    width: 200,
    borderRadius: 15,
    marginTop: 50,
  },
});
Dashboard;
