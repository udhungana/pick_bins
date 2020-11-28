// import React from "react";
// import { useForm } from "react-hook-form";
// import { View, StyleSheet } from "react-native";
// //import countryList from "react-select-country-list";

// const SignUpScreen = ({ navigation }) => {
//   // <View style={styles.container}>
//   //   <Text>SignUpScreen</Text>
//   // </View>;
//   const { register, handleSubmit } = useForm();
//   const onSubmit = (data) => console.log(data);

//   // const options = countryList().getData();

//   // const [selectedCountry, setSelectedCountry] = useState("");
//   // const [firstName, setFirstName] = useState("");
//   // const [lastName, setLastName] = useState("");
//   // const [address, setAddress] = useState("");
//   // const [city, setCity] = useState("");
//   // const [zipCode, setZipCode] = useState("");
//   // const [username, setUsername] = useState("");
//   // const [email, setEmail] = useState("");
//   // const [password, setpassword] = useState("");
//   // const [passwordCheck, checkPassword] = useState("");
//   return (
//     <View style={styles.container}>
//       <TextInput
//         style={styles.input}
//         placeholder="Username"
//         autoCapitalize="none"
//         placeholderTextColor="white"
//         onChangeText={(val) => this.onChangeText("username", val)}
//       />
//       <TextInput
//         style={styles.input}
//         placeholder="Password"
//         secureTextEntry={true}
//         autoCapitalize="none"
//         placeholderTextColor="white"
//         onChangeText={(val) => this.onChangeText("password", val)}
//       />
//       <TextInput
//         style={styles.input}
//         placeholder="Email"
//         autoCapitalize="none"
//         placeholderTextColor="white"
//         onChangeText={(val) => this.onChangeText("email", val)}
//       />
//       <TextInput
//         style={styles.input}
//         placeholder="Phone Number"
//         autoCapitalize="none"
//         placeholderTextColor="white"
//         onChangeText={(val) => this.onChangeText("phone_number", val)}
//       />
//       <Button title="Sign Up" onPress={this.signUp} />
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   input: {
//     width: 350,
//     height: 55,
//     backgroundColor: "#42A5F5",
//     margin: 10,
//     padding: 8,
//     color: "white",
//     borderRadius: 14,
//     fontSize: 18,
//     fontWeight: "500",
//   },
//   container: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//   },
// });
