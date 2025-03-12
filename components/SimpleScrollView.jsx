import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, ScrollView, SafeAreaView } from "react-native";
import Item from "./Item";
import {images} from "../constants/images";
export default function SimpleScrollView() {
  const initialValue = [
    {
      name: "Complete Blood Count (CBC)",
      description: "Measures the number and types of cells in your blood.",
      price: 50,
      icon:  images.cpc,
    },
    {
      name: "Lipid Panel",
      description: "Checks cholesterol and triglyceride levels.",
      price: 75,
      icon:  images.lp,
    },
    {
      name: "Urinalysis",
      description: "Analyzes the content and appearance of urine.",
      price: 30,
      icon: images.u,
    },
    {
      name: "Basic Metabolic Panel (BMP)",
      description: "Measures glucose, electrolytes, kidney function, and calcium levels.",
      price: 60,
      icon:  images.pmb,
    },
    {
      name: "Thyroid Function Test (TFT)",
      description: "Evaluates how well your thyroid gland is working.",
      price: 80,
      icon: images.tft,
    },
    {
        name: "International Normalized Ratio (INR)",
        description: "A lab test that determines how long it takes for blood to clot. Price: 600. Fasting for 6-8 hours is preferred, and the test should be done in the morning.",
        icon: images.inr,
      },
      {
        name: "Kidney Function Test (KFT)",
        description: "Kidney function test is useful for urine screening to detect blood and protein. KFT helps assess creatinine buildup in the bloodstream, as elevated levels may indicate kidney problems. Helps doctors diagnose factors associated with unexplained high blood pressure. Helps the test screen for underlying causes of obesity. Price: 300. Fasting for 6 hours is required.",
        icon: images.rft,
      },
      ,
{
name: "Liver Function  (LFTs)",
description: "Liver function tests are blood tests used to help find the cause of symptoms, monitor liver disease, or assess liver damage. Tests measure levels of certain enzymes and proteins in the blood. Some tests measure how well the liver performs its normal functions of producing protein and clearing bilirubin, a blood waste product. Price: 250. Fasting for 8-12 hours is required.",
icon: images.lft,
},
  ];
//   const [arrOfObjects, setArrOfObjects] = useState([]);
//   useEffect(() => {
//     AsyncStorage.getItem("todos")
//     .then((value) => {
//       if (!value) {
//         setArrOfObjects(initialValue);
//         AsyncStorage.setItem("todos", JSON.stringify(arrOfObjects));
//       } else setArrOfObjects(JSON.parse(value));
//     })
//     .catch((err) => {
//       console.error("error", err);
//       setArrOfObjects(initialValue);
//     });
  
//     return () => {
//       alert("Unmounting");
//     }
//   }, []);

return (
  <SafeAreaView style={styles.container}>
    <Text style={styles.title}> Available Testing</Text>
    <ScrollView contentContainerStyle={styles.items}>
      {initialValue.map((e) => (
        <Item  text={e.name} iconSrc={e.icon} description={e.description} key={e.title} />
      ))}
    </ScrollView>
    {/* <ScrollView contentContainerStyle={styles.items}>
      {arr.map((e, index) => (
        <Item text={e} iconSrc={index % 2 === 0 ? lemon : mango} />
      ))}
    </ScrollView> */}
    <StatusBar style="auto" />
    <Text style={styles.tal} ></Text>
  </SafeAreaView>
);
}

const styles = StyleSheet.create({
container: {
  flex: 1,
  backgroundColor: "#fff",
  alignItems: "stretch",
  justifyContent: "flex-start",
  marginTop: StatusBar.currentHeight || 0,
},

tal: {

  height: "9%",
},
title: {
  paddingTop: 80,
  padding: 5,
  fontSize: 29,
  fontWeight: "bold",
  textAlign: "center",
},
items: {
  // backgroundColor: "green",
  padding: 2,
  borderWidth: 1,
  flexDirection: "column",
  justifyContent: "space-between",
  
},
});
