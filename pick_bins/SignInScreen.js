import React, { useState } from "react";
import {
  TouchableOpacity,
  View,
  Text,
  TextInput,
  StyleSheet,
} from "react-native";

import Assets from "./components/Assets";

const SignInScreen = ({ navigation }) => {
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");

  const handleSubmit = (event) => {
    //alert('Email: ' + email + '  password: ' + password);
    if (email == "e@driver" && password == "p") {
      navigation.navigate("DriverScreen");
    } else if (email == "e@user" && password == "p") {
      navigation.navigate("DashScreen");
    } else {
      alert("Incorrect    : Email: " + email + "  password: " + password);
    }
  };

  return (
    <View
      style={{
        flex: 1,
        flexDirection: "column",
        backgroundColor: "white",
        alignItems: "center",
        marginTop: 0,
      }}
    >
      <View
        style={{ margin: 15, justifyContent: "center", alignItems: "center" }}
      >
        <Assets />
        <Text style={{ color: "#00A600", fontSize: 30, fontWeight: "bold" }}>
          Pick Bins
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
