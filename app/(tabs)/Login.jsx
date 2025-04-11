import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, TextInput, Button, Image } from "react-native";
import auth from '../firebase';
import {useState} from 'react';
import {  signInWithEmailAndPassword } from "firebase/auth";

export default function Login() {
  const [Email,setEmail]=useState('')
    const [Password,setPasword]=useState('')
    const handleLogin=()=>{
      signInWithEmailAndPassword(auth, Email, Password)
      .then((userCredential) => {
       console.log("done");
        const user = userCredential.user;
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorMessage);
      });
      }
  return (
    <View style={styles.container}>
    
      <Image source={require("../Assets/images/images.jpeg")} style={styles.image} />
      <Text style={styles.title}>Open sign up</Text>
      <StatusBar style="auto" />

      <TextInput style={styles.input} placeholder="Email" value={Email} onChangeText={setEmail}/>
      <TextInput style={styles.input} placeholder="Password"value={Password} onChangeText={setPasword} secureTextEntry  />

      <Button title="Sign in"onPress={handleLogin} />
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
    height: 300,
    marginBottom: 20,
    marginTop: 500, 
    alignItems: "center",
    
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