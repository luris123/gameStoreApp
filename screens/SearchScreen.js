import React from "react";
import {
  TextInput,
  StyleSheet,
  Image,
  Text,
  View,
  FlatList,
  Button,
  Pressable,
} from "react-native";
import Feather from "@expo/vector-icons/Feather";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useState, useContext, useEffect } from "react";
import axios from "axios";
import GameScreen from "./GameScreen";
import ThemeContext from "../components/ThemeContext";
import { useNavigation } from '@react-navigation/native';




const ProductCard = ({ game, bg, id }) => {
  const { theme } = useContext(ThemeContext);
  const navigation = useNavigation()
  //navigator.navigate()
  return (
    <TouchableOpacity
      onPress={() => navigation.navigate("Game", { id })}
      style={{
        width: "100%",
        marginVertical: 14,
        paddingRight: 30,
        paddingLeft: 30,
      }}
    >
      <View style={theme === "light" ? styles.bodyContainerLight : styles.bodyContainerDark}>
        <View style={theme === "light" ? styles.innerProductCardLight : styles.innerProductCardDark}></View>

        <Image style={styles.img} source={{ uri: bg }} />
      </View>

      <Text
        style={{
          fontSize: 13,
          backgroundColor: theme === "light" ? "#D3D3D3" : "#333333",
          borderRadius: 10,
          fontWeight: "600",
          marginBottom: 2,
          width: 125,
          textAlign: "center",
          color: theme === "light" ? "black" : "lightgrey",
        }}
      >
        {game}
      </Text>
    </TouchableOpacity>
  );
};

const SearchScreen = () => {
  const { theme } = useContext(ThemeContext);
  const [search, setSearch] = useState("");
  const [pageNumber, setPageNumber] = useState(1);
  const [game, setGame] = useState([]);
  const navigation = useNavigation()

  useEffect(() => {
    getGames();
    changePageNumber();
  }, []);

  const getGames = async () => {
    const response = await axios.get(
      `https://europe-west1-gamestoreapp-69869.cloudfunctions.net/getGames?page=${pageNumber}`
    );

    setGame([...game, ...response.data.results]);
  };

  const changePageNumber = () => {
    setPageNumber(pageNumber + 1);
  };

  const matchedGames = game?.filter((games) =>
    games.name.toLowerCase().includes(search.toLowerCase())
  );

  if (game != undefined) {

    //props.navigation.goBack()

    return (
      <View style={styles.container}>
        <View style={styles.header}>

          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Feather name="chevron-left" color="#FFF" size={25} />
          </TouchableOpacity>
          <Feather name="filter" color="#FFF" size={25} />
        </View>

        <View style={styles.headerContainer}>
          <View style={styles.searchBarStyle}>
            <Feather
              name="search"
              size={20}
              color="black"
              style={{ marginLeft: 1, marginRight: 4 }}
            />

            <TextInput
              value={search}
              onChangeText={(text) => setSearch(text)}
              style={styles.search}
              placeholder="Search"
            />
          </View>
        </View>

        <View style={theme === "light" ? styles.cont3Light : styles.cont3Dark}>
          <Text style={theme === "light" ? styles.textHeaderLight : styles.textHeaderDark}>Products</Text>


          {/* <View style={{width: 250, paddingStart: 120, justifyContent: "center", alignContent: "center", alignItems: "center"}}>
        <Button
            
            title="Load More"
            onPress={() => {
              getGames();
              changePageNumber();
            }}
            
          />
        </View> */}


          <FlatList
            showsVerticalScrollIndicator={false}
            data={matchedGames}
            renderItem={({ item }) => (
              <ProductCard game={item.name} bg={item.background_image} id={item.id} />

            )}
            ListFooterComponent={
              <View style={{width: 250, paddingStart: 120, paddingBottom: 10}}>
                <Button
                  title="Load More"
                  onPress={() => {
                    getGames();
                    changePageNumber();
                  }} />
              </View>
            }

            keyExtractor={(item) => item.id}
            numColumns={2}
          >
            {" "}
          </FlatList>


        </View>

      </View>
    );


  } else {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => console.log("asd")}>
            <Feather name="chevron-left" color="#FFF" size={25} />
          </TouchableOpacity>
          <Feather name="filter" color="#FFF" size={25} />
        </View>

        <View style={styles.headerContainer}>
          <View style={styles.searchBarStyle}>
            <Feather
              name="search"
              size={20}
              color="black"
              style={{ marginLeft: 1, marginRight: 4 }}
            />

            <TextInput
              value={search}
              onChangeText={(text) => updateSearch(text)}
              style={styles.search}
              placeholder="Search"
            />
          </View>
        </View>

        <View style={theme === "light" ? styles.cont3Light : styles.cont3Dark}>
          <Text style={theme === "light" ? styles.textHeaderLight : styles.textHeaderDark}>Products</Text>

          <Text>Loading...</Text>

          <View
            style={{
              flexDirection: "row",
              flexWrap: "wrap",
              justifyContent: "space-around",
            }}
          ></View>
        </View>
      </View>
    );
  }
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

  cont3Light: {
    flex: 0.85,
    paddingLeft: 10,
    backgroundColor: "#f2f2f2",
    width: "100%",
    borderTopStartRadius: 50,
    borderTopEndRadius: 50,
  },

  cont3Dark: {
    flex: 0.85,
    paddingLeft: 10,
    backgroundColor: "#121212",
    width: "100%",
    borderTopStartRadius: 50,
    borderTopEndRadius: 50,
  },

  bodyContainerLight: {
    width: "100%",
    height: 125,
    borderRadius: 10,
    backgroundColor: "#D3D3D3",
    position: "relative",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 8,
  },

  bodyContainerDark: {
    width: "100%",
    height: 125,
    borderRadius: 10,
    backgroundColor: "#333333",
    position: "relative",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 8,
  },

  innerProductCardLight: {
    position: "absolute",
    width: "20%",
    height: "24%",
    backgroundColor: "#d9dbda",
    top: 0,
    left: 0,
    borderTopLeftRadius: 10,
    borderBottomRightRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },

  innerProductCardDark: {
    position: "absolute",
    width: "20%",
    height: "24%",
    backgroundColor: "#333333",
    top: 0,
    left: 0,
    borderTopLeftRadius: 10,
    borderBottomRightRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },

  textHeaderLight: {
    paddingTop: 20,
    paddingStart: 20,
    fontSize: 18,
    paddingRight: 80,
    lineHeight: 25,
    fontWeight: "bold",
  },

  textHeaderDark: {
    paddingTop: 20,
    paddingStart: 20,
    fontSize: 18,
    paddingRight: 80,
    lineHeight: 25,
    fontWeight: "bold",
    color: "lightgrey",
  },

  img: {
    height: "80%",
    width: "80%",
    resizeMode: "cover",
  },


});
