import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Linking } from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
​
// const dialCall = (number) => {
//   let phoneNumber = '';
//   if (Platform.OS === 'android') { phoneNumber = `tel:${number}`; }
//   else {phoneNumber = `telprompt:${number}`; }
//   Linking.openURL(phoneNumber);
// };
​
const Support = (props) => {
  return (
    <View style = {styles.container}>
      <Text
        style={{
          textAlign: "left",
          fontSize: 35,
          fontWeight: "bold",
          color: "#00A600",
      }}>Contact us!
      </Text>
    
      <TouchableOpacity>
        <View style = {styles.icons}>
          <MaterialIcons name= 'settings-phone' color ='#00A600' size ={32}/>
          <Text 
          style = {{
            textAlign: "left",
            fontSize: 25,
            fontWeight: "bold",
            color: "#00A600",}}> +1(580)-###-####
           {/* onPress={()=>{this.dialCall(5806656017)}}> */}
          </Text> 
        </View>
      </TouchableOpacity>
      <TouchableOpacity>
        <View style = {styles.icons}>
          <MaterialCommunityIcons name= 'email-outline' color ='#00A600' size ={32}/>
          <Text 
          style = {{
            textAlign: "left",
            fontSize: 25,
            fontWeight: "bold",
            color: "#00A600",
          }}>email@me.com
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};
export default Support;
​
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  icons:{
    padding : 20,
    marginTop : 20,
    alignItems: "center",
    justifyContent: "center",
    flexDirection : 'row',
  }
});