import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, TextInput, Button, Pressable, Image,SafeAreaView,ScrollView } from "react-native";
import auth from '../firebase';
import {useState , useEffect} from 'react';
import {  signInWithEmailAndPassword } from "firebase/auth";
import {Link } from "expo-router";
import { useRouter } from "expo-router";
import Profile from "@/components/Profile";



  

export default function Login() {

  
   const [Email,setEmail]=useState('')
   const [Password,setPasword]=useState('')
   const [login,setLogin]=useState(false)
   const router = useRouter()
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setLogin(!!user);
    });
    return () => unsubscribe();
  }, []);
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
       
        return(
          router.push("/"),
         <Profile></Profile>
        )}



  return (

       <SafeAreaView style={styles.container2}>
         <ScrollView contentContainerStyle={styles.container}>
      <Image source={require("../Assets/images/images.jpeg")} style={styles.image} />
      <Text style={styles.title}>Login to Alshefaa</Text>
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
       
           </ScrollView >
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
      alignItems: "center",
      flexDirection: "column",
      justifyContent: "space-between",
      backgroundColor: "#ffff",
      borderRadius: 10,
      minWidth : "90%",
      
     
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