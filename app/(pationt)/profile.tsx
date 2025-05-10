import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView, Alert, ActivityIndicator } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { StatusBar } from "expo-status-bar"
import { FontAwesome, MaterialIcons, Ionicons } from "@expo/vector-icons"
import Colors from "../../constants/Colors2"
import { router } from "expo-router"
import { useState, useEffect } from "react"
import { onAuthStateChanged, signOut } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "../firebase";

// Import expo-image-picker
import * as ImagePicker from 'expo-image-picker';


type User = {
  id: string;
  name: string;
  email: string | null;
  phone?: string;
  role: "patient" | "doctor" | "admin";
  avatar?: string; // URL of the profile picture
}

export default function ProfileScreen() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  // State to hold the selected image URI before saving (optional)
  const [selectedImage, setSelectedImage] = useState<string | null>(null);


  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        try {
          const userDocRef = doc(db, "user", firebaseUser.uid);
          const userDocSnap = await getDoc(userDocRef);

          if (userDocSnap.exists()) {
            const userData = userDocSnap.data();
             const name = userData.firstName + " " + userData.lastName;
            const appUser: User = {
              id: firebaseUser.uid,
              email: firebaseUser.email,
              name: name,
              phone: userData.phone,
              role: userData.type,
              avatar: userData.avatar, // Fetch existing avatar URL
            };
            setUser(appUser);
             // Reset selected image when user data is fetched
            setSelectedImage(null);
          } else {
            console.warn(`Firestore document for user ${firebaseUser.uid} not found.`);
            setUser(null);
             setSelectedImage(null);
          }
        } catch (error) {
          console.error("Error fetching user data from Firestore:", error);
          setUser(null);
           setSelectedImage(null);
        }
      } else {
        setUser(null);
        setSelectedImage(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      console.log("User logged out successfully.");
      router.replace("/");
    } catch (error: any) {
      console.error("Firebase Auth logout failed:", error.message);
      Alert.alert("Logout Failed", error.message || "Could not log out. Please try again.");
    }
  }

  // Function to handle selecting an image
  const handleImagePicker = async () => {
    // Request permission to access the media library
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permission Denied', 'Sorry, we need camera roll permissions to make this work!');
      return;
    }

    // Launch the image picker
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images, // Only allow images
      allowsEditing: true, // Allow user to edit the image
      aspect: [1, 1], // Force a square aspect ratio
      quality: 1, // Maximum quality
    });

    // If an image was selected and not cancelled
    if (!result.canceled && result.assets && result.assets.length > 0) {
      const selectedUri = result.assets[0].uri;
      setSelectedImage(selectedUri); // Set the selected image URI

      // ** TODO: Implement image upload to Firebase Storage here **
      // You would typically upload the selectedUri to Firebase Storage,
      // get the download URL, and then update the user document in Firestore
      // with the new avatar URL.
      console.log("Image selected:", selectedUri);
      // Example: uploadImageToFirebase(selectedUri);
    }
  };


  const cardStyles = {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
  };

  if (loading || !user) {
    return null;
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <View style={styles.profileImageContainer}>
            {/* Display selected image if available, otherwise fetched avatar, otherwise default */}
            <Image
              source={selectedImage ? { uri: selectedImage } : (user.avatar ? { uri: user.avatar } : require("../Assets/adaptive-icon.png"))}
              style={styles.profileImage}
            />
            {/* Call handleImagePicker when the camera icon is pressed */}
            <TouchableOpacity style={styles.editImageButton} onPress={handleImagePicker}>
              <FontAwesome name="camera" size={14} color="#fff" />
            </TouchableOpacity>
          </View>
          <Text style={styles.name}>{user.name || 'No Name'}</Text>
          <Text style={styles.email}>{user.email || 'No Email'}</Text>
        </View>

        <View style={[cardStyles, styles.infoCard]}>
          <View style={styles.infoItem}>
            <View style={styles.infoIconContainer}>
              <FontAwesome name="user" size={16} color={Colors.primary} />
            </View>
            <View style={styles.infoContent}>
              <Text style={styles.infoLabel}>Full Name</Text>
              <Text style={styles.infoValue}>{user.name || 'No Name'}</Text>
            </View>
            <TouchableOpacity style={styles.editButton}>
              <FontAwesome name="pencil" size={16} color={Colors.primary} />
            </TouchableOpacity>
          </View>

          <View style={styles.divider} />

          <View style={styles.infoItem}>
            <View style={styles.infoIconContainer}>
              <FontAwesome name="envelope" size={16} color={Colors.primary} />
            </View>
            <View style={styles.infoContent}>
              <Text style={styles.infoLabel}>Email</Text>
              <Text style={styles.infoValue}>{user.email || 'No Email'}</Text>
            </View>
            <TouchableOpacity style={styles.editButton}>
              <FontAwesome name="pencil" size={16} color={Colors.primary} />
            </TouchableOpacity>
          </View>

          <View style={styles.divider} />

          <View style={styles.infoItem}>
            <View style={styles.infoIconContainer}>
              <FontAwesome name="phone" size={16} color={Colors.primary} />
            </View>
            <View style={styles.infoContent}>
              <Text style={styles.infoLabel}>Phone</Text>
              <Text style={styles.infoValue}>{user.phone || 'No Phone'}</Text>
            </View>
            <TouchableOpacity style={styles.editButton}>
              <FontAwesome name="pencil" size={16} color={Colors.primary} />
            </TouchableOpacity>
          </View>
        </View>

        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <FontAwesome name="sign-out" size={16} color="#fff" style={styles.logoutIcon} />
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8F9FA",
    padding: 16,
  },
  header: {
    alignItems: "center",
    marginBottom: 24,
  },
  profileImageContainer: {
    position: "relative",
    marginBottom: 16,
    marginTop: 30,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  editImageButton: {
    position: "absolute",
    bottom: 0,
    right: 0,
    backgroundColor: Colors.primary,
    width: 30,
    height: 30,
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderColor: "#fff",
  },
  name: {
    fontSize: 20,
    fontWeight: "bold",
    color: Colors.text,
    marginBottom: 4,
  },
  email: {
    fontSize: 14,
    color: Colors.textLight,
  },
  infoCard: {
    marginBottom: 24,
  },
  infoItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
  },
  infoIconContainer: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "rgba(0, 150, 255, 0.1)",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  infoContent: {
    flex: 1,
  },
  infoLabel: {
    fontSize: 12,
    color: Colors.textLight,
    marginBottom: 2,
  },
  infoValue: {
    fontSize: 14,
    color: Colors.text,
  },
  editButton: {
    padding: 8,
  },
  divider: {
    height: 1,
    backgroundColor: "#EEEEEE",
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: Colors.text,
    marginBottom: 16,
  },
  settingsCard: {
    marginBottom: 24,
  },
  settingItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
  },
  settingIconContainer: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "rgba(0, 150, 255, 0.1)",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  settingText: {
    flex: 1,
    fontSize: 14,
    color: Colors.text,
  },
  logoutButton: {
    backgroundColor: "#FF6B6B",
    borderRadius: 8,
    paddingVertical: 12,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 24,
    marginTop: 20,
  },
  logoutIcon: {
    marginRight: 8,
  },
  logoutText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
})
