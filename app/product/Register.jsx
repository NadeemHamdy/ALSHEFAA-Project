import React, { useState,useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, TextInput, Pressable, ScrollView, SafeAreaView } from "react-native";
import {  createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from '../firebase';
import { Link, useRouter } from "expo-router";
import { icons } from '@/constants/icons';
import Profile from "@/components/Profile";

export default function Register() {
 const [Email, setEmail] = useState('');
 const [Password, setPassword] = useState('');

 const handleRegister = async () => {
   try {
     const userCredential = await createUserWithEmailAndPassword(auth, Email, Password);
     console.log("Registration successful");
     const user = userCredential.user;
   } catch (error) {
     const errorCode = error.code;
     const errorMessage = error.message;
     console.log("Registration error:", errorMessage);
   }
 };

 const [login,setLogin]=useState(false)
 const router = useRouter()
 useEffect(() => {
   const unsubscribe = auth.onAuthStateChanged((user) => {
     setLogin(!!user);
   });
   return () => unsubscribe();
 }, []);

 if(login){
   return(
     router.push("/"),
     <Profile></Profile>
   )
 }

 return (
   <SafeAreaView style={styles.container2}>
     <ScrollView contentContainerStyle={styles.container}>
       <StatusBar style="auto" />
       <Text style={styles.title}>Create a new account</Text>
       <TextInput
         style={styles.input}
         placeholder="Email"
         value={Email}
         onChangeText={setEmail}
         keyboardType="email-address"
         autoCapitalize="none"
       />
       <TextInput
         style={styles.input}
         placeholder="Password"
         value={Password}
         onChangeText={setPassword}
         secureTextEntry
       />
       <Pressable 
         onPress={() => {
           handleRegister()
         }}
         style={({ pressed }) => [
           {
             backgroundColor: "rgb(33, 150, 243)",
             opacity: pressed ? 0.5 : 1,
             borderRadius: 8,
             padding: 10,
             alignItems: "center",
             justifyContent: "center",
             alignContent: "center",
           },
           styles.Button,
         ]}
       >
         {({ pressed }) => (
           <Text style={styles.text}>{pressed ? "Pressed!" : "Create"}</Text>
         )}
       </Pressable>
       <Link href="../" style={{ marginTop: 20, width: "100%" }}>
         <Text style={styles.label}>Already have an account? Login</Text>
       </Link>
     </ScrollView>
   </SafeAreaView>
 );
}

const styles = StyleSheet.create({
  container2: {
    flex: 1,
    backgroundColor: 'rgb(212, 211, 211)',
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
    paddingTop: "50%",
  },
  container: {
    padding: 25,
    flexDirection: "column",
    justifyContent: "space-between",
    backgroundColor: "#ffff",
    borderRadius: 10,
  },
  title: {
    fontSize: 24,
    color: "#333",
    fontWeight: "bold",
    marginBottom: 30,
    textAlign: "center",
    fontFamily: "Roboto",  
  },
  input: {
    width: "100%",
    height: 50,
    borderWidth: 1,
    borderColor: "#ccc",
    paddingHorizontal: 10,
    borderRadius: 5,
    backgroundColor: "#fff",
    marginBottom: 15,
  },
  Button: {
    width: "100%",
    height: 50,
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    borderRadius: 5,
    backgroundColor: "rgb(33, 150, 243)",
    marginBottom: 10,
  },
  text: {
    fontSize: 18,
    color: "white",
    fontFamily: "Roboto",
    fontStyle: "normal",
    fontWeight: "500",
  },
  label: {
    alignSelf: "flex-start",
    fontSize: 11.3,
    marginBottom: 5,
    color: "blue",
    fontWeight: "bold",
    textAlign: "center",
    textTransform: "uppercase",
    fontFamily: "Roboto",
    fontStyle: "normal",
  },
});