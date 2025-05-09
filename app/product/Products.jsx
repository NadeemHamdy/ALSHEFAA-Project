import { StyleSheet, Text, View, Pressable, Image, Dimensions } from 'react-native';
import React, { useEffect, useState } from 'react';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { useLocalSearchParams, useRouter } from "expo-router";
import { images } from '@/constants/images';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getAuth } from 'firebase/auth';
import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';

const { width } = Dimensions.get('window');

const Products = () => {
  const { icon, name, price, description } = useLocalSearchParams();
  const imageSource = images[icon];
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const user = getAuth().currentUser;
    setIsLoggedIn(!!user);
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
    router.push('/cart');
  };

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
      headerImage={
        <View style={styles.imageContainer}>
          <View style={styles.imageWrapper}>
            <Image source={imageSource} style={styles.productImage} />
          </View>
        </View>
      }
    >
      <ThemedView style={styles.container}>
        <ThemedText type="title" style={styles.title}>{name}</ThemedText>

        <ThemedView style={styles.priceContainer}>
          <ThemedText type="subtitle" style={styles.price}>${price}</ThemedText>
        </ThemedView>

        <ThemedView style={styles.descriptionContainer}>
          <ThemedText type="subtitle" style={styles.descriptionTitle}>Description</ThemedText>
          <ThemedText style={styles.description}>{description}</ThemedText>
        </ThemedView>

        <ThemedView style={styles.buttonContainer}>
          <Pressable
            onPress={addToCart}
            style={({ pressed }) => [
              styles.addButton,
              { opacity: pressed ? 0.7 : 1 },
            ]}
          >
            <ThemedText style={styles.buttonText}>Add to Cart</ThemedText>
          </Pressable>

          <Pressable
            onPress={goToCart}
            style={({ pressed }) => [
              styles.viewCartButton,
              { opacity: pressed ? 0.7 : 1 },
            ]}
          >
            <ThemedText style={styles.buttonText}>View Cart</ThemedText>
          </Pressable>
        </ThemedView>
      </ThemedView>
    </ParallaxScrollView>
  );
};

export default Products;

const styles = StyleSheet.create({
  imageContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  imageWrapper: {
    borderRadius: 15,
    overflow: 'hidden',
  },
  productImage: {
    height: 200,
    width: width - 40,
    resizeMode: 'contain',
  },
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  priceContainer: {
    marginBottom: 20,
  },
  price: {
    fontSize: 25,
    color: '#1D3D47',
  },
  descriptionContainer: {
    marginBottom: 20,
  },
  descriptionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  description: {
    fontSize: 16,
    color: '#333',
  },
  buttonContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
  addButton: {
    backgroundColor: '#1D3D47',
    padding: 15,
    borderRadius: 10,
    width: '100%',
    alignItems: 'center',
  },
  viewCartButton: {
    marginTop: 10,
    backgroundColor: '#A1CEDC',
    padding: 15,
    borderRadius: 10,
    width: '100%',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
  },
});
