import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, Pressable } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getFirestore, collection, addDoc } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [total, setTotal] = useState(0);

  const loadCart = async () => {
    const data = await AsyncStorage.getItem('cart');
    const items = data ? JSON.parse(data) : [];
    setCartItems(items);
    calculateTotal(items);
  };

  useEffect(() => {
    loadCart();
  }, []);

  const saveCart = async (items) => {
    setCartItems(items);
    await AsyncStorage.setItem('cart', JSON.stringify(items));
    calculateTotal(items);
  };

  const calculateTotal = (items) => {
    const total = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    setTotal(total);
  };

  const increaseQty = (name) => {
    const newCart = cartItems.map(item =>
      item.name === name ? { ...item, quantity: item.quantity + 1 } : item
    );
    saveCart(newCart);
  };

  const decreaseQty = (name) => {
    const newCart = cartItems
      .map(item =>
        item.name === name ? { ...item, quantity: item.quantity - 1 } : item
      )
      .filter(item => item.quantity > 0);
    saveCart(newCart);
  };

  const removeItem = (name) => {
    const newCart = cartItems.filter(item => item.name !== name);
    saveCart(newCart);
  };

  const saveOrderToFirestore = async (cartItems, totalAmount) => {
    const db = getFirestore();
    const user = getAuth().currentUser;

    if (user) {
      try {
        // إعداد بيانات الطلب
        const orderData = {
          userId: user.uid,
          items: cartItems.map(item => ({
            name: item.name,
            price: item.price,
            quantity: item.quantity,
            totalPrice: item.price * item.quantity,
          })),
          totalAmount: totalAmount,
          orderDate: new Date(),
          status: 'Pending',
        };

        // إضافة الطلب إلى Firestore
        const docRef = await addDoc(collection(db, 'orders'), orderData);
        console.log('Order saved with ID:', docRef.id);
      } catch (e) {
        console.error('Error adding order: ', e);
      }
    } else {
      console.log('User is not authenticated.');
    }
  };

  const handleCheckout = () => {
    saveOrderToFirestore(cartItems, total);
    alert('Order placed successfully!');
  };

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <Text style={styles.name}>{item.name}</Text>
      <Text style={styles.price}>Price: {item.price} | Qty: {item.quantity}</Text>

      <View style={styles.actions}>
        <Pressable style={styles.qtyBtn} onPress={() => decreaseQty(item.name)}>
          <Text style={styles.qtyText}>-</Text>
        </Pressable>

        <Pressable style={styles.qtyBtn} onPress={() => increaseQty(item.name)}>
          <Text style={styles.qtyText}>+</Text>
        </Pressable>

        <Pressable style={styles.deleteBtn} onPress={() => removeItem(item.name)}>
          <Text style={styles.deleteText}>🗑️</Text>
        </Pressable>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>🛒 Cart</Text>

      <FlatList
        data={cartItems}
        keyExtractor={(item, i) => i.toString()}
        renderItem={renderItem}
        ListEmptyComponent={<Text style={styles.empty}>No items in cart.</Text>}
      />

      {cartItems.length > 0 && (
        <Text style={styles.total}>Total: ${total.toFixed(2)}</Text>
      )}

      <Pressable style={styles.checkoutButton} onPress={handleCheckout}>
        <Text style={styles.checkoutText}>Checkout</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#f9f9f9' },
  header: { fontSize: 24, fontWeight: 'bold', marginBottom: 12, textAlign: 'center' },
  card: {
    backgroundColor: '#fff',
    padding: 14,
    borderRadius: 12,
    marginBottom: 12,
    elevation: 2,
  },
  name: { fontSize: 18, fontWeight: '600', marginBottom: 6 },
  price: { fontSize: 15, marginBottom: 10 },
  actions: { flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center' },
  qtyBtn: {
    backgroundColor: '#1E88E5',
    padding: 8,
    borderRadius: 8,
    width: 40,
    alignItems: 'center',
  },
  qtyText: { color: '#fff', fontSize: 20 },
  deleteBtn: {
    backgroundColor: '#e53935',
    padding: 8,
    borderRadius: 8,
  },
  deleteText: { color: '#fff', fontSize: 18 },
  total: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 20,
    textAlign: 'center',
    color: '#4CAF50',
  },
  empty: { textAlign: 'center', marginTop: 50, color: '#999', fontSize: 16 },
  checkoutButton: {
    backgroundColor: '#4CAF50',
    padding: 12,
    borderRadius: 8,
    marginTop: 20,
    alignItems: 'center',
  },
  checkoutText: { color: '#fff', fontSize: 18, fontWeight: 'bold' },
});

export default Cart;
