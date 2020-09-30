import * as React from "react";
import { Text, View, StyleSheet, Image } from "react-native";

export default function Assets() {
  return (
    <View style={styles.container}>
      <Image style={styles.logo} source={require("./Pick_Bins_Logo.png")} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    padding: 15,
  },
  paragraph: {
    margin: 24,
    marginTop: 0,
    fontSize: 14,
    fontWeight: "bold",
    textAlign: "center",
  },
  logo: {
    height: 120,
    width: 120,
  },
});
