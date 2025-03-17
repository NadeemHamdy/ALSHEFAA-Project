import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
export default function Item({ iconSrc, name, description,http,price }: { iconSrc: any; name: string; description: string, http: any ,price: number,}) {
  const router = useRouter();
  const handlePress =  () => {
    router.push({
      pathname: "/product/Products", 
      params: {
        name:name , 
        price: price,
        description: description,
        image: iconSrc,  
      },
    });
  };
  return (
    // <View style={styles.item}>
      <TouchableOpacity onPress={handlePress}style={styles.item}>
        <Image source={iconSrc} style={styles.image} />
        <Text style={styles.title}>{name}</Text>
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
