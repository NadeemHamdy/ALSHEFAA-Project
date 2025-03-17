import { View, TextInput, Image ,StyleSheet} from "react-native";

import { icons } from "@/constants/icons";

interface Props {
  placeholder: string;
  value?: string;
  onChangeText?: (text: string) => void;
  onPress?: () => void;
}

const SearchBar = ({ placeholder, value, onChangeText, onPress }: Props) => {
  return (
    <View style={styles.container}>
      <Image
        source={icons.search}
        style={styles.icon}
        resizeMode="contain"
        tintColor="black"
      />
      <TextInput
        onPress={onPress}
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
        style={styles.text}
        placeholderTextColor="black"
      />
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
