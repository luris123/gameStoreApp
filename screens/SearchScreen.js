import React from "react";
import { TextInput, StyleSheet, Image, Text, View } from "react-native";
import Feather from "@expo/vector-icons/Feather";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useState, useContext } from "react";
import { NavigationContainer } from "@react-navigation/native";

import ThemeContext from "../components/ThemeContext";


const SearchScreen = (props) => {

    const { theme } = useContext(ThemeContext);

    const [value, setValue] = useState()

    return (
        <View style={styles.container}>


            <View style={styles.header}>
                <TouchableOpacity onPress={() => props.navigation.goBack()}>
                    <Feather name="chevron-left" color="#FFF" size={25} />
                </TouchableOpacity>
                <Feather name="filter" color="#FFF" size={25} />
            </View>


            <View style={styles.headerContainer}>
                <View style={styles.searchBarStyle}>

                    <Feather
                        name='search'
                        size={20}
                        color="black"
                        style={{ marginLeft: 1, marginRight: 4 }}
                    />

                    <TextInput value={value} onChangeText={(text) => updateSearch(text)} style={styles.search} placeholder='Search' />


                </View>
            </View>

            <View style={styles.cont3}>

                <Text style={styles.textHeader}>Products</Text>

                <TouchableOpacity style={{ width: "48%", marginVertical: 14 }}>

                    <View style={styles.bodyContainer}>
                        <Text>Teksti ja kuva</Text>
                    </View>
                    <Text
                        style={{
                            fontSize: 12,
                            backgroundColor: "#dfe6e0",
                            fontWeight: '600',
                            marginBottom: 2,
                            color: theme === "light" ? "black" : "lightgrey",
                        }}>product name</Text>

                </TouchableOpacity>


                {/* <View style={styles.cont1}>
                    <FontAwesome name="heart-o" color="#000" size={25} />
                    <TouchableOpacity
                        style={styles.btn}
                        onPress={() => props.navigation.navigate("HomeScreen")}
                    >
                        <Text style={styles.btnText}>Next</Text>
                    </TouchableOpacity>
                </View>  */}
            </View>


            {/* <Image source={require("../img/facebook")} style={styles.img} /> */}
            {/* <Image source={require("../kuvat/img/facebook.png")} style={styles.img} /> */}

        </View>
    );
};

export default SearchScreen;



const styles = StyleSheet.create({

    container: {
        height: "100%",
        alignItems: "center",
        justifyContent: "space-around",
        backgroundColor: "#1c73ba",

    },

    header: {
        flex: 0.05,
        //height: "15%",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        width: "100%",
        paddingHorizontal: 20,
        //backgroundColor: "#1bab42",
        paddingTop: 40,
    },

    textLight: {
        fontSize: 20,
        fontWeight: "bold",
        marginBottom: 20,
        color: "black",
      },
      textDark: {
        fontSize: 20,
        fontWeight: "bold",
        marginBottom: 20,
        color: "lightgrey",
      },

    headerContainer: {
        //backgroundColor: "#a30b0b",
        flex: 0.1,
        alignContent: "center",
        //alignItems: "center",
        justifyContent: "center",
        padding: 10,
    },

    searchBarStyle: {

        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingEnd: 225,

        paddingHorizontal: 20,
        backgroundColor: "#d9dbda",
        borderRadius: 10,
        padding: 10,
    },

    cont3: {
        flex: 0.85,
        //backgroundColor: "#19b342",
        backgroundColor: "#f2f2f2",
        width: "100%",
        borderTopStartRadius: 50,
        borderTopEndRadius: 50,
        //borderRadius: 50,
        // paddingHorizontal: 20,
        //marginTop: 50,
    },

    bodyContainer: {
        width: "100%",
        height: 100,
        borderRadius: 10,
        backgroundColor: "#d9dbda",
        position: "relative",
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 8,
    },

    textHeader: {
        paddingTop: 20,
        paddingStart: 20,
        fontSize: 18,
        paddingRight: 80,
        lineHeight: 25,
        fontWeight: "bold",
    },

    textDescription: {
        fontSize: 12,
        backgroundColor: "#dfe6e0",
        letterSpacing: 1,
        fontWeight: "bold",
    },

    btn: {

        backgroundColor: "#E2443B",
        paddingHorizontal: 60,
        paddingVertical: 12,
        borderRadius: 30,
    },
    btnText: {
        fontSize: 20,
        color: "#FFF",
    },

    cont1: {
        flexDirection: "row",
        alignItems: "center",
        width: "100%",
        justifyContent: "space-between",
        marginTop: 40,
    },


    img: {
        height: "45%",
        width: "50%",
    },

})