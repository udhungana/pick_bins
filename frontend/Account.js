import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

const Account = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text
        style={{
          textAlign: "center",
          fontSize: 30,
          fontWeight: "bold",
          color: "#00A600",
        }}
      >
        Account Settings
      </Text>
      <TouchableOpacity>
        <View style={styles.icons}>
          <MaterialCommunityIcons name="home" color="#00A600" size={30} />
          <Text style={styles.texts}>Change Address</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity>
        <View style={styles.icons}>
          <MaterialCommunityIcons name="bell" color="#00A600" size={30} />
          <Text style={styles.texts}>Notification</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity>
        <View style={styles.icons}>
          <MaterialCommunityIcons name="map-marker" color="#00A600" size={30} />
          <Text style={styles.texts}>Location</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity>
        <View style={styles.icons}>
          <MaterialCommunityIcons name="lock" color="#00A600" size={30} />
          <Text style={styles.texts}>Privacy</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};
export default Account;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  icons: {
    padding: 20,
    marginTop: 20,
    flexDirection: "row",
    justifyContent: "center",
  },
  texts: {
    textAlign: "left",
    fontSize: 25,
    fontWeight: "bold",
    color: "#00A600",
    flexDirection: "row",
    justifyContent: "center",
  },
});
