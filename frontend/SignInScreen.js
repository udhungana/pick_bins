import React, { useState, useEffect } from "react";
import AsyncStorage from "@react-native-community/async-storage";
import {
  TouchableOpacity,
  View,
  Text,
  TextInput,
  StyleSheet,
} from "react-native";

import Assets from "./components/Assets";
import axios from "axios";

/**
 *
 * @param { String} email- maintain state of email
 * @param {password} password - maintains state of password
 * @param {bool} isDriver -check if the login info is a driver
 * @param {bool} check -used to check login times clicked
 */

const SignInScreen = ({ navigation }) => {
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [isDriver, setIsDriver] = useState(false);
  const [check, setCheck] = useState(0);

  /**
   *
   * handles submit for login information, gets email and password and sends to database for verification
   */
  const handleSubmit = (event) => {
    axios
      .post("http://192.168.1.176:4000/user/login", {   // himal's
        //.post("http://192.168.1.228:4000/user/login", {
        email,
        password,
      })
      .then((response) => {
        AsyncStorage.setItem("token", response["data"]["token"]);
        setIsDriver(response.data.isDriver);
        console.log(response);
        setCheck((check) => check + 1);
      });
  };

  useEffect(() => {
    if (check > 0) {
      if (isDriver) {
        navigation.navigate("DriverScreen");
      } else {
        navigation.navigate("DashScreen");
      }
    }
  }, [isDriver, check]);

  return (
    <View
      style={{
        flex: 1,
        flexDirection: "column",
        backgroundColor: "white",
        alignItems: "center",
        marginTop: 50,
      }}
    >
      <View
        style={{ margin: 15, justifyContent: "center", alignItems: "center" }}
      >
        <Assets />
        <Text style={{ color: "#00A600", fontSize: 30, fontWeight: "bold" }}>
          Pick Bins!!!!!
        </Text>
      </View>
      <View style={{ margin: 20, padding: 10 }}>
        <TextInput
          style={styles.textin}
          placeholder="Email*"
          value={email}
          onChangeText={(text) => setemail(text)}
        />
        <TextInput
          style={styles.textin}
          placeholder="Password*"
          secureTextEntry={true}
          onChangeText={(text) => setpassword(text)}
          value={password}
        />
      </View>
      <View style={{ margin: 15, alignItems: "center" }}>
        <TouchableOpacity
          onPress={() => handleSubmit()}
          style={styles.loginbutton}
        >
          <Text
            style={{
              color: "white",
              fontSize: 15,
              textAlign: "center",
            }}
          >
            Sign In
          </Text>
        </TouchableOpacity>
        <Text style={{ fontSize: 15, color: "gray", margin: 10 }}>or</Text>
      </View>
      <View style={{ alignItems: "center" }}>
        <TouchableOpacity
          style={{ backgroundColor: "white" }}
          onPress={() => navigation.navigate("SignUpScreen")}
        >
          <Text style={{ color: "#00A600", fontSize: 20, fontWeight: "bold" }}>
            Create New Account
          </Text>
        </TouchableOpacity>
        <Text style={{ marginTop: 50, color: "#DCDCDC", textAlign: "center" }}>
          By proceeding you also agree to the {"\n"}Terms of Service and Privacy
          Policy
        </Text>
      </View>
    </View>
  );
};
export default SignInScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  loginbutton: {
    textAlign: "center",
    backgroundColor: "#00A600",
    justifyContent: "center",
    height: 55,
    width: 200,
    borderRadius: 15,
  },
  textin: {
    height: 50,
    width: 350,
    margin: 10,
    backgroundColor: "#DCDCDC",
    borderRadius: 5,
  },
});
