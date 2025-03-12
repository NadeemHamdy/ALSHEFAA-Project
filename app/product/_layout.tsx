import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Link, Stack } from 'expo-router';
const ProductLayOut = () => {
  return (
   <Stack>
      <Stack.Screen name="CompleteBloodCount" options={{ title:"CompleteBlood",  }} />
   </Stack>
  )
}

export default ProductLayOut;

const styles = StyleSheet.create({})