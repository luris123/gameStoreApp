import React, { useState, useContext } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  ScrollView,
  Button,
  Modal,
  TouchableOpacity,
} from "react-native";
import ThemeContext from "../components/ThemeContext";
import Feather from "@expo/vector-icons/Feather";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import ProductCartContext from "../components/ProductContext";

const RenderCart = ({ item, removeItem }) => {
  return (
    <View styles={styles.touchableOp}>
      <View style={styles.productView}>
        <Image style={styles.imageStyle} source={{ uri: item.image }} />
        <Text
          style={{
            marginLeft: 10,
            fontSize: 16,
            fontWeight: "400",
            maxWidth: "80%",
            minWidth: "80%",

            marginRight: 4,
            letterSpacing: 1,
          }}
        >
          {item.name + "\n \n" + item.price + "€"}
        </Text>
        <View>
          <TouchableOpacity onPress={() => removeItem(item.id)}>
            <MaterialCommunityIcons
              name="delete-outline"
              style={{
                fontSize: 18,
                color: "#0a0a0a",
                backgroundColor: "#ada899",
                padding: 8,
                borderRadius: 100,
              }}
            />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const BuyModal = ({ showModal, setShowModal }) => {
  const { theme } = useContext(ThemeContext);
  const { product, setProduct } = useContext(ProductCartContext);

  const totalPrice = product.reduce((acc, item) => {
    return acc + item.price;
  }, 0);

  return (
      <Modal
        animationType="slide"
        transparent={false}
        visible={showModal}
        onRequestClose={() => {
          setShowModal(!showModal);
        }}
      >
        <View style={theme === "light" ? styles.modalLight : styles.modalDark}>
          <Text
            style={{
              fontSize: 18,
              color: "#000000",
              fontWeight: "500",
              padding: 15,
            }}
          >
            Thank you for your purchase!
          </Text>
          <Text>
            You have bought {product.length} items for a total of {totalPrice}€
          </Text>
          <Text>Verification email has been sent to your address.</Text>
          <TouchableOpacity
            style={styles.buyButton}
            onPress={() => {
              setShowModal(!showModal);
              setProduct([]);
            }}
          >
            <Text style={styles.buyText}>OK</Text>
          </TouchableOpacity>


        </View>
      </Modal>
  );
};

const ShoppingCartScreen = () => {
  const { product, setProduct } = useContext(ProductCartContext);
  const { theme } = useContext(ThemeContext);
  const [showModal, setShowModal] = useState(false);

  const removeItem = (id) => {
    const newProduct = product.filter((item) => item.id !== id);
    setProduct(newProduct);
  };

  if (product.length === 0) {
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
          <Text
            style={{
              fontSize: 18,
              color: "#f2f2f2",
              fontWeight: "500",
            }}
          >
            Order Details
          </Text>

        </View>

        <View style={styles.bodyContainer}>
          <Text style={styles.myCartFont}>My Cart</Text>

          <Text
            style={{
              fontSize: 18,
              color: "#000000",
              fontWeight: "500",
              padding: 15,
            }}
          >
            Shopping cart is empty
          </Text>
        </View>
      </View>
    );
  }

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
        <Text style={styles.myCartFont}>My Cart</Text>

        <FlatList
          showsVerticalScrollIndicator={false}
          data={product}
          renderItem={({ item }) => (
            <RenderCart item={item} removeItem={removeItem} />
          )}
          keyExtractor={(item) => item.id}
        >
          {" "}
        </FlatList>
        <BuyModal showModal={showModal} setShowModal={setShowModal} />
        <View style={{ alignItems: "center" }}>
          <TouchableOpacity
            style={styles.buyButton}
            onPress={() => setShowModal(true)}
          >
            <Text style={styles.buttonText}>Buy Now</Text>
          </TouchableOpacity>
        </View>
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
    fontSize: 17,
    fontWeight: "bold",
    color: "#000000",
    letterSpacing: 1,
    paddingLeft: 15,
    paddingBottom: 5,
  },

  bodyContainer: {
    flex: 1,
    backgroundColor: "#f2f2f2",
    width: "100%",
    height: "100%",
    borderTopStartRadius: 50,
    borderTopEndRadius: 50,
    position: "relative",
    paddingTop: 25,
  },

  productView: {
    width: "50%",
    height: 125,
    padding: 5,
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
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    borderRadius: 10,
    opacity: 0.6,
  },
  buyButton: {
    backgroundColor: "#2c6bed",
    width: "100%",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 10,
    width: "80%",
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  modalLight: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
  },
  modalDark: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#121212",
  },
});
