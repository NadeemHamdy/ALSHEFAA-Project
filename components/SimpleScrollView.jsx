import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, ScrollView, SafeAreaView } from "react-native";
import Item from "./Item";
import {images} from "../constants/images";
export default function SimpleScrollView( {items}) {
  
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

    <ScrollView contentContainerStyle={styles.items}>
      {items.map((e) => (
        <Item  text={e.name} iconSrc={e.icon} description={e.description} key={e.http} http ={e.http} />
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
// container: {
//   flex: 1,
//   backgroundColor: "#fff",
//   alignItems: "stretch",
//   justifyContent: "flex-start",
//   marginTop: StatusBar.currentHeight || 0,
// },

tal: {

  height: "3%",
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
