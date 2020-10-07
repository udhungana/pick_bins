import React from "react";
import { useState } from "react";
import {
  TextInput,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
// import DropDownPicker from "react-native-dropdown-picker";
import countryList from "react-select-country-list";

const SignUpScreen = ({ navigation }) => {
  const options = countryList().getData();

  const [selectedCountry, setSelectedCountry] = useState("USA");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setpassword] = useState("");
  const [passwordCheck, setcheckPassword] = useState("");

  const handleSubmit = () => {
    navigation.navigate("SignInScreen");
  };

  return (
    <ScrollView pinchGestureEnabled>
      <View style={styles.container}>
        <TextInput
          style={styles.input}
          placeholder="First Name*"
          autoCapitalize="none"
          onChangeText={(val) => setFirstName(val)}
        />
        <TextInput
          style={styles.input}
          placeholder="Last Name*"
          autoCapitalize="none"
          onChangeText={(val) => setLastName(val)}
        />
        <TextInput
          style={styles.input}
          placeholder="Address*"
          autoCapitalize="none"
          onChangeText={(val) => setAddress(val)}
        />
        <TextInput
          style={styles.input}
          placeholder="City*"
          autoCapitalize="none"
          onChangeText={(val) => setCity(val)}
        />
        <TextInput
          style={styles.input}
          placeholder="Zip Code*"
          autoCapitalize="none"
          keyboardType="numeric"
          onChangeText={(val) => setZipCode(val)}
        />
        {/* <DropDownPicker
          items={options}
          containerStyle={{
            height: 60,
            width: 350,
          }}
          style={{ backgroundColor: "#DCDCDC" }}
          itemStyle={{
            justifyContent: "flex-start",
          }}
          dropDownStyle={{ backgroundColor: "#fafafa" }}
          placeholder="USA"
          onChangeItem={(item) => setSelectedCountry(item)}
        /> */}
        <TextInput
          style={styles.input}
          placeholder="Phone Number*"
          autoCapitalize="none"
          onChangeText={(val) => setPhonenumber(val)}
        />
        <TextInput
          style={styles.input}
          placeholder="Username*"
          autoCapitalize="none"
          onChangeText={(val) => setUsername(val)}
        />
        <TextInput
          style={styles.input}
          placeholder="Email*"
          autoCapitalize="none"
          onChangeText={(val) => setEmail(val)}
        />
        <TextInput
          style={styles.input}
          placeholder="Password*"
          secureTextEntry={true}
          autoCapitalize="none"
          onChangeText={(val) => setpassword(val)}
        />
        <TextInput
          style={styles.input}
          placeholder="Confirm Password*"
          secureTextEntry={true}
          autoCapitalize="none"
          onChangeText={(val) => setcheckpassword(val)}
        />

        <TouchableOpacity
          onPress={() => handleSubmit()}
          style={styles.loginbutton}
        >
          <Text
            style={{
              color: "white",
              fontSize: 15,
              textAlign: "center",
            }}
          >
            Register
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default SignUpScreen;

const styles = StyleSheet.create({
  input: {
    width: 350,
    height: 60,
    backgroundColor: "#DCDCDC",
    margin: 10,
    padding: 8,
    borderRadius: 14,
    fontSize: 18,
    fontWeight: "500",
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
  },
  loginbutton: {
    textAlign: "center",
    backgroundColor: "#00A600",
    justifyContent: "center",
    height: 55,
    width: 200,
    borderRadius: 15,
    marginTop: 20,
    marginBottom: 20,
  },
});
