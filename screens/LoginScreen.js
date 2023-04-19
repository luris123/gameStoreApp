import { useNavigation } from '@react-navigation/core'
import { KeyboardAvoidingView, StyleSheet, Text, TextInput, TouchableOpacity, View, Platform, } from 'react-native'
import React, { useState } from 'react'
import { auth } from '../firebase';
import { signInWithEmailAndPassword } from "firebase/auth";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFonts } from 'expo-font';
import Feather from "@expo/vector-icons/Feather";
import Ionicons from "react-native-vector-icons/Ionicons";




const LoginScreen = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [focused, setFocused] = useState(false)
    const [focused2, setFocused2] = useState(false)

    const navigation = useNavigation();

    const [loaded] = useFonts({
        
        Poppins: require("../assets/fonts/Poppins-SemiBold.ttf"),
        
    });

    if (!loaded) {
        return undefined;
    } else {

    }


    const handleLogin = () => {
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredentials) => {
                const user = userCredentials.user;
                console.log('Logged in with', user.email);
            })
            .then(async () => {
                await AsyncStorage.setItem('@email', email);
                await AsyncStorage.setItem('@password', password);
            })
            .catch(error => alert(error.message));
    }


    return (
        <KeyboardAvoidingView
            style={styles.container}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >


                <Ionicons name='lock-closed-sharp' color={"#000000"} size={60} style={{marginBottom: 50}} />
            
                <Text style={{fontSize: 20,
                    marginHorizontal: 50,
                    fontFamily: "Poppins",
                    fontWeight: 500,
                    }}>Welcome to Gamestoreapp </Text>

                <Text style={styles.loginText}>Login Here</Text>

                {/* <Feather name="lock" color="#000000" size={50} style={{marginBottom: 40}} /> */}
            
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
                <TouchableOpacity onPress={handleLogin} style={styles.button}>
                    <Text style={styles.buttonOutline}>Login</Text>
                </TouchableOpacity>
                <Text style={styles.registerText1}>Need an account?</Text>
                <Text style={styles.registerText2} onPress={() => navigation.replace('Register')}>Register here</Text>
            </View>
        </KeyboardAvoidingView>
    )
}

export default LoginScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: "#F2f2f2"
    },
    inputContainer: {
        width: '80%',
    },
    input: {
        fontWeight: "500",
        backgroundColor: '#dae0eb',
        paddingHorizontal: 15,
        paddingVertical: 10,
        borderRadius: 10,
        marginTop: 5,
        borderWidth: 1,
        borderColor: "#838c9c"
    },

    loginContainer: {
        width: '60%',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 40
    },
    button: {
        backgroundColor: '#1c73ba',
        width: '100%',
        padding: 15,
        borderRadius: 10,
        alignItems: 'center',
        marginBottom: 10,
        fontFamily: "Poppins",

        shadowColor: "#000000",
        shadowOffset: {
            width: 0,
            height: 50
        },
        shadowOpacity: 0.3,
        shadowRadius: 50,
        
    },
    buttonOutline: {
        color: '#f2f2f2',
        fontSize: 17,
        fontWeight: 'bold',
    },

    registerText1: {
        fontSize: 17,
        fontFamily: "Poppins",
    },
    registerText2: {
        color: '#2c6bed',
        fontSize: 16,
        fontWeight: 'bold',
        fontFamily: "Poppins",
    },

    loginText: {
        fontSize: 35,
        color: "#1c73ba",
        fontFamily: "Poppins",
        //fontFamily: "Poppins-Regular",
        marginVertical: 50,

    }
})