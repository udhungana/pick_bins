import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, ScrollView, SafeAreaView } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Card } from "react-native-paper";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import AsyncStorage from "@react-native-community/async-storage";
import axios from "axios";

function Logout({ navigation }) {
  const [logginOut, setLogginout] = useState(false);
  useEffect(() => {
    navigation.addListener("tabPress", (e) => {
      // Prevent default behavior
      e.preventDefault();
      AsyncStorage.getItem("token").then((response) => {
        console.log("###############");
        console.log("token from async");
        console.log(response);
        console.log("###############");
        axios
          .post(
            "http://192.168.1.228:4000/user/logout",
            {},
            {
              headers: { Authorization: `Bearer ${response}` },
            }
          )
          .then((response) => {
            console.log(response);
            if (response.status === 200) {
              setLogginout(true);
            }
          })
          .catch((error) => {
            console.log(error);
          });
      });
    });
    if (logginOut) {
      navigation.navigate("SignInScreen");
    }
  }, [navigation, logginOut]);

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <TouchableOpacity style={{ alignItems: "center" }}>
        <Text>Are You sure You want to Logout?</Text>

        <Text style={{ marginTop: 10 }}>Click Logout Again to Confirm!!</Text>
      </TouchableOpacity>
    </View>
  );
}
export default Logout;
