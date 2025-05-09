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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  imageContainer: {
    width: '100%',
    height: 300,
    backgroundColor: '#A1CEDC',
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  imageWrapper: {
    width: width * 0.9,
    height: 250,
    backgroundColor: '#fff',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
    padding: 10,
  },
  productImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 20,
    marginBottom: 10,
    color: '#1D3D47',
  },
  priceContainer: {
    backgroundColor: '#A1CEDC',
    padding: 15,
    borderRadius: 15,
    marginVertical: 15,
    alignItems: 'center',
  },
  price: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1D3D47',
  },
  descriptionContainer: {
    backgroundColor: 'rgba(161, 206, 220, 0.1)',
    padding: 20,
    borderRadius: 15,
    marginVertical: 15,
  },
  descriptionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#1D3D47',
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
    color: '#1D3D47',
  },
  buttonContainer: {
    marginTop: 20,
    gap: 15,
  },
  addButton: {
    backgroundColor: '#1D3D47',
    padding: 15,
    borderRadius: 12,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  viewCartButton: {
    backgroundColor: '#A1CEDC',
    padding: 15,
    borderRadius: 12,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default Products;
