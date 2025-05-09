import React, { useState, useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, TextInput, TouchableOpacity, ScrollView, SafeAreaView } from "react-native";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from '../firebase';
import { Link, useRouter } from "expo-router";
import { icons } from '@/constants/icons';
import Profile from "@/components/Profile";

export default function Register() {
  const [Email, setEmail] = useState('');
  const [Password, setPassword] = useState('');
  const [login, setLogin] = useState(false);
  const router = useRouter();

  const handleRegister = async () => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, Email, Password);
      console.log("Registration successful");
      const user = userCredential.user;
    } catch (error) {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log("Registration error:", errorMessage);
      alert("Registration failed: " + errorMessage);
    }
  };

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setLogin(!!user);
    });
    return () => unsubscribe();
  }, []);

  if(login) {
    return(
      router.push("/"),
      <Profile></Profile>
    );
  }

  return (
    <SafeAreaView style={styles.container2}>
      <ScrollView 
        contentContainerStyle={styles.container}
        keyboardShouldPersistTaps="handled"
      >
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
        <TouchableOpacity 
          onPress={handleRegister}
          style={styles.Button}
          activeOpacity={0.7}
        >
          <Text style={styles.text}>Create Account</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          onPress={() => router.push('../')}
          style={styles.loginLink}
        >
          <Text style={styles.label}>Already have an account? Login</Text>
        </TouchableOpacity>
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
    width: '100%',
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
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    fontSize: 18,
    color: "white",
    fontFamily: "Roboto",
    fontStyle: "normal",
    fontWeight: "500",
  },
  loginLink: {
    marginTop: 20,
    width: "100%",
    alignItems: "center",
  },
  label: {
    fontSize: 14,
    color: "blue",
    fontWeight: "bold",
    textAlign: "center",
    textTransform: "uppercase",
    fontFamily: "Roboto",
    fontStyle: "normal",
  },
});