import React, { useContext } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  useState,
  Image,
  ScrollView,
  Button,
} from "react-native";
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
        <Text
          style={{
            marginLeft: 10,
            fontSize: 14,
            fontWeight: "400",
            maxWidth: "100%",
            marginRight: 4,
            letterSpacing: 1,
          }}
        >
          {item.name}
        </Text>
      </View>
      <View style={styles.spesificInfo}>
        <Text>Price and delete</Text>
      </View>
      
    </TouchableOpacity>
  );
};

const ShoppingCartScreen = () => {
  const { product, setProduct } = useContext(ProductCartContext);

  const { theme } = useContext(ThemeContext);

  return (
    <View style={styles.mainCont}>
      <View
        style={{
          width: "100%",
          flexDirection: "row",
          paddingTop: 60,
          paddingHorizontal: 25,
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Feather name="chevron-left" color="#fff" size={25} />
        </TouchableOpacity>
        <Text
          style={{
            fontSize: 18,
            color: "#f2f2f2",
            fontWeight: "500",
          }}
        >
          Order Details
        </Text>

        <View></View>
      </View>

      <View style={styles.bodyContainer}>
        {/* <ScrollView>
          <Text style={styles.myCartFont}>My Cart</Text>

          <View
            style={{
              paddingHorizontal: 16,
            }}
          >
            {product.map((item, index) => {
              return <RenderCart key={index} item={item} />;
            })}
          </View>
        </ScrollView> */}
         <FlatList
            showsVerticalScrollIndicator={false}
            data={product}
            renderItem={({ item }) => (
              <RenderCart item={item} />

            )}
            keyExtractor={(item) => item.id}
          //numColumns={2}
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
    marginVertical: 6,
    flexDirection: "row",
    alignItems: "center",
  },

  mainCont: {
    width: "100%",
    height: "100%",
    backgroundColor: "#1c73ba",
    position: "relative",
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
    flex: 1,
    //paddingLeft: 10,
    backgroundColor: "#f2f2f2",
    width: "100%",
    height: "100%",
    borderTopStartRadius: 50,
    borderTopEndRadius: 50,
    position: "relative"
  },

  productView: {
    width: "50%",
    height: 125,
    padding: 10,
    justifyContent: "space-between",
    alignItems: "center",
    borderRadius: 10,
    flexDirection: "row",
    marginRight: 10,
    marginBottom: 10,
  },

  imageStyle: {
    width: "100%",
    height: "100%",
    borderRadius: 5,
  },

  productInfo: {
    flex: 1,
    height: "100%",
    justifyContent: "space-around",
  },

  spesificInfo: {
    marginTop: 4,
    flexDirection: "column",
    alignItems: "flex-start",
    opacity: 0.6,
  },
});
