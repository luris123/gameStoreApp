import React, { useContext } from "react";
import { View, Text, StyleSheet, FlatList, useState, Image } from "react-native";
import ThemeContext from "../components/ThemeContext";
import { TouchableOpacity } from "react-native-gesture-handler";
import Feather from "@expo/vector-icons/Feather";
import GameScreen from "./GameScreen";

import ProductCartContext from "../components/ProductContext";




const RenderCart = ({item}) => {

  console.log(item.background_image)

  // const { product } = useContext(ProductContext)

  return (
    <TouchableOpacity styles={styles.touchableOp}>

      <View style={styles.productView}>

        <Image style={styles.imageStyle} source={{ uri: item.image }} />
        
      </View>

      <View style={styles.productInfo}>

      <View>
        <Text style={{
          fontSize: 14,
          fontWeight: '400',
          maxWidth: '85%',
          marginRight: 4,}}>

          {item.name}
        </Text>

        <View style={styles.spesificInfo}>

          <Text>
            Hinta
          </Text>


        </View>
      </View>

      <Text>tänne lisäys toiminto</Text>

      </View>
    </TouchableOpacity>
  )
}


const ShoppingCartScreen = () => {

  const { product, setProduct } = useContext(ProductCartContext)

  const { theme } = useContext(ThemeContext);


  return (
    <View style={styles.mainCont}>
      
      <View
          style={{
            width: '100%',
            flexDirection: 'row',
            paddingTop: 60,
            paddingHorizontal: 25,
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
          <Feather name="chevron-left" color="#fff" size={25} />
          </TouchableOpacity>
          <Text
            style={{
              fontSize: 18,
              color: "#f2f2f2",
              fontWeight: '500',
            }}>
            Order Details
          </Text>


          <View></View>
        </View>

        

        <View style={styles.bodyContainer}>
        <Text style={styles.myCartFont}>
            My Cart
        </Text>
          <Text style={{paddingLeft: 50}}>Tänne mapataan tuotteet</Text>


          <FlatList
            showsVerticalScrollIndicator={false}
            data={product}
            renderItem={({ item }) => (
              <RenderCart  item={item}  />

            )}
            keyExtractor={(item) => item.id}
            // numColumns={1}
          >
            {" "}
          </FlatList>

        </View>
      
    </View>

  );
};

export default ShoppingCartScreen;

const styles = StyleSheet.create({
  
  touchableOp: {
    width: "100%",
    height: 100,
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 6,
  },

  mainCont: {
      width: '100%',
      height: '100%',
      backgroundColor: "#1c73ba",
      position: 'relative',
  },

  myCartFont: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#000000",
    letterSpacing: 1,
    paddingTop: 20,
    paddingLeft: 16,
    paddingBottom: 10,

  },

  bodyContainer: {
    //flex: 0.85
    //paddingLeft: 10,
    backgroundColor: "#f2f2f2",
    width: "100%",
    height: "100%",
    borderTopStartRadius: 50,
    borderTopEndRadius: 50,
  },

  productView: {
    width: '30%',
    height: 100,
    padding: 14,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: "#D3D3D3",
    borderRadius: 10,
    marginRight: 22,
  },

  imageStyle: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',

  },

  productInfo: {
    flex: 1,
    height: '100%',
    justifyContent: 'space-around',
  },

  spesificInfo: {
    marginTop: 4,
    flexDirection: 'row',
    alignItems: 'center',
    opacity: 0.6,
  },




});
