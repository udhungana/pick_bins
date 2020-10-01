import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Card } from "react-native-paper";
import {
  Table,
  TableWrapper,
  Row,
  Rows,
  Col,
  Cols,
  Cell,
} from "react-native-table-component";

const Dashboard = ({ navigation }) => {
  const [dateLine, setDateLine] = useState(["Date", "September 20"]);
  // change data from varibale instead
  const [timeLine, setTimeLine] = useState(["Time", "5 pm"]);
  const [locationLine, setLocationLine] = useState([
    "Location",
    "1000 Courtside Dr. Irving Tx",
  ]);

  const handleSubmit = () => {
    navigation.navigate("Pickup");
  };

  return (
    <View style={styles.container}>
      {/* add username variable */}
      <Text style={{ fontSize: 20, fontWeight: "bold", margin: 5 }}>
        Hey Username !
      </Text>
      <Text style={{ fontSize: 18, fontWeight: "bold", margin: 5 }}>
        Your Pickup is Scheduled
      </Text>
      <Card style={styles.cardDesign}>
        {/* add date,time and location variables */}
        <Table>
          <TableWrapper>
            <Row
              data={dateLine}
              style={styles.box}
              textStyle={styles.textDesign}
            />
            <Row
              data={timeLine}
              style={styles.box}
              textStyle={styles.textDesign}
            />
            <Row
              data={locationLine}
              style={styles.box}
              textStyle={styles.textDesign}
            />
          </TableWrapper>
        </Table>
      </Card>
      <View style={{ flex: 0.2, alignItems: "center" }}>
        <Text
          style={{
            textAlign: "center",
            fontSize: 20,
            fontWeight: "bold",
            color: "#00A600",
          }}
        >
          Missed Your Pickup?
        </Text>
        <Text
          style={{
            textAlign: "center",
            fontSize: 13,
            fontWeight: "bold",
            color: "#00C100",
          }}
        >
          Don't worry {"\n"}Just Send us a Pick Up Request
        </Text>
        <TouchableOpacity
          onPress={() => handleSubmit()}
          style={styles.pickUpButton}
        >
          <Text
            style={{
              color: "white",
              fontSize: 15,
              textAlign: "center",
            }}
          >
            Pick Up Request
          </Text>
        </TouchableOpacity>
      </View>
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
    flex: 0.3,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 24,
    margin: 30,
    flexWrap: "wrap",
  },
  textDesign: {
    textAlign: "left",
    fontSize: 15,
    fontWeight: "bold",
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
