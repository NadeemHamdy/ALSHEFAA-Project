import { View, Text, StyleSheet, TouchableOpacity, Image, SafeAreaView } from "react-native"
import { StatusBar } from "expo-status-bar"
import { router } from "expo-router"
import Colors from "@/constants/Colors2"

export default function HomeScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" />

      <View style={styles.content}>
        <Image source={require("../Assets/logo.jpg")} style={styles.logo} resizeMode="contain" />

        <Text style={styles.title}>Welcome to Medical Lab</Text>
        <Text style={styles.subtitle}>Your health journey starts here</Text>

        <View style={styles.imageContainer}>
          <Image source={require("../Assets/images/images.jpeg")} style={styles.welcomeImage} resizeMode="contain" />
        </View>

        <Text style={styles.description}>
          Access your lab results, schedule appointments, and chat with medical professionals all in one place.
        </Text>

        <View style={styles.buttonContainer}>
           <TouchableOpacity style={[styles.button, styles.primaryButton]}
           onPress={() =>    router.push("../product/Login")}>
            <Text style={styles.primaryButtonText}>Sign In</Text>
          </TouchableOpacity> 

          <TouchableOpacity
            style={[styles.button, styles.secondaryButton]}
             onPress={() =>  router.push("../product/Register")}
          >
            <Text style={styles.secondaryButtonText}>Create Account</Text>
          </TouchableOpacity>
        
        </View>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
   paddingTop: 60,
    marginTop: 20,
    paddingBottom: 55,
    flex: 1,
    backgroundColor: "#fff",
  },
  content: {
    flex: 1,
    padding: 24,
    alignItems: "center",
    justifyContent: "center",
  },
  logo: {
    width: 100,
    height: 100,
    marginBottom: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: Colors.primary,
    textAlign: "center",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 18,
    color: Colors.textLight,
    textAlign: "center",
    marginBottom: 40,
  },
  imageContainer: {
    width: "100%",
    height: 250,
    marginBottom: 20,
    borderRadius: "12%",
  },
  welcomeImage: {
    width: "100%",
    height: "100%",
    
  },
  description: {
    fontSize: 16,
    color: Colors.text,
    textAlign: "center",
    marginBottom: 40,
    lineHeight: 24,
  },
  buttonContainer: {
    width: "100%",
    gap: 16,
  },
  button: {
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  primaryButton: {
    backgroundColor: Colors.primary,
  },
  primaryButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  secondaryButton: {
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: Colors.primary,
  },
  secondaryButtonText: {
    color: Colors.primary,
    fontSize: 16,
    fontWeight: "600",
  },
})
