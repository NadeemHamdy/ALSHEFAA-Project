import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Link, Stack } from 'expo-router';
import { useLocalSearchParams } from "expo-router";
const ProductLayOut = () => {
  const { name } = useLocalSearchParams();
  
  return (
   <Stack>
      <Stack.Screen name="CompleteBloodCount" options={{ title:name,  }} />
      <Stack.Screen name="LipidPanel" options={{ title:name,  }} />
      <Stack.Screen name="Urinalysis" options={{ title:"Urinalysis",  }} />
      <Stack.Screen name="BMP" options={{ title:"Basic Metabolic Panel",  }} />
      <Stack.Screen name="TFT" options={{ title:"Thyroid Function Test",  }} />
      <Stack.Screen name="KFT" options={{ title:"Kidney Function Test",  }} />
      <Stack.Screen name="LFT" options={{ title:"Liver Function Test",  }} />
      <Stack.Screen name="INR" options={{ title:"International Normalized Ratio",  }} />
   </Stack>
  )
}

export default ProductLayOut;

const styles = StyleSheet.create({})