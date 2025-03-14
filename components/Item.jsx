import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
export default function Item({ iconSrc, text, description,http }) {
  const router = useRouter();
  return (
    // <View style={styles.item}>
      <TouchableOpacity onPress={() => router.push(http) }style={styles.item}>
        <Image source={iconSrc} style={styles.image} />
        <Text style={styles.title}>{text}</Text>
      </TouchableOpacity>
    // </View>
  );
}

const styles = StyleSheet.create({
  item: {
    backgroundColor: "#f9c2",
    borderRadius: 12,
    padding: 15,
    marginVertical: 8,
    marginHorizontal: 16,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    
   
  },
  title: {
    fontSize: 26,
    padding: 15,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    maxWidth: "88%",
  },
  image: {
  //   width: 100,
  //   height: 100,
    borderRadius: 12,
    backgroundColor: "lightgrey",
    padding: 15,
    width: 80,
    height: 70,
    alignItems: "center",
    justifyContent: "center",
    
  },
});
