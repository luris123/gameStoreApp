import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Modal,
} from "react-native";
import React, { useState, useContext } from "react";
import { auth } from "../firebase";
import ThemeContext from "../components/ThemeContext";
import SwitchWithText from "../components/SwitchWithText";

import AsyncStorage from "@react-native-async-storage/async-storage";
import { getDatabase, ref, update } from "firebase/database";
import {
  updatePassword,
  reauthenticateWithCredential,
  EmailAuthProvider,
} from "firebase/auth";

const PasswordModal = ({ showModal, setShowModal }) => {
  const { theme } = useContext(ThemeContext);
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handlePasswordChange = () => {
    if (newPassword !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }
    const user = auth.currentUser;
    const password = oldPassword;
    const credential = EmailAuthProvider.credential(user.email, password);

    reauthenticateWithCredential(user, credential)
      .then(() => {
        updatePassword(user, newPassword)
          .then(() => {
            alert("Password updated");
            setShowModal(false);
            setOldPassword("");
            setNewPassword("");
            setConfirmPassword("");
          })
          .catch((error) => alert(error.message));
      })
      .catch((error) => alert(error.message));
  };

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
        <View>
          <Text
            style={
              theme === "light"
                ? styles.profileTextLight
                : styles.profileTextDark
            }
          >
            Change password
          </Text>
          <TextInput
            placeholder="Old password"
            value={oldPassword}
            secureTextEntry={true}
            onChangeText={(text) => setOldPassword(text)}
            style={
              theme === "light" ? styles.inputTextLight : styles.inputTextDark
            }
          />
          <TextInput
            placeholder="New password"
            value={newPassword}
            secureTextEntry={true}
            onChangeText={(text) => setNewPassword(text)}
            style={
              theme === "light" ? styles.inputTextLight : styles.inputTextDark
            }
          />
          <TextInput
            placeholder="Confirm password"
            value={confirmPassword}
            secureTextEntry={true}
            onChangeText={(text) => setConfirmPassword(text)}
            style={
              theme === "light" ? styles.inputTextLight : styles.inputTextDark
            }
          />
          <TouchableOpacity
            style={styles.logoutButton}
            onPress={handlePasswordChange}
          >
            <Text style={styles.buttonText}>Change password</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.logoutButton}
            onPress={() => setShowModal(false)}
          >
            <Text style={styles.buttonText}>Cancel</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const ProfileScreen = ({ navigation }) => {
  const { theme, setTheme } = useContext(ThemeContext);
  const [showModal, setShowModal] = useState(false);
  const user = auth.currentUser;

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
    const db = getDatabase();
    update(ref(db, "users/" + user.uid), {
      darkMode: theme === "light" ? true : false,
    });
  };

  const handleSignOut = async () => {
    await AsyncStorage.removeItem("@email");
    await AsyncStorage.removeItem("@password");
    auth
      .signOut()
      .then(async () => {
        console.log("Signed out");
      })
      .catch((error) => alert(error.message));
  };

  return (
    <View style={styles.profileContainer}>
      <Text
        style={
          theme === "light" ? styles.profileTextLight : styles.profileTextDark
        }
      >
        Email: {user.email}
      </Text>

      <SwitchWithText
        text="Dark Mode"
        value={theme === "dark"}
        onValueChange={toggleTheme}
      />

      <TouchableOpacity
        style={styles.logoutButton}
        onPress={() => setShowModal(true)}
      >
        <Text style={styles.buttonText}>Change password</Text>
      </TouchableOpacity>

      <PasswordModal showModal={showModal} setShowModal={setShowModal} />
      <TouchableOpacity style={styles.logoutButton} onPress={handleSignOut}>
        <Text style={styles.buttonText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  profileContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    color: "white",
  },
  profileTextLight: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
    color: "black",
  },
  profileTextDark: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
    color: "lightgrey",
  },
  inputTextLight: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
    color: "black",
    borderBottomColor: "black",
  },
  inputTextDark: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
    color: "lightgrey",
    borderBottomColor: "lightgrey",
  },

  logoutButton: {
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
