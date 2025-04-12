import { Text,View, TextInput, Image ,StyleSheet,Pressable} from "react-native";

import { icons } from "@/constants/icons";


const SearchBar = ({ placeholder, value, onChangeText, onPress }) => {
  return (
    <View style={styles.container}>
      <Image
        source={icons.search}
        style={styles.icon}
        resizeMode="contain"
        tintColor="black"
      />
      <TextInput
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
        style={styles.text}
        placeholderTextColor="black"
      />
       {/* <Pressable 
                     onPress={() => {
                      onPress
                     }}
                     style={({ pressed }) => [
                       {
                         backgroundColor: "rgb(33, 150, 243)",
                         opacity: pressed ? 0.5 : 1,
                         borderRadius: 8,
                         padding: 10,
                      
                         alignItems: "center",
                         justifyContent: "center",
                         alignContent: "center",
      
                       },
                       styles.wrapperCustom,
                     ]}
                   >
                     {({ pressed }) => (
                       <Text >{pressed ? "add" : "additem"}</Text>
                     
                     )}

                   </Pressable>  */}
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgb(252, 226, 250)',
    borderRadius: 999,
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginTop: 25,

  },
 
    text: {
      flex: 1,
      marginLeft: 8,
      color: 'black',
    },
    icon: {
        
      width: 20,
      height: 20,
    },

});

export default SearchBar;
