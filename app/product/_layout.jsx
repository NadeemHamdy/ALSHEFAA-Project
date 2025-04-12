import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Link, Stack } from 'expo-router';
import { useLocalSearchParams } from "expo-router";
const ProductLayOut = () => {
  const { name } = useLocalSearchParams();
  
  return (
   <Stack>
      <Stack.Screen name="Products" options={{ title:name,  }} />
      <Stack.Screen name="Register"  options={{ headerShown: false , }} />
     
   </Stack>
  )
}

export default ProductLayOut;

const styles = StyleSheet.create({})