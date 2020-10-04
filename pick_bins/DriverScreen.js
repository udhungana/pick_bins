import React, { useState } from "react";
import { View, Text, StyleSheet, Label } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Card, Divider } from "react-native-paper";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import {
  Table,
  TableWrapper,
  Row,
  Rows,
  Col,
  Cols,
  Cell,
} from "react-native-table-component";

const DriverScreen = ({ navigation }) => {
  //const [isLoading, setisLoading] = useState(false);
  const [data, setDate] = useState(["data1", "data2", "data3"]);
  const [totalTask, settotalTask] = useState(["Total Task", "6"]);
  // change data from varibale instead
  const [completedTask, setcompletedTask] = useState(["Completed", "2"]);
  const [remainingTask, setremainingTask] = useState(["Remaining", "4"]);

  return (
    <View style={styles.container}>
      <View styles={{ flex: 0.7 }}>
        <Card
          style={{
            justifyContent: "space-between",
            width: 200,
          }}
        >
          {data.map((address, index) => {
            return (
              <View>
                <View style={{ flex: 1, flexDirection: "row" }}>
                  <Text
                    style={{
                      fontSize: 20,
                      fontWeight: "bold",
                      height: 30,
                    }}
                  >
                    {index + 1}
                    {"    "}
                    {address}
                    {"    "}
                  </Text>
                </View>
                <View style={{ flex: 1, flexDirection: "row" }}>
                  <TouchableOpacity style={styles.tickButton}>
                    <MaterialCommunityIcons
                      name="check"
                      color="#00A600"
                      size={20}
                    />
                  </TouchableOpacity>
                </View>
                <View style={{ flex: 1, flexDirection: "row" }}>
                  <TouchableOpacity style={styles.tickButton}>
                    <MaterialCommunityIcons
                      name="close"
                      color="red"
                      size={20}
                    />
                  </TouchableOpacity>
                </View>
              </View>
            );
          })}
        </Card>
      </View>

      <View styles={{ flex: 0.3 }}>
        <Card style={styles.cardDesign}>
          <Table>
            <TableWrapper>
              <Row
                data={totalTask}
                style={styles.box}
                textStyle={styles.textDesign}
              />
              <Row
                data={completedTask}
                style={styles.box}
                textStyle={styles.textDesign}
              />
              <Row
                data={remainingTask}
                style={styles.box}
                textStyle={styles.textDesign}
              />
            </TableWrapper>
          </Table>
        </Card>
      </View>
    </View>
  );
};
export default DriverScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  cardDesign: {
    justifyContent: "center",
    alignItems: "center",
    margin: 10,
  },
  textDesign: {
    textAlign: "left",
    fontSize: 15,
    fontWeight: "bold",
    margin: 5,
  },
  box: {
    height: 20,
  },
  tickButton: {
    backgroundColor: "white",
    width: 22,
    height: 30,
  },
});
