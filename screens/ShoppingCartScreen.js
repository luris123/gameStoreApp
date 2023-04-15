import React, { useContext } from "react";
import { View, Text, StyleSheet, FlatList, useState, Image, ScrollView } from "react-native";
import ThemeContext from "../components/ThemeContext";
import { TouchableOpacity } from "react-native-gesture-handler";
import Feather from "@expo/vector-icons/Feather";
import GameScreen from "./GameScreen";

import ProductCartContext from "../components/ProductContext";




const RenderCart = ({ item }) => {

  //console.log(item.background_image)

  //const { product } = useContext(ProductContext)

  return (
    <TouchableOpacity styles={styles.touchableOp}>

      <View style={styles.productView}>
        <Image style={styles.imageStyle} source={{ uri: item.image }} />

      </View>

      <View style={styles.productInfo}>

        <View style={{}}>

          <Text style={{
            fontSize: 14,
            fontWeight: '400',
            maxWidth: '100%',
            marginRight: 4,
            letterSpacing: 1
          }}>

            {item.name}
          </Text>


          <View style={styles.spesificInfo}>

            <Text>
              Hinta
            </Text>

            <Text>muuta koko höskä scrollview ?</Text>
            <Text>tänne lisäys toiminto erillisten viewien sisää</Text>


          </View>
        </View>


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
      <ScrollView>
        


          <Text style={styles.myCartFont}>
            My Cart
          </Text>

          <View style={{ paddingHorizontal: 16, flexDirection: "row", justifyContent: "space-between", alignItems: "center", width: "100%" }}>

            {/* {product ? product.map(RenderCart) : null} */}

            {product.map((item, index) => {
              return (
                <RenderCart key={index} item={item} />
              )
            })}


            {/* <FlatList
            showsVerticalScrollIndicator={false}
            data={product}
            renderItem={({ item }) => (
              <RenderCart item={item} />

            )}
            keyExtractor={(item) => item.id}
          //numColumns={2}
          >
            {" "}
          </FlatList> */}

          </View>

          </ScrollView>

      </View>

    

      




    </View >


  );
};

export default ShoppingCartScreen;

const styles = StyleSheet.create({

  touchableOp: {
    width: "100%",
    height: 100,
    marginVertical: 6,
    flexDirection: "row",
    alignItems: "center",

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
    position: "relative"
  },

  productView: {
    width: '30%',
    height: 125,
    padding: 14,
    justifyContent: "flex-end",
    alignItems: "center",
    backgroundColor: "#D3D3D3",
    borderRadius: 10,
    marginRight: 22,
    flexDirection: "row",
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
