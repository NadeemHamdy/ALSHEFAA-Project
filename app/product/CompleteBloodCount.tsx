import {Image ,StyleSheet, Text, View } from 'react-native'
import React from 'react'
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { images } from '@/constants/images';
import { useLocalSearchParams } from "expo-router";

const CompleteBloodCount = () => {
  const { name ,price } = useLocalSearchParams();
  return (
   <ParallaxScrollView
        headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
        headerImage={
          <Image
            source={images.cpc}
            style={styles.reactLogo}
          />
        }>
        
       
      </ParallaxScrollView>
    );
  }
  
  const styles = StyleSheet.create({
    titleContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 8,
    },
    stepContainer: {
      gap: 8,
      marginBottom: 8,
    },
    reactLogo: {
      height: "100%",
      width: "100%",
      bottom: 0,
      left: 0,
      position: 'absolute',
    },
  });
  export default CompleteBloodCount;