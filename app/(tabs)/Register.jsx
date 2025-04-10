import React from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, TextInput, Button, Image, ScrollView } from "react-native";

export default function Register() {
  return (
    <ScrollView contentContainerStyle={styles.container}>
    
      
      <Text style={styles.title}>Register</Text>
      <StatusBar style="auto" />

     
      <TextInput style={styles.input} placeholder="Name" />
      <TextInput style={styles.input} placeholder="Email" keyboardType="email-address" />
      <TextInput style={styles.input} placeholder="Password" secureTextEntry />

     
      <Button title="Register" />
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
