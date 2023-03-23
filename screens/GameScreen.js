import React from "react";
import { TextInput, StyleSheet, Image, Text, View } from "react-native";
import Feather from "@expo/vector-icons/Feather";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { Header } from "@react-navigation/stack";


const GameScreen = ({navigation}) => {
    
  return (
    <View style={styles.container}>
        <Text style={styles.headerText}>Gamename</Text>
        <Text style={styles.headerText}>Picture</Text>
        <Text style={styles.headerText}>Description</Text>
        <Text>
            ajsndoa asondoasn  oansjodsa onasjodnoa osandjoans  aosjndoan
        </Text>
        <Text style={styles.headerText}>Ratings</Text>
        <Text>
            1.5/5
        </Text>
        <Text style={styles.headerText}>Reviews</Text>
        <Text>
            as,d.asl,dasdp,a,sdp
        </Text>
        <Text style={styles.headerText}>Publisher</Text>
        <Text>
            PublisherGames
        </Text>
    </View>
  )
}

export default GameScreen

const styles = StyleSheet.create({
    headerText: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 20,
    },
})