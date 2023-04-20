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

import { getDatabase, ref, set, update } from "firebase/database";

import AsyncStorage from "@react-native-async-storage/async-storage";
import Ionicons from "react-native-vector-icons/Ionicons";

const RegisterScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [focused, setFocused] = useState(false)
  const [focused2, setFocused2] = useState(false)

  const navigation = useNavigation();

  const handleSignUp = () => {
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredentials) => {
        const user = userCredentials.user;
        const db = getDatabase();
        update(ref(db, "users/" + user.uid), {
          email: email,
          //password: password,
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

      <Ionicons name='lock-open-sharp' color={"#000000"} size={60} style={{marginBottom: 50}} />

      <Text style={{fontSize: 20,
                    marginHorizontal: 50,
                    fontFamily: "Poppins",
                    fontWeight: 500,
                    }}>Get started </Text>

      <Text style={styles.registerText3}>Register here</Text>


      <View style={styles.inputContainer}>

        <TextInput
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}

          placeholder='Email'
          value={email}
          onChangeText={text => setEmail(text)}

          
          style={[
              {
                  fontWeight: "500",
                  backgroundColor: '#dae0eb',
                  paddingHorizontal: 15,
                  paddingVertical: 10,
                  borderRadius: 10,
                  marginTop: 5,
                  borderWidth: 1,
                  borderColor: "#838c9c"
              },
              focused && {
                  backgroundColor: '#dae0eb',
                  borderWidth: 3,
                  borderColor: "#0853d4",
                  shadowOffset: { width: 4, height: 20 },
                  shadowColor: "black",
                  shadowOpacity: 0.2,
                  shadowRadius: 20,
              },
            ]}
                  
                  />


            <TextInput
              onFocus={() => setFocused2(true)}
              onBlur={() => setFocused2(false)}
              
              placeholder='Password'
              value={password}
              onChangeText={password => setPassword(password)}
              secureTextEntry
              
              style={[
                  {
                      fontWeight: "500",
                      backgroundColor: '#dae0eb',
                      paddingHorizontal: 15,
                      paddingVertical: 10,
                      borderRadius: 10,
                      marginTop: 5,
                      borderWidth: 1,
                      borderColor: "#838c9c"
                  },
                  focused2 && {
                      backgroundColor: '#dae0eb',
                      borderWidth: 3,
                      borderColor: "#0853d4",
                      shadowOffset: { width: 4, height: 20 },
                      shadowColor: "black",
                      shadowOpacity: 0.2,
                      shadowRadius: 20,
                  },
                ]}
                
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
    backgroundColor: "#F2F2F2"
  },
  inputContainer: {
    width: "80%",
  },
  input: {
    fontWeight: "500",
    backgroundColor: "#dae0eb",
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 10,
    marginTop: 5,
    borderWidth: 1,
    borderColor: "#838c9c"
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
    fontFamily: "Poppins",
  },
  registerText2: {
    color: "#2c6bed",
    fontSize: 16,
    fontWeight: "bold",
    fontFamily: "Poppins",
  },

  registerText3: {
    fontSize: 35,
    color: "#1c73ba",
    marginVertical: 50,
    margin: 20,
    fontFamily: "Poppins",

},


});
