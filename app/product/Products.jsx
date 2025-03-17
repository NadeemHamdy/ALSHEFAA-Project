import {Image ,StyleSheet, Text, View , Pressable } from 'react-native'
import React from 'react'
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { images } from '@/constants/images';
import { useLocalSearchParams } from "expo-router";
import { ThemedText } from '@/components/ThemedText';
import PressableVsButton from '@/components/PressableVsButton';
const Products = () => {
  const  { name ,price,  description,image   } = useLocalSearchParams();
  
  return (
   <ParallaxScrollView
        headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
        headerImage={
          <Image
            source={image}
            style={styles.reactLogo}
          />
        }>
        <Text style ={styles.titleContainer}>{name}  : </Text>
        <Text style ={styles.descriptionContainer}>{description} </Text>
        <Text style ={styles.priceContainer}>Price : {price} </Text>
       <Pressable 
               onPress={() => {
                 alert("title + message");
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
                 styles.wrapperCustom,
               ]}
             >
               {({ pressed }) => (
                 <Text style={styles.text}>{pressed ? "Pressed!" : "Buying"}</Text>
               )}
             </Pressable>
             
       
      </ParallaxScrollView>
    );
  }
  
  const styles = StyleSheet.create({
    descriptionContainer: {
      padding: 8,
      fontSize: 16,
      textAlign: 'center',
    },
    text: {
      fontSize: 15,
      color: "Grey",
      fontFamily:
        "Roboto",
      lineHeight: 18,
      letterSpacing: 0.2,
      textTransform: "uppercase",
      fontFamily: "Roboto",
      fontStyle: "normal",
      // fontWeight: "500",
    },
    priceContainer: {
      padding: 8,
      fontSize: 16,
      textAlign: 'center',
    },
    
    titleContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: 24,
      fontWeight: 'bold',
      marginTop: 0,
      padding: 0,
      
    },
    stepContainer: {
      gap: 8,
      marginBottom: 8,
    },
    reactLogo: {
   width: "100%",
   height : "100%",
    resizeMode: "stretch",
    },
  });
  export default Products;