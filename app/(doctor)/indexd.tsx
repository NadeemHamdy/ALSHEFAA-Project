import { View, Text, StyleSheet, ScrollView, TouchableOpacity, ActivityIndicator, FlatList } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { StatusBar } from "expo-status-bar"
import { FontAwesome, MaterialIcons } from "@expo/vector-icons"
import Colors from "../../constants/Colors2"

import { useEffect, useState } from "react";
// Import query, where, and getDocs for fetching multiple documents
import { doc, getDoc, collection, query, where, getDocs } from "firebase/firestore";
import { auth, db } from "../firebase";
import { router } from "expo-router";


type SimpleDoctorUser = {
  id: string;
  name: string;
  type: "doctor";
}

// Define a type for Patient data fetched from Firestore
type Patient = {
  id: string; // Firestore document ID (which is the user's UID)
  firstName: string;
  lastName: string;
  name: string; // Combined name
  email: string | null;
  phone?: string;
  // Add other patient-specific fields if needed
}


export default function DoctorDashboardScreen() {
  const [doctorData, setDoctorData] = useState<SimpleDoctorUser | null>(null);
  // State to hold the list of patients
  const [patients, setPatients] = useState<Patient[]>([]);
  const [loading, setLoading] = useState(true);
  // State to track if there was an error fetching data
  const [error, setError] = useState<string | null>(null);


  useEffect(() => {
    const fetchData = async () => {
      const currentUser = auth.currentUser;

      if (currentUser) {
        try {
          // 1. Fetch Doctor's own data
          const userDocRef = doc(db, "user", currentUser.uid);
          const userDocSnap = await getDoc(userDocRef);

          if (userDocSnap.exists()) {
            const data = userDocSnap.data();
            const fullName = `${data.firstName || ''} ${data.lastName || ''}`.trim();

            if (data.type === 'doctor') {
               const simpleDoctorData: SimpleDoctorUser = {
                 id: currentUser.uid,
                 name: fullName || currentUser.email || 'Doctor',
                 type: 'doctor',
               };
               setDoctorData(simpleDoctorData);

               // 2. Fetch all Patient data
               const patientsCollectionRef = collection(db, "user");
               // Create a query to get documents where 'type' is 'patient'
               const q = query(patientsCollectionRef, where("type", "==", "patient"));
               const querySnapshot = await getDocs(q);

               const patientsList: Patient[] = [];
               querySnapshot.forEach((doc) => {
                 const patientData = doc.data();
                 const patientFullName = `${patientData.firstName || ''} ${patientData.lastName || ''}`.trim();
                 patientsList.push({
                   id: doc.id, // Document ID is the patient's UID
                   firstName: patientData.firstName,
                   lastName: patientData.lastName,
                   name: patientFullName || patientData.email || 'Patient',
                   email: patientData.email,
                   phone: patientData.phone,
                   // Add other fields as needed
                 });
               });
               setPatients(patientsList); // Update patients state

            } else {
               console.warn(`Logged in user ${currentUser.uid} is not a doctor. Redirecting.`);
               router.replace('/');
               setDoctorData(null);
               setPatients([]); // Clear patients if not a doctor
            }

          } else {
            console.warn(`Firestore document for user ${currentUser.uid} not found.`);
            setDoctorData(null);
            setPatients([]);
            router.replace('/');
          }
        } catch (err: any) { // Catch any error during fetching
          console.error("Error fetching data:", err);
          setError(err.message || "Failed to fetch data."); // Set error state
          setDoctorData(null);
          setPatients([]);
          // router.replace('/'); // Optional: redirect on error
        } finally {
           setLoading(false); // Set loading to false after all fetches
        }
      } else {
         // If no user is authenticated
         setDoctorData(null);
         setPatients([]);
         setLoading(false);
         router.replace('/'); // Redirect to login
      }
    };

    fetchData(); // Call the main fetch function
  }, []); // Effect runs only once on mount


  // Render function for each patient item in the FlatList
  const renderPatientItem = ({ item }: { item: Patient }) => (
    <View style={styles.patientItem}>
      <FontAwesome name="user-circle" size={24} color={Colors.primary} style={styles.patientIcon} />
      <View style={styles.patientDetails}>
        <Text style={styles.patientName}>{item.name}</Text>
        {item.email && <Text style={styles.patientContact}>{item.email}</Text>}
        {item.phone && <Text style={styles.patientContact}>{item.phone}</Text>}
      </View>
      {/* Optional: Add an action button like View Details */}
      {/* <TouchableOpacity style={styles.viewButton}>
        <Text style={styles.viewButtonText}>View</Text>
      </TouchableOpacity> */}
    </View>
  );


  // Show loading indicator while fetching data
  if (loading) {
    return (
      <SafeAreaView style={styles.loadingContainer}>
        <StatusBar style="dark" />
        <ActivityIndicator size="large" color={Colors.primary} />
        <Text style={{ marginTop: 10, color: Colors.text }}>Loading data...</Text>
      </SafeAreaView>
    );
  }

  // Show error message if fetching failed
  if (error) {
      return (
        <SafeAreaView style={styles.loadingContainer}>
          <StatusBar style="dark" />
          <Text style={{ color: Colors.error, textAlign: 'center' }}>Error: {error}</Text>
           <TouchableOpacity onPress={() => router.replace('/')}>
             <Text style={{ color: Colors.primary, marginTop: 20 }}>Go to Login</Text>
           </TouchableOpacity>
        </SafeAreaView>
      );
  }

  // If no doctor data is available after loading (e.g., user not logged in or not a doctor)
  // The useEffect already handles redirection in these cases, so this might not be reached
  // unless the redirection takes time. Keeping it as a minimal fallback display.
  if (!doctorData) {
       return (
         <SafeAreaView style={styles.loadingContainer}>
           <StatusBar style="dark" />
           <Text style={{ color: Colors.text }}>Access Denied or User Not Found.</Text>
         </SafeAreaView>
       );
  }


  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" />
      <View style={styles.header}>
        <Text style={styles.greeting}>Hello, Dr. {doctorData.name}</Text>
        <Text style={styles.date}>{new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</Text>
      </View>

      {/* Patient List Section */}
      <Text style={styles.sectionTitle}>All Patients</Text>
      {/* Use FlatList for efficient rendering of lists */}
      <FlatList
        data={patients} // Data source is the patients state
        renderItem={renderPatientItem} // Function to render each patient item
        keyExtractor={(item) => item.id} // Use patient ID as the key
        showsVerticalScrollIndicator={false} // Hide scroll indicator
        contentContainerStyle={styles.patientList} // Style for the content container
        ListEmptyComponent={() => ( // Component to show if the list is empty
          <View style={styles.emptyListContainer}>
            <Text style={styles.emptyListText}>No patients found.</Text>
          </View>
        )}
      />

    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8F9FA",
    padding: 16,
  },
   loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: "#F8F9FA",
  },
  header: {
    flexDirection: "column",
    alignItems: "flex-start",
    marginBottom: 24,
  },
  greeting: {
    fontSize: 24,
    fontWeight: "bold",
    color: Colors.text,
    marginBottom: 4,
  },
  date: {
    fontSize: 14,
    color: Colors.textLight,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: Colors.text,
    marginBottom: 16,
  },
  // Styles for the Patient List
  patientList: {
    paddingBottom: 16, // Add some padding at the bottom of the list
  },
  patientItem: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 12,
    marginBottom: 12, // Space between items
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  patientIcon: {
    marginRight: 12,
  },
  patientDetails: {
    flex: 1, // Take up available space
  },
  patientName: {
    fontSize: 16,
    fontWeight: "600",
    color: Colors.text,
    marginBottom: 2,
  },
  patientContact: {
    fontSize: 14,
    color: Colors.textLight,
  },
  emptyListContainer: {
    alignItems: 'center',
    marginTop: 20,
  },
  emptyListText: {
    fontSize: 16,
    color: Colors.textLight,
  },
})
