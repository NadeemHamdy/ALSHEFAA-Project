import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, TextInput, Button, Pressable, Image } from "react-native";
import auth from '../firebase';
import {useState} from 'react';
import {  signInWithEmailAndPassword } from "firebase/auth";
import {Link } from "expo-router";
import { useRouter } from "expo-router";


  

export default function Login() {

  const router = useRouter();
  const [Email,setEmail]=useState('')
    const [Password,setPasword]=useState('')
    const [login,setLogin]=useState(false)

   
      const handlePress =  (login) => {
        router.push({
          pathname: "/",
          params: { isLogin : login },
        });
        
      };

    const handleLogin=()=>{
      signInWithEmailAndPassword(auth, Email, Password)
      .then((userCredential) => {
       console.log("done");
        const user = userCredential.user;
        setLogin(true)
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorMessage);
        alert("the email or password is incorrect")
      });
      }
     
      if(login){
        handlePress(login)
        return(
          
          <View style={styles.container2}>
           
          <Text style={styles.title}>Welcome back</Text>
          <Link href="/" style={{  marginTop: 20, }}>
        <Text style={styles.label}>Go to Home</Text>
        
      </Link>

      <Pressable 
               onPress={() => {
                setLogin(false)
                  
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
                 <Text style={styles.text}>{pressed ? "Pressed!" : "Logout"}</Text>
               )}
             </Pressable>
          </View>
        )}



  return (

     <View style={styles.container2}>
      <View style={styles.container}>
      //<Image source={require("../Assets/images/images.jpeg")} style={styles.image} />
      <Text style={styles.title}>log in to Alshefaa</Text>
      <StatusBar style="auto" />

      <TextInput style={styles.input} placeholder="Email" value={Email} onChangeText={setEmail}/>
      <TextInput style={styles.input} placeholder="Password"value={Password} onChangeText={setPasword} secureTextEntry  />
      <Pressable 
               onPress={() => {
                  handleLogin()
                  
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
                 <Text style={styles.text}>{pressed ? "Pressed!" : "Login"}</Text>
               )}
             </Pressable>
      <Link href="../product/Register" style={{  marginTop: 20, }}>
        <Text style={styles.label}>Create a new account</Text>
      </Link>
      </View>
      </View>
      
   
  );
}

const styles = StyleSheet.create({
  container: {

    flex: 1,
    backgroundColor: "#ffff",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 25,
    borderRadius: "5%",
    width :"90%",
    maxHeight :"60%",
  },
  container2: {
    flex: 1,
    backgroundColor: 'rgb(233, 230, 230)',
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  image: {
    width: "100%", 
    height: 120,
    borderRadius: 10,
    marginBottom: 20,
    //marginBottom: 0,
    // margintop:200,
    alignItems: "center",
    
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
  title: {
    fontSize: 20,
    color: "#1234567",
    fontWeight: "bold",
    marginBottom: 20,
  
  },
  label: {
    alignSelf: "flex-start",
    fontSize: 16,
    marginBottom: 5,
    color: "blue",
    fontWeight: "bold",
    // textDecorationLine: "underline",
    textAlign: "center",
    textTransform: "uppercase",
    fontFamily: "Roboto",
    fontStyle: "normal",
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
  text: {
    fontSize: 18,
    color: "white",
    fontFamily:
      "Roboto",
    fontStyle: "normal",
    fontWeight: "500",

  },
});