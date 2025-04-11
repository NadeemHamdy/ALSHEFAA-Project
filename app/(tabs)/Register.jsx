import React from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, TextInput, Button, Image, ScrollView } from "react-native";

import {  createUserWithEmailAndPassword } from "firebase/auth";
import auth from '../firebase';
import {useState} from 'react';
export default function Register() {
  const [Email,setEmail]=useState('')
  const [Password,setPasword]=useState('')
  const handleRegister=()=>{
    createUserWithEmailAndPassword(auth, Email, Password)
  .then((userCredential) => {
    
    console.log("done")
    const user = userCredential.user;
    
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    
    console.log(errorMessage)
  });

  }
  return (
    <ScrollView contentContainerStyle={styles.container}>
    
      
      <Text style={styles.title}>Register</Text>
      <StatusBar style="auto" />

     
      
      <TextInput style={styles.input} placeholder="Email" value={Email} onChangeText={setEmail} />
      <TextInput style={styles.input} placeholder="Password" value={Password} onChangeText={setPasword} secureTextEntry />


      <Button title="Register" onPress={handleRegister} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: "#808080",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  
  title: {
    fontSize: 24,
    color: "blue",
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  input: {
    width: "100%",
    height: 50,
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    borderRadius: 5,
    backgroundColor: "#fff",
    marginBottom: 15,
  },
});
