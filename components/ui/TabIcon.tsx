import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

interface TabIconProps {
  focused: boolean;
  icon: any;
  title: string;
}

const TabIcon: React.FC<TabIconProps> = ({ focused, icon }) => {
  return (
    <View style={styles.container}>
      <Image
        source={icon}
        style={[
          styles.icon,
          { tintColor: focused ? '#007AFF' : '#8E8E93' },
        ]}
      />
     
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    width: 25,
    height: 25,
    marginBottom: 4,
  },
 
});
export default TabIcon;
