import { StyleSheet, Text, View,SafeAreaView, Pressable } from 'react-native'
import  auth from '../app/firebase';
import {useState} from 'react'
import React from 'react'
  

const Profile = () => {
 
  const handleLogout = async () => {
    try {
      await auth.signOut();
      console.log('User signed out!');

    } catch (error) {
      console.error('Error signing out:', error);
    }
  };
  return (
    <SafeAreaView style={styles.container}>
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Profile</Text>
      </View>
      <Pressable 
                     onPress={() => {
                        handleLogout();
                     }}
                     style={({ pressed }) => [
                       styles.Button,
                     ]}
                   >
                     {({ pressed }) => (
                       <Text style={styles.text}>{pressed ? "Pressed!" : "Logout"}</Text>
                     )}
                   </Pressable>
      <Text style={styles.text2 }></Text>
    </SafeAreaView>
  );
}

export default Profile

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  text: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
    textTransform: "uppercase",

  },
  text2: {
    color: "black",
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    textTransform: "uppercase",
    marginTop: "8%",
  },
  Button: {
    width: "80%",
    height: 50,
    marginTop: 20,
    marginBottom: 20,
    borderRadius: 8,
    backgroundColor: "rgb(33, 150, 243)",
    justifyContent: "center",
    alignItems: "center",
    alignContent: "center",
  },
})