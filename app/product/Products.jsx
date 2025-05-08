import { StyleSheet, Text, View, Pressable, Image } from 'react-native';
import React, { useEffect, useState } from 'react';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { useLocalSearchParams, useRouter } from "expo-router";
import { images } from '@/constants/images';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getAuth } from 'firebase/auth';

const Products = () => {
  const { icon, name, price, description } = useLocalSearchParams();
  const imageSource = images[icon];
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const user = getAuth().currentUser;
    if (user) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, []);

  const addToCart = async () => {
    if (!isLoggedIn) {
      alert("Please log in to add items to the cart!");
      return;
    }

    try {
      let cart = await AsyncStorage.getItem('cart');
      cart = cart ? JSON.parse(cart) : [];

      const index = cart.findIndex(item => item.name === name);
      if (index !== -1) {
        cart[index].quantity += 1;
      } else {
        cart.push({ name, price, description, icon, quantity: 1 });
      }

      await AsyncStorage.setItem('cart', JSON.stringify(cart));
      alert("✅ Added to Cart");
    } catch (e) {
      console.error('Error adding to cart:', e);
    }
  };

  const goToCart = () => {
    router.push('/cart'); // Navigation to Cart page
  };

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
      headerImage={<Image source={imageSource} style={styles.reactLogo} />}
    >
      <Text style={styles.titleContainer}>{name}:</Text>
      <Text style={styles.descriptionContainer}>{description}</Text>
      <Text style={styles.priceContainer}>Price: {price}</Text>

      <Pressable
        onPress={addToCart}
        style={({ pressed }) => [
          styles.addButton,
          { opacity: pressed ? 0.7 : 1 },
        ]}
      >
        <Text style={styles.text}>Add to Cart</Text>
      </Pressable>

      <Pressable
        onPress={goToCart}
        style={({ pressed }) => [
          styles.viewCartButton,
          { opacity: pressed ? 0.7 : 1 },
        ]}
      >
        <Text style={styles.text}>Go to Cart</Text>
      </Pressable>
    </ParallaxScrollView>
  );
};

const styles = StyleSheet.create({
  descriptionContainer: {
    padding: 8,
    fontSize: 16,
    textAlign: 'center',
  },
  priceContainer: {
    padding: 8,
    fontSize: 16,
    textAlign: 'center',
  },
  titleContainer: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 20,
  },
  reactLogo: {
    width: '100%',
    height: 200,
    resizeMode: 'contain',
  },
  addButton: {
    backgroundColor: "#2196F3",
    padding: 12,
    borderRadius: 10,
    margin: 20,
    alignItems: 'center',
  },
  text: {
    color: "#fff",
    fontSize: 16,
    fontWeight: 'bold',
  },
  viewCartButton: {
    backgroundColor: "#FF5722", // Different color for the "Go to Cart" button
    padding: 12,
    borderRadius: 10,
    margin: 20,
    alignItems: 'center',
  },
});

export default Products;
