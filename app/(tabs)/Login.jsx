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
    
      //<Image source={require("../Assets/images/images.jpeg")} style={styles.image} />
      <Text style={styles.title}>log in to Alshefaa</Text>
      <StatusBar style="auto" />

      <TextInput style={styles.input} placeholder="Email" value={Email} onChangeText={setEmail}/>
      <TextInput style={styles.input} placeholder="Password"value={Password} onChangeText={setPasword} secureTextEntry  />

      <Button title="log in"onPress={handleLogin} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1234",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 25,
  },
  image: {
    width: 200, 
    height: 120,
    //marginBottom: 0,
    // margintop:200,
    alignItems: "center",
    
  },
  title: {
    fontSize: 20,
    color: "#1234567",
    fontWeight: "bold",
    marginBottom: 5,
  
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
    marginBottom: 10,
  },
});