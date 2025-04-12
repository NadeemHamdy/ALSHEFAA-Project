import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, TextInput, Button, Image } from "react-native";
import {images} from '@/constants/images'
export default function Login() {
  return (
    <View style={styles.container}>
    
      <Image source={images.login} style={styles.image} />
      <Text style={styles.title}>Open sign up</Text>
      <StatusBar style="auto" />

      <TextInput style={styles.input} placeholder="Email" />
      <TextInput style={styles.input} placeholder="Password" secureTextEntry />

      <Button title="Sign Up" />

      <Text style={styles.label}>Already have an account? Sign in</Text>
      <Button title="Sign In" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#123",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  image: {
    width: 400, 
    height: 500,
    marginBottom: 20,
    marginTop: 500, 
    
  },
  title: {
    fontSize: 20,
    color: "blue",
    fontWeight: "bold",
    marginBottom: 10,
  },
  label: {
    alignSelf: "flex-start",
    fontSize: 16,
    marginBottom: 5,
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