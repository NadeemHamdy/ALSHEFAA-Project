import { StyleSheet, Text, View, SafeAreaView, ScrollView } from 'react-native'
import React, { useState } from 'react'
import SimpleScrollView from '@/components/SimpleScrollView'
import { images } from '@/constants/images'
import SearchBar from '@/components/SearchBar'

const Search = () => {
  const Items = [
    {
      name: "Complete Blood Count (CBC)",
      description: "Measures the number and types of cells in your blood.",
      price: 50,
      icon: images.cpc,
      http: "/product/Products",
    },
    {
      name: "Lipid Panel",
      description: "Checks cholesterol and triglyceride levels.",
      price: 75,
      icon: images.lp,
      http: "/product/LipidPanel",
    },
    {
      name: "Urinalysis",
      description: "Analyzes the content and appearance of urine.",
      price: 30,
      icon: images.u,
      http: "/product/Urinalysis",
    },
    {
      name: "Basic Metabolic Panel (BMP)",
      description: "Measures glucose, electrolytes, kidney function, and calcium levels.",
      price: 60,
      icon: images.pmb,
      http: "/product/BMP",
    },
    {
      name: "Thyroid Function Test (TFT)",
      description: "Evaluates how well your thyroid gland is working.",
      price: 80,
      icon: images.tft,
      http: "/product/TFT",
    },
    {
      name: "International Normalized Ratio (INR)",
      description: "A lab test that determines how long it takes for blood to clot.",
      price: 80,
      icon: images.inr,
      http: "/product/INR",
    },
    {
      name: "Kidney Function Test (KFT)",
      description: "Kidney function test helps assess creatinine buildup in the bloodstream.",
      price: 80,
      icon: images.rft,
      http: "/product/KFT",
    },
    {
      name: "Liver Function  (LFTs)",
      description: "Liver function tests measure enzyme and protein levels to assess liver health.",
      price: 80,
      icon: images.lft,
      http: "/product/LFT",
    },
  ];

  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (text) => {
    setSearchQuery(text);
  };

  const filteredItems = Items.filter(item =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.SearchBar}>
        <SearchBar
          placeholder=" Search for a Test"
          value={searchQuery}
          onChangeText={handleSearch}
        />
      </View>
      <SimpleScrollView items={filteredItems} />
    </SafeAreaView>
  );
};

export default Search;

const styles = StyleSheet.create({
  SearchBar: {
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
});
