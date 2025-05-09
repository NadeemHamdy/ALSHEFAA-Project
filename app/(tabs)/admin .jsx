import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet, Alert } from 'react-native';
import { db } from '../firebase';
import { collection, addDoc, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { useRouter } from 'expo-router';

const AdminPage = () => {
  const [products, setProducts] = useState([]);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [icon, setIcon] = useState('');
  const router = useRouter();

  const fetchProducts = async () => {
    const snapshot = await getDocs(collection(db, 'products'));
    const list = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    setProducts(list);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleAddProduct = async () => {
    if (!name || !description || !price || !icon) {
      Alert.alert('All fields are required');
      return;
    }

    await addDoc(collection(db, 'products'), {
      name,
      description,
      price: parseFloat(price),
      icon,
    });

    setName('');
    setDescription('');
    setPrice('');
    setIcon('');
    fetchProducts();

    // After adding the product, navigate to the Search page
    router.push('/search');
  };

  const handleDeleteProduct = async (id) => {
    await deleteDoc(doc(db, 'products', id));
    fetchProducts();

    // After deleting the product, navigate to the Search page
    router.push('/search');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Admin Page - Add Product</Text>
      <TextInput style={styles.input} placeholder="Name" value={name} onChangeText={setName} />
      <TextInput style={styles.input} placeholder="Description" value={description} onChangeText={setDescription} />
      <TextInput style={styles.input} placeholder="Price" value={price} onChangeText={setPrice} keyboardType="numeric" />
      <TextInput style={styles.input} placeholder="Icon Key (e.g., cpc)" value={icon} onChangeText={setIcon} />

      <TouchableOpacity style={styles.button} onPress={handleAddProduct}>
        <Text style={styles.buttonText}>Add Product</Text>
      </TouchableOpacity>

      <FlatList
        data={products}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <View style={styles.product}>
            <Text>{item.name} - ${item.price}</Text>
            <TouchableOpacity onPress={() => handleDeleteProduct(item.id)}>
              <Text style={styles.delete}>Delete</Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
};

export default AdminPage;

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#fff' },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 10 },
  input: { borderWidth: 1, marginBottom: 10, padding: 10, borderRadius: 5 },
  button: { backgroundColor: '#1D3D47', padding: 15, borderRadius: 8, alignItems: 'center' },
  buttonText: { color: '#fff', fontWeight: 'bold' },
  product: { flexDirection: 'row', justifyContent: 'space-between', marginVertical: 5 },
  delete: { color: 'red', fontWeight: 'bold' },
});
