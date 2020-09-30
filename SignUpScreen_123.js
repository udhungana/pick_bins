import React from "react";
import { useRef } from "react";
import { useForm } from "react-hook-form";
import { View, Text, StyleSheet } from "react-native";

const SignUpScreen = ({ navigation }) => {
  <View style={styles.container}>
    <Text>SignUpScreen</Text>
  </View>;
  const { register, handleSubmit } = useForm();
  const onSubmit = (data) => alert(data);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input
        style={styles.textin}
        name="firstName"
        placeholder="First Name*"
        ref={register}
      />
      <input
        style={styles.textin}
        name="lastName"
        placeholder="Last Name*"
        ref={register}
      />
      <input
        style={styles.textin}
        name="address"
        placeholder="Address*"
        ref={register}
      />
      <input
        style={styles.textin}
        name="city"
        placeholder="City*"
        ref={register}
      />
      <input
        style={styles.textin}
        name="zipCode"
        placeholder="Zip Code*"
        ref={register}
      />

      <input
        style={styles.textin}
        name="username"
        placeholder="Username*"
        ref={register}
      />
      <input
        style={styles.textin}
        name="email"
        placeholder="Email*"
        ref={register}
      />
      <input
        style={styles.textin}
        name="password"
        placeholder="Password*"
        type="password"
        ref={register}
      />
      <input
        style={styles.textin}
        name="checkPassword"
        placeholder="Confirm Password*"
        type="password"
        ref={register}
      />
      <input type="submit" />
    </form>
  );
};
export default SignUpScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
