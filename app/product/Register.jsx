"use client"

import { useState } from "react"
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView, Alert } from "react-native"
import { router } from "expo-router"
import { SafeAreaView } from "react-native-safe-area-context"
import { StatusBar } from "expo-status-bar"
import { TextInput, Button } from "../../components/ui"
import Colors from "../../constants/Colors2"

import { createUserWithEmailAndPassword } from "firebase/auth"; 
import { doc, setDoc, collection } from "firebase/firestore";

import { auth, db } from "../firebase";


export default function Register() {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [userType, setUserType] = useState("patient")
  const [medicalLicense, setMedicalLicense] = useState("");

  const handleRegister = async () => {
    if (!name || !email || !phone || !password || !confirmPassword) {
        Alert.alert("Registration Failed", "Please fill in all fields.");
        return;
    }
    if (password !== confirmPassword) {
        Alert.alert("Registration Failed", "Passwords do not match.");
        return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      const nameParts = name.trim().split(' ');
      const firstName = nameParts[0] || '';
      const lastName = nameParts.slice(1).join(' ') || '';

      const userData = {
        firstName: firstName,
        lastName: lastName,
        email: email,
        phone: phone,
        type: userType,
      };

      if (userType === "doctor") {
        userData.medicalLicense = medicalLicense;
      }

      await setDoc(doc(db, "user", user.uid), userData);

      Alert.alert("Success", "Account created successfully! Please log in.");
      router.replace("../product/Login");

    } catch (error) {
     

      let errorMessage = "An error occurred during registration.";
      if (error.code === 'auth/email-already-in-use') {
        errorMessage = "That email address is already in use!";
      } else if (error.code === 'auth/invalid-email') {
          errorMessage = "That email address is invalid.";
      } else if (error.code === 'auth/weak-password') {
          errorMessage = "Password should be at least 6 characters.";
      }

      Alert.alert("Registration Failed", errorMessage);
    }
  };

  const handleTabPress = (type) => {
      setUserType(type);
      if (type === 'patient') {
          setMedicalLicense('');
      }
  };


  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Image source={require("../Assets/logo.jpg")} style={styles.logo} resizeMode="contain" />
          <Text style={styles.title}>Create Account</Text>
        </View>

        <View style={styles.tabContainer}>
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
        </View>

        <View style={styles.form}>
          <TextInput label="Full Name" value={name} onChangeText={setName} placeholder="Enter your full name" />
          <TextInput
            label="Email"
            value={email}
            onChangeText={setEmail}
            placeholder="Enter your email"
            keyboardType="email-address"
            autoCapitalize="none"
          />
          <TextInput
            label="Phone Number"
            value={phone}
            onChangeText={setPhone}
            placeholder="Enter your phone number"
            keyboardType="phone-pad"
          />
          <TextInput
            label="Password"
            value={password}
            onChangeText={setPassword}
            placeholder="Create a password"
            secureTextEntry
          />
          <TextInput
            label="Confirm Password"
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            placeholder="Confirm your password"
            secureTextEntry
          />

          {userType === "doctor" && (
            <TextInput
                label="Medical License Number"
                value={medicalLicense}
                onChangeText={setMedicalLicense}
                placeholder="Enter your license number"
            />
          )}

          <Button onPress={handleRegister} title="Create Account" style={styles.button} />
        </View>

        <View style={styles.footer}>
          <Text style={styles.footerText}>Already have an account? </Text>
          <TouchableOpacity onPress={() => router.push("../product/Login")}>
            <Text style={styles.loginText}>Login</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
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
    marginTop: 10,
    marginBottom: 30,
  },
  logo: {
    width: 80,
    height: 80,
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
  button: {
    marginTop: 10,
  },
  footer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 30,
    marginBottom: 20,
  },
  footerText: {
    color: Colors.text,
    fontSize: 14,
  },
  loginText: {
    color: Colors.primary,
    fontSize: 14,
    fontWeight: "bold",
  },
});
