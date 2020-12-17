import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
/**
 *
 * This is contact info screen for user to get in touch with technical support
 */
const Support = (props) => {
  return (
    <View style={styles.container}>
      <Text
        style={{
          textAlign: "left",
          fontSize: 35,
          fontWeight: "bold",
          color: "green",
          textDecorationLine: "underline",
        }}
      >
        Contact Us:
      </Text>

      <TouchableOpacity>
        <View style={styles.icons}>
          <MaterialCommunityIcons name="phone" color="green" size={32} />
          <Text
            style={{
              textAlign: "left",
              fontSize: 25,
              fontWeight: "bold",
              color: "black",
              marginLeft: 10,
            }}
          >
            +1(580)-###-####
            {/* onPress={()=>{this.dialCall(5806656017)}}> */}
          </Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity>
        <View style={styles.icons}>
          <MaterialCommunityIcons
            name="email-outline"
            color="green"
            size={32}
          />
          <Text
            style={{
              textAlign: "left",
              fontSize: 25,
              fontWeight: "bold",
              color: "black",
              marginLeft: 10,
            }}
          >
            email@me.com
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};
export default Support;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  icons: {
    padding: 20,
    marginTop: 20,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
  },
});
