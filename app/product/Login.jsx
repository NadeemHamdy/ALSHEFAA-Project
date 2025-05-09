"use client"

import { useState } from "react"
import { View, Text, StyleSheet, TouchableOpacity, Image, Alert } from "react-native"
import { router } from "expo-router"
import { SafeAreaView } from "react-native-safe-area-context"
import { StatusBar } from "expo-status-bar"
import { Button } from "@/components/ui/"
import { TextInput } from "@/components/ui/"
import Colors from "../../constants/Colors2"
import { signInWithEmailAndPassword } from "firebase/auth"
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "../firebase";

export default function Login() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [userType, setUserType] = useState("patient");

  const handleLogin = async () => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      const userDocRef = doc(db, "user", user.uid);
      const userDocSnap = await getDoc(userDocRef);

      if (userDocSnap.exists()) {
        const userData = userDocSnap.data();
        const fetchedUserType = userData.type;

        if (fetchedUserType === "patient") {
         router.replace("/(pationt)/indexp");
        } else if (fetchedUserType === "doctor") {
          
           router.replace("/(doctor)/indexd");
        } else {
          Alert.alert("Login Failed", "Unknown user type in database.");
        }
      } else {
        Alert.alert("Login Failed", "User data not found in database.");
      }

    } catch (error) {
    

      let errorMessage = "An error occurred during login.";
      if (error.code === 'auth/user-not-found' || error.code === 'auth/wrong-password') {
        errorMessage = "Invalid email or password.";
      } else if (error.code === 'auth/invalid-email') {
          errorMessage = "Invalid email format.";
      }

      Alert.alert("Login Failed", errorMessage);
    }
  };

  const handleTabPress = (type) => {
      setUserType(type);
  };


  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" />
      <View style={styles.header}>
        <Image source={require("../Assets/logo.jpg")} style={styles.logo} resizeMode="contain" />
        <Text style={styles.title}>Medical Lab App</Text>
      </View>

      {/* <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[styles.tab, userType === "patient" && styles.activeTab]}
          onPress={() => handleTabPress("patient")}
        >
          <Text style={[styles.tabText, userType === "patient" && styles.activeTabText]}>Patient</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, userType === "doctor" && styles.activeTab]}
          onPress={() => handleTabPress("doctor")}
        >
          <Text style={[styles.tabText, userType === "doctor" && styles.activeTabText]}>Doctor</Text>
        </TouchableOpacity>
      </View> */}

      <View style={styles.form}>
        <TextInput
          label="Email"
          value={email}
          onChangeText={setEmail}
          placeholder="Enter your email"
          keyboardType="email-address"
          autoCapitalize="none"
        />
        <TextInput
          label="Password"
          value={password}
          onChangeText={setPassword}
          placeholder="Enter your password"
          secureTextEntry
        />
        <TouchableOpacity style={styles.forgotPassword}>
          <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
        </TouchableOpacity>
        <Button onPress={handleLogin} title="Login" />
      </View>

      <View style={styles.footer}>
        <Text style={styles.footerText}>Don't have an account? </Text>
        <TouchableOpacity onPress={() => router.push("../product/Register")}>
          <Text style={styles.signupText}>Sign Up</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 20,
  },
  header: {
    alignItems: "center",
    marginTop: 20,
    marginBottom: 40,
  },
  logo: {
    width: 100,
    height: 100,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: Colors.primary,
    marginTop: 10,
  },
  tabContainer: {
    flexDirection: "row",
    marginBottom: 30,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: Colors.border,
    overflow: "hidden",
  },
  tab: {
    flex: 1,
    paddingVertical: 12,
    alignItems: "center",
  },
  activeTab: {
    backgroundColor: Colors.primary,
  },
  tabText: {
    fontSize: 16,
    fontWeight: "500",
    color: Colors.text,
  },
  activeTabText: {
    color: "#fff",
  },
  form: {
    gap: 16,
  },
  forgotPassword: {
    alignSelf: "flex-end",
    marginBottom: 10,
  },
  forgotPasswordText: {
    color: Colors.primary,
    fontSize: 14,
  },
  footer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 40,
  },
  footerText: {
    color: Colors.text,
    fontSize: 14,
  },
  signupText: {
    color: Colors.primary,
    fontSize: 14,
    fontWeight: "bold",
  },
});
