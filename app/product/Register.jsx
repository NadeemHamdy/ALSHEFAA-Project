import React, { useState,useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, TextInput, Pressable, ScrollView, Image,SafeAreaView  } from "react-native";
import {  createUserWithEmailAndPassword } from "firebase/auth";
import {auth} from '../firebase';
import { Link ,useRouter} from "expo-router";
import * as ImagePicker from 'expo-image-picker';
import { storage } from '../firebase';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { icons } from '@/constants/icons';
import Profile from "@/components/Profile";


export default function Register() {
 const [Email, setEmail] = useState('');
 const [Password, setPassword] = useState('');
 const [image, setImage] = useState(null);

  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      alert('Sorry, we need camera roll permissions to make this work!');
      return;
    }

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect:[4,7],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const handleRegister = async () => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, Email, Password);
      console.log("Registration successful");
      const user = userCredential.user;

      if (user && image) {
        const storageRef = ref(storage, `users/${user.uid}/profileImage`);
        const response = await fetch(image);
        const blob = await response.blob();

        const uploadTask = uploadBytesResumable(storageRef, blob);

        uploadTask.on('state_changed',
          (snapshot) => {
            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log('Upload is ' + progress + '% done');
          },
          (error) => {
            console.error("Error uploading image:", error);
          },
          async () => {
            const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
            console.log('Image URL: ', downloadURL);

          }
        );
      }

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
    )}
  return (
   <SafeAreaView style={styles.container2}>
     <ScrollView contentContainerStyle={styles.container}>

        <StatusBar style="auto" />

           <Pressable onPress={pickImage} style={styles.imagePickerContainer}>
            {image ? (
            <Image source={{ uri: image }} style={styles.profileImage} />
           ) : (
           <View style={styles.placeholderImage}>
            <Image style={styles.placeholderImage} source={icons.login}></Image>
           </View>
            )}
         </Pressable>
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
        <Link href="../" style={{ marginTop: 20,width: "100%", }}>
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
  fontFamily:
    "Roboto",
  fontStyle: "normal",
  fontWeight: "500",
 

},
label: {
  alignSelf: "flex-start",
  fontSize: 11.3,
  marginBottom: 5,
  color: "blue",
  fontWeight: "bold",
  // textDecorationLine: "underline",
  textAlign: "center",
  textTransform: "uppercase",
  fontFamily: "Roboto",
  fontStyle: "normal",

},
  imagePickerContainer: {
    marginBottom: 20,
    alignItems: 'center',
    justifyContent: 'center',
   
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    
  },
  placeholderImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: 'lightgray',
    alignItems: 'center',
    justifyContent: 'center',
   
  },
  placeholderText: {
    fontSize: 16,
    fontWeight: 'bold',
   
  },
});