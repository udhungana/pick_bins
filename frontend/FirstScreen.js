import React, { useEffect } from "react";
import { Button, View, Text, StyleSheet } from "react-native";
import Assets from "./components/Assets";

/**
 *
 * This is the first splash scree showing pickbins logout. Timout for showing this screen is set to 2s.
 */
const FirstScreen = ({ navigation }) => {
  <View style={styles.container}>
    <Text>FirstScreen</Text>
  </View>;

  useEffect(() => {
    console.log("once");
    setTimeout(() => {
      navigation.navigate("SignInScreen");
    }, 2000);
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
