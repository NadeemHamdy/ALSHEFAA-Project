import { StyleSheet, Text, View ,SafeAreaView,ScrollView} from 'react-native'
import React from 'react'
import SimpleScrollView from '@/components/SimpleScrollView'
import {images} from '@/constants/images'
import SearchBar from '@/components/SearchBar'
import {useState, useEffect} from 'react'
const Search = () => {
const Items = [
    {
      name   : "Complete Blood Count (CBC)",
      description: "Measures the number and types of cells in your blood.",
      price: 50,
      icon:  images.cpc,
      http : "/product/CompleteBloodCount",
    },
    {
      name: "Lipid Panel",
      description: "Checks cholesterol and triglyceride levels.",
      price: 75,
      icon:  images.lp,
      http : "/product/LipidPanel" ,
    },
    {
      name: "Urinalysis",
      description: "Analyzes the content and appearance of urine.",
      price: 30,
      icon: images.u,
      http : "/product/Urinalysis",
    },
    {
      name: "Basic Metabolic Panel (BMP)",
      description: "Measures glucose, electrolytes, kidney function, and calcium levels.",
      price: 60,
      icon:  images.pmb,
      http : "/product/BMP",
    },
    {
      name: "Thyroid Function Test (TFT)",
      description: "Evaluates how well your thyroid gland is working.",
      price: 80,
      icon: images.tft,
      http : "/product/TFT",
    },
    {
        name: "International Normalized Ratio (INR)",
        description: "A lab test that determines how long it takes for blood to clot. Price: 600. Fasting for 6-8 hours is preferred, and the test should be done in the morning.",
        icon: images.inr,
        http : "/product/INR",
      },
      {
        name: "Kidney Function Test (KFT)",
        description: "Kidney function test is useful for urine screening to detect blood and protein. KFT helps assess creatinine buildup in the bloodstream, as elevated levels may indicate kidney problems. Helps doctors diagnose factors associated with unexplained high blood pressure. Helps the test screen for underlying causes of obesity. Price: 300. Fasting for 6 hours is required.",
        icon: images.rft,
        http : "/product/KFT",
      },
      ,
{
name: "Liver Function  (LFTs)",
description: "Liver function tests are blood tests used to help find the cause of symptoms, monitor liver disease, or assess liver damage. Tests measure levels of certain enzymes and proteins in the blood. Some tests measure how well the liver performs its normal functions of producing protein and clearing bilirubin, a blood waste product. Price: 250. Fasting for 8-12 hours is required.",
icon: images.lft,
http : "/product/LFT",
},
  ];
  const [searchQuery, setSearchQuery] = useState("");

  

  const handleSearch = (text: string) => {
    setSearchQuery(text);
  };

  // Debounced search effect
  

   

  return (
    <SafeAreaView  style={styles.container}>
    <ScrollView >
   <View style={styles.SearchBar}>
   <SearchBar placeholder=" Search for a Test"
      value={searchQuery}
      onChangeText={handleSearch}
      onPress={() => console.log("Search button pressed!")} />
      </View>
      <SimpleScrollView items={Items}></SimpleScrollView>
      </ScrollView>
      </SafeAreaView>
  )
}

export default Search

const styles = StyleSheet.create({
  SearchBar : {
  paddingTop: 80,
  padding: 5,
  fontSize: 29,
  fontWeight: "bold",
  textAlign: "center",
},
container: {
  flex: 1,
  backgroundColor: "#fff",
  alignItems: "stretch",
  justifyContent: "flex-start",
 
},
})