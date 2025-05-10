import { StyleSheet, Text, View, SafeAreaView, ScrollView } from 'react-native';
import React, { useEffect, useState } from 'react';
import SimpleScrollView from '@/components/SimpleScrollView';
import { images } from '@/constants/images';
import SearchBar from '@/components/SearchBar';
import { db } from '../firebase'; // firebase.js
import { collection, getDocs } from 'firebase/firestore';

const Search = () => {
  const [products, setProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  const fetchProducts = async () => {
    const snapshot = await getDocs(collection(db, 'products'));
    const list = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    setProducts(list);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleSearch = (text) => {
    setSearchQuery(text);
  };

  const filteredItems = products.filter(item =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.SearchBar}>
        <SearchBar
          placeholder="Search for a Test"
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
    fontWeight: 'bold',
    textAlign: 'center',
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'stretch',
    justifyContent: 'flex-start',
  },
});
