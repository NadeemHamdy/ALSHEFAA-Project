import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert, ActivityIndicator } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { StatusBar } from "expo-status-bar"
import { FontAwesome } from "@expo/vector-icons"
import Colors from "../../constants/Colors2"
import { router, useLocalSearchParams } from "expo-router"
import { useState } from "react"
import { doc, updateDoc } from "firebase/firestore"
import { db } from "../firebase"

export default function EditProfileScreen() {
  const params = useLocalSearchParams();
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState(params.name as string || '');
  const [phone, setPhone] = useState(params.phone as string || '');
  const email = params.email as string || '';

  const handleUpdate = async () => {
    if (!params.id) {
      Alert.alert("Error", "User ID is missing");
      return;
    }
    
    if (!name.trim()) {
      Alert.alert("Error", "Name cannot be empty");
      return;
    }

    setLoading(true);
    try {
      const [firstName, ...lastNameParts] = name.trim().split(' ');
      const lastName = lastNameParts.join(' ');

      const updateData = {
        firstName,
        lastName,
        phone: phone.trim()
      };

      // First check if we can read the document
      const userRef = doc(db, "user", params.id as string);
      
      await updateDoc(userRef, updateData);

      Alert.alert(
        "Success",
        "Profile updated successfully",
        [
          {
            text: "OK",
            onPress: () => {
              // Force a refresh of the profile page
              router.replace({
                pathname: "/profile",
                params: { refresh: Date.now().toString() }
              });
            }
          }
        ]
      );
    } catch (error: any) {
      console.error("Update error:", error);
      let errorMessage = "Failed to update profile";
      
      if (error.code === 'permission-denied') {
        errorMessage = "You don't have permission to update this profile";
      } else if (error.code === 'not-found') {
        errorMessage = "User profile not found";
      } else if (error.message) {
        errorMessage = error.message;
      }
      
      Alert.alert("Error", errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" />
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <FontAwesome name="arrow-left" size={24} color={Colors.text} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Edit Profile</Text>
      </View>

      <View style={styles.form}>
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Full Name</Text>
          <TextInput
            style={styles.input}
            value={name}
            onChangeText={setName}
            placeholder="Enter your full name"
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Email</Text>
          <TextInput
            style={[styles.input, styles.disabledInput]}
            value={email}
            editable={false}
            placeholder="Your email"
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Phone</Text>
          <TextInput
            style={styles.input}
            value={phone}
            onChangeText={setPhone}
            placeholder="Enter your phone number"
            keyboardType="phone-pad"
          />
        </View>

        <TouchableOpacity 
          style={[styles.updateButton, loading && styles.disabledButton]} 
          onPress={handleUpdate}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.updateButtonText}>Update Profile</Text>
          )}
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8F9FA",
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#EEEEEE',
  },
  backButton: {
    marginRight: 16,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.text,
  },
  form: {
    padding: 16,
  },
  inputGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    color: Colors.textLight,
    marginBottom: 8,
  },
  input: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#EEEEEE',
  },
  disabledInput: {
    backgroundColor: '#F5F5F5',
    color: Colors.textLight,
  },
  updateButton: {
    backgroundColor: Colors.primary,
    borderRadius: 8,
    padding: 16,
    alignItems: 'center',
    marginTop: 20,
  },
  disabledButton: {
    opacity: 0.7,
  },
  updateButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
}) 