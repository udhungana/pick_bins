import React, { useState } from "react";
import { View, Text, StyleSheet, ScrollView, SafeAreaView } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Card } from "react-native-paper";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { Table, TableWrapper, Row } from "react-native-table-component";

const DriverScreen = ({ navigation }) => {
  //const [isLoading, setisLoading] = useState(false);

  const [data, setDate] = useState([
    "4038 esters road, irving, texas",
    "data2",
    "data3",
    "5015 Courtside dr, irving, texas",
    "5015 Courtside dr, irving, texas",
    "5015 Courtside dr, irving, texas",
    "5015 Courtside dr, irving, texas",
    "5015 Courtside dr, irving, texas",
    "5015 Courtside dr, irving, texas",
    "5015 Courtside dr, irving, texas",
    "5015 Courtside dr, irving, texas",
    "5015 Courtside dr, irving, texas",
  ]);
  // const [totalTask, settotalTask] = useState("6");
  // // change data from varibale instead
  // const [completedTask, setcompletedTask] = useState("4");
  // const [remainingTask, setremainingTask] = useState("2");

  var totalT = 6;
  var completedT = 4;
  var remainingT = 2;

  var totalTask = ["Total Task:", totalT];
  var completedTask = ["Completed:", completedT];
  var remainingTask = ["Total Task:", remainingT];

  return (
    <SafeAreaView style={styles.container}>
      <View style={{ flex: 0.95, marginBottom: 30, backgroundColor: "white" }}>
        <ScrollView
          style={{
            width: 400,
            height: 400,
          }}
        >
          {data.map((address, index) => {
            return (
              <ScrollView
                key={index}
                style={{
                  // flex: 1,
                  // flexDirection: "row",
                  width: 400,
                  // justifyContent: "flex-start",
                  borderBottomColor: "#DCDCDC",
                  borderBottomWidth: 1,
                  //alignItems: "center",
                }}
                contentContainerStyle={{
                  flex: 1,
                  flexGrow: 1,
                  flexDirection: "row",
                  height: 60,
                  justifyContent: "flex-start",
                  alignItems: "center",
                }}
              >
                <View style={{ flex: 0.1, flexDirection: "row" }}>
                  <Text
                    style={{
                      fontSize: 13,
                      height: 30,
                      alignSelf: "flex-start",
                      fontWeight: "bold",
                      marginLeft: 5,
                      flexDirection: "row",
                    }}
                  >
                    {index + 1}.
                  </Text>
                </View>
                <View style={{ flex: 0.8, flexDirection: "row" }}>
                  <Text
                    style={{
                      fontSize: 13,
                      height: 30,
                      alignSelf: "flex-start",
                      fontWeight: "bold",
                      marginLeft: 5,
                      flexDirection: "row",
                    }}
                  >
                    {address}
                  </Text>
                </View>
                <View
                  style={{
                    flex: 0.1,
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <TouchableOpacity style={styles.tickButton}>
                    <MaterialCommunityIcons
                      name="check"
                      color="#00A600"
                      size={20}
                    />
                  </TouchableOpacity>
                </View>
                <View
                  style={{
                    flex: 0.1,
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "center",
                    marginLeft: 5,
                    marginRight: 10,
                  }}
                >
                  <TouchableOpacity style={styles.tickButton}>
                    <MaterialCommunityIcons
                      name="close"
                      color="red"
                      size={20}
                    />
                  </TouchableOpacity>
                </View>
              </ScrollView>
            );
          })}
        </ScrollView>
      </View>

      <View styles={{ flex: 0.1 }}>
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
    </SafeAreaView>
  );
};
export default DriverScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 50,
    marginLeft: 10,
    marginRight: 10,
    // backgroundColor: "white",
  },
  cardDesign: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
    marginBottom: 10,
    width: 300,
    height: 150,
  },
  textDesign: {
    textAlign: "center",
    fontSize: 13,
    fontWeight: "bold",
  },
  box: {
    height: 30,
  },
  tickButton: {
    backgroundColor: "white",
    width: 22,
    height: 22,
    alignItems: "center",
    justifyContent: "center",
  },
});
