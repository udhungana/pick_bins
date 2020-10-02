import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
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

const DriverScreen = ({ navigation }) => {
  const [totalTask, settotalTask] = useState(["Total Task", "6"]);
  // change data from varibale instead
  const [completedTask, setcompletedTask] = useState(["Completed", "2"]);
  const [remainingTask, setremainingTask] = useState(["Remaining", "4"]);
  return;
  <Card style={styles.cardDesign}>
    {/* add date,time and location variables */}
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
  </Card>;
};
export default DriverScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
