import { useNavigation } from "@react-navigation/core";
import {
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Platform,
} from "react-native";
import React, { useState } from "react";

import { auth } from "../firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { getDatabase, ref, set } from "firebase/database";

import AsyncStorage from "@react-native-async-storage/async-storage";

const RegisterScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigation = useNavigation();

  const handleSignUp = () => {
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredentials) => {
        const user = userCredentials.user;
        const db = getDatabase();
        set(ref(db, "users/" + user.uid), {
          email: email,
          password: password,
          darkMode: false,
          uid: user.uid,
        });

      })
      .then(async () => {
        await AsyncStorage.setItem('@email', email);
        await AsyncStorage.setItem('@password', password);
      })
      .catch((error) => alert(error.message));
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Email"
          value={email}
          onChangeText={(text) => setEmail(text)}
          style={styles.input}
        />
        <TextInput
          placeholder="Password"
          value={password}
          onChangeText={(password) => setPassword(password)}
          style={styles.input}
          secureTextEntry
        />
      </View>
      <View style={styles.loginContainer}>
        <TouchableOpacity onPress={handleSignUp} style={styles.button}>
          <Text style={styles.buttonOutline}>Register</Text>
        </TouchableOpacity>
        <Text style={styles.registerText1}>Already have an account?</Text>
        <Text
          style={styles.registerText2}
          onPress={() => navigation.replace("Login")}
        >
          Login here
        </Text>
      </View>
    </KeyboardAvoidingView>
  );
};

export default RegisterScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  inputContainer: {
    width: "80%",
  },
  input: {
    backgroundColor: "white",
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 10,
    marginTop: 5,
  },
  loginContainer: {
    width: "60%",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 40,
  },
  button: {
    backgroundColor: "#2c6bed",
    width: "100%",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginBottom: 10,
  },
  buttonOutline: {
    color: "white",
    fontSize: 17,
    fontWeight: "bold",
  },
  registerText1: {
    fontSize: 17,
  },
  registerText2: {
    color: "#2c6bed",
    fontSize: 16,
    fontWeight: "bold",
  },
});
