import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, ScrollView, SafeAreaView } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Card } from "react-native-paper";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import AsyncStorage from "@react-native-community/async-storage";
import axios from "axios";

/**
 *
 * @param {array} driverTask
 * @param {integer} totalT
 * @param {integer} completedT
 */
/**
 *
 * This screen shows the driver task that needs to be finised in a list view.
 */
const DriverScreen = ({ navigation }) => {
  const [driverTask, setDriverTask] = useState([]);
  const [totalT, setTotalT] = useState(0);
  const [completedT, setCompletedT] = useState(0);

  /**
   * Use effects gets token as well as driver task from data base using async storage and axios to show the list.
   */
  useEffect(() => {
    AsyncStorage.getItem("token").then((response) => {
      console.log("###############");
      console.log("token from async");
      console.log(response);
      console.log("###############");
      axios
        //.get("http://192.168.1.176:4000/getTask", {     himal pat ko
        .get("http://192.168.1.228:4000/getTask", {
          headers: { Authorization: `Bearer ${response}` },
        })
        .then((response) => {
          console.log("###############");
          console.log("Driver list from use effect");
          console.log(response.data.path);
          setDriverTask(response.data.path);
          setTotalT(response.data.path.length);
          console.log("###############");
        })
        .catch((error) => {
          console.log(error);
        });
    });
  }, []);

  /**
   *
   * delete item will update the list of driver task after deleting task that are completed by driver
   */
  const deleteItem = (addr) => {
    setDriverTask(driverTask.filter((item) => item.address !== addr));

    //updating location of driver location
    AsyncStorage.getItem("token").then((response) => {
      console.log("###############");
      console.log("token from async");
      console.log(response);
      console.log("###############");
      axios
        //.post("http://192.168.1.176:4000/updateDriverLocation",     himal ko
        .post(
          "http://192.168.1.228:4000/updateDriverLocation",
          { current_location: addr },
          {
            headers: { Authorization: `Bearer ${response}` },
          }
        )
        .then((response) => {
          console.log(response);
          setCompletedT((completedT) => completedT + 1);
        })
        .catch((error) => {
          console.log(error);
        });
    });
  };

  /**
   * log's out of the driver screen and deletes the token too.
   */
  const logoutClicked = () => {
    AsyncStorage.getItem("token").then((response) => {
      console.log("###############");
      console.log("token from async");
      console.log(response);
      console.log("###############");
      axios
        //.post("http://192.168.1.176:4000/user/logout",
        .post(
          "http://192.168.1.228:4000/user/logout",
          {},
          {
            headers: { Authorization: `Bearer ${response}` },
          }
        )
        .then((response) => {
          console.log(response);
          if (response.status === 200) {
            navigation.navigate("SignInScreen");
          }
        })
        .catch((error) => {
          console.log(error);
        });
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <View
        style={{
          flex: 1,
          marginBottom: 30,
          backgroundColor: "white",
        }}
      >
        <ScrollView
          style={{
            width: 400,
            height: 600,
            marginTop: 20,
          }}
        >
          {driverTask.map((d, index) => {
            return (
              <ScrollView
                key={index}
                style={{
                  width: 400,
                  borderBottomColor: "#DCDCDC",
                  borderBottomWidth: 1,
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
                <View
                  style={{ flex: 0.1, flexDirection: "row", marginLeft: 20 }}
                >
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
                      height: 60,
                      alignSelf: "flex-start",
                      fontWeight: "bold",
                      marginLeft: 5,
                      flexDirection: "row",
                    }}
                  >
                    {d.address}
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
                  <TouchableOpacity
                    onPress={() => deleteItem(d.address)}
                    style={styles.tickButton}
                  >
                    <MaterialCommunityIcons
                      name="check"
                      color="#00A600"
                      size={20}
                    />
                  </TouchableOpacity>
                </View>
                {/* <View
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
                </View> */}
              </ScrollView>
            );
          })}
        </ScrollView>
      </View>

      <View styles={{ flex: 0.1 }}>
        <Card style={styles.cardDesign}>
          <View style={{ alignItems: "center", justifyContent: "center" }}>
            <Text style={styles.textDesign}>
              Total Task: {"\t\t\t"} {totalT}
            </Text>
            <Text style={styles.textDesign}>
              Completed: {"\t\t\t"} {completedT}
            </Text>
            <Text style={styles.textDesign}>
              Remaining: {"\t\t\t"} {driverTask.length}
            </Text>
          </View>

          {/* <Table>
            <TableWrapper>
              <Row
                data={totalTask}
                style={styles.box}
                textStyle={styles.textDesign}
              />
              <Row
                data={completedTask}
                style={styles.box}
                textStyle={styles.textDesign}np
              />
              <Row
                data={remainingTask}
                style={styles.box}
                textStyle={styles.textDesign}
              />
            </TableWrapper>
          </Table> */}
        </Card>
      </View>
      <View
        style={{
          flex: 0.1,
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
          marginLeft: 5,
          marginRight: 10,
          marginTop: 5,
        }}
      >
        <TouchableOpacity
          style={{ flex: 1, flexDirection: "row" }}
          onPress={() => logoutClicked()}
        >
          <MaterialCommunityIcons name="logout" color="red" size={20} />
          <Text style={{ color: "red" }}>Logout</Text>
        </TouchableOpacity>
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
    marginTop: 60,
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
    margin: 5,
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
    marginRight: 20,
  },
});
