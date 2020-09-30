import React, { useEffect } from "react";
import { Button, View, Text, StyleSheet } from "react-native";
import Assets from "./components/Assets";

const FirstScreen = ({ navigation }) => {
  <View style={styles.container}>
    <Text>FirstScreen</Text>
  </View>;

  useEffect(() => {
    console.log("once");
    setTimeout(() => {
      navigation.navigate("SignInScreen");
    }, 3500);
  }, []);

  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "white",
      }}
    >
      <View>
        <Assets />
      </View>
      <Text style={styles.innertext}>Pick Bins</Text>
      {/* <Button
        color="#00A600"
        title="Start"
        onPress={() => navigation.navigate("SignInScreen")}
      /> */}
    </View>
  );
};
export default FirstScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  innertext: {
    flex: 0.2,
    fontSize: 30,
    fontWeight: "bold",
    textAlign: "center",
    color: "#00A600",
  },
});
