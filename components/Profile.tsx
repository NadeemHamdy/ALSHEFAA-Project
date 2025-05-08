import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  SafeAreaView,
  TextInput,
  Image,
  ActivityIndicator,
  Dimensions,
  Alert,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { auth, db, storage } from '../app/firebase';

const Profile = () => {
  const user = auth.currentUser;
  const [name, setName] = useState('');
  const [bio, setBio] = useState('');
  const [image, setImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      if (!user) {
        console.error('User is not logged in');
        return;
      }

      const userDoc = await getDoc(doc(db, 'users', user.uid));
      if (userDoc.exists()) {
        const data = userDoc.data();
        setName(data.name || '');
        setBio(data.bio || '');
        setImage(data.photoURL || null);
      }
    };

    fetchData();
  }, []);

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.7,
    });

    if (!result.canceled) {
      if (result.assets && result.assets.length > 0) {
        setImage(result.assets[0].uri);
      }
    }
  };

  const uploadImageAsync = async (uri: string): Promise<string> => {
    const response = await fetch(uri);
    const blob = await response.blob();
    if (!user) {
      throw new Error('User is not logged in');
    }
    const imageRef = ref(storage, `profilePictures/${user.uid}.jpg`);
    await uploadBytes(imageRef, blob);
    return await getDownloadURL(imageRef);
  };

  const handleSave = async () => {
    if (!name.trim()) {
      Alert.alert('Validation Error', 'Name cannot be empty.');
      return;
    }

    setLoading(true);
    let photoURL = image;

    try {
      if (image && !image.startsWith('https://')) {
        photoURL = await uploadImageAsync(image);
      }

      if (!user) {
        console.error('User is not logged in');
        return;
      }

      await setDoc(doc(db, 'users', user.uid), {
        name,
        bio,
        photoURL,
      });

      Alert.alert('Success', 'Profile saved successfully!');
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'Failed to save profile. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Pressable onPress={pickImage} accessible accessibilityLabel="Change Profile Picture">
          <Image
            source={
              image
                ? { uri: image }
                : require('../assets/images/login.png')
            }
            style={styles.avatar}
          />
          <Text style={styles.changePhoto}>Change Photo</Text>
        </Pressable>

        {/* Input Fields */}
        <TextInput
          style={styles.input}
          placeholder="Full Name"
          value={name}
          onChangeText={setName}
          accessible
          accessibilityLabel="Full Name Input"
        />

        <TextInput
          style={styles.input}
          placeholder="Bio"
          value={bio}
          onChangeText={setBio}
          accessible
          accessibilityLabel="Bio Input"
        />

        {/* Save Button */}
        <Pressable style={styles.button} onPress={handleSave} disabled={loading}>
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.buttonText}>Save Profile</Text>
          )}
        </Pressable>

        {/* Logout Button */}
        <Pressable
          style={styles.logoutButton}
          onPress={() => auth.signOut()}
          accessible
          accessibilityLabel="Logout Button"
        >
          <Text style={styles.buttonText}>Logout</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
};

export default Profile;

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  content: {
    flex: 1,
    alignItems: 'center',
    padding: 20,
  },
  avatar: {
    width: width * 0.3, // Responsive size
    height: width * 0.3,
    borderRadius: (width * 0.3) / 2,
    backgroundColor: '#ddd',
  },
  changePhoto: {
    marginTop: 10,
    color: '#2196F3',
    fontWeight: '500',
  },
  input: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 12,
    marginTop: 20,
    fontSize: 16,
  },
  button: {
    marginTop: 30,
    backgroundColor: '#2196F3',
    padding: 15,
    borderRadius: 8,
    width: '100%',
    alignItems: 'center',
  },
  logoutButton: {
    marginTop: 15,
    backgroundColor: '#f44336',
    padding: 15,
    borderRadius: 8,
    width: '100%',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});
