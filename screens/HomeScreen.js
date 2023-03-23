import { useNavigation } from '@react-navigation/core'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'

import React, { useEffect } from 'react'
import { auth, functions } from '../firebase'
import { httpsCallable } from 'firebase/functions';

const getAllGenres = httpsCallable(functions, 'getAllGenres');

const HomeScreen = () => {

  const navigation = useNavigation();

  useEffect(() => {
    getAllGenres()
      .then(result => {
        console.log(result.data);
      })
      .catch(error => {
        console.log(error);
      })
  }, [])

  const handleSingOut = () => {
    auth.signOut()
      .then(() => {
        console.log('Signed out');

      })
      .catch(error => alert(error.message));
  }

  return (
    <View style={styles.homeContainer}>
      <Text style={styles.emailText}>Email: {auth.currentUser.email}</Text>
      <TouchableOpacity style={styles.logoutButton} onPress={handleSingOut}>
        <Text style={styles.buttonText}>Logout</Text>
      </TouchableOpacity>
    </View>

  )
}

export default HomeScreen

const styles = StyleSheet.create({
  homeContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emailText: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  logoutButton: {
    backgroundColor: '#2c6bed',
    width: '100%',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10,
    width: '80%'
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
})