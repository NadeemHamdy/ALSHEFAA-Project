import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  SafeAreaView,
  Animated,
  Image,
  Dimensions,
  Modal,
} from 'react-native';
import { useRouter } from 'expo-router';

const { width: SCREEN_W, height: SCREEN_H } = Dimensions.get('window');
const DRAWER_W = SCREEN_W * 0.8;

export default function Menu() {
  const [isMenuVisible, setMenuVisible] = useState(false);
  const slideAnim = useRef(new Animated.Value(-DRAWER_W)).current;
  const router = useRouter();

  const openMenu = () => {
    setMenuVisible(true);
    Animated.timing(slideAnim, {
      toValue: 0,
      duration: 300,
      useNativeDriver: false,
    }).start();
  };

  const closeMenu = () => {
    Animated.timing(slideAnim, {
      toValue: -DRAWER_W,
      duration: 300,
      useNativeDriver: false,
    }).start(() => setMenuVisible(false));
  };

  return (
    <SafeAreaView style={styles.container}>
      <Pressable style={styles.menuButton} onPress={openMenu}>
        <Image
          source={require('../assets/images/menu.png')}
          style={{ width: 24, height: 24 }}
        />
      </Pressable>

      <Modal
        visible={isMenuVisible}
        transparent={true}
        animationType="none"
        onRequestClose={closeMenu}
      >
        <View style={styles.modalContainer}>
          <Pressable style={styles.backdrop} onPress={closeMenu} />


          <Animated.View style={[styles.drawer, { left: slideAnim }]}>
            <Text style={styles.drawerTitle}>Menu Items</Text>
            <Pressable onPress={() => { setMenuVisible(false); router.replace('/'); }}>
              <Text style={styles.drawerItem}>Home</Text>
            </Pressable>
            <Pressable onPress={() => { setMenuVisible(false); router.replace('/explore'); }}>
              <Text style={styles.drawerItem}>Explore</Text>
            </Pressable>
            <Pressable onPress={closeMenu}>
              <Text style={[styles.drawerItem, styles.closeButton]}>
                Close Menu
              </Text>
            </Pressable>
          </Animated.View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
   marginTop: -846,
    flex: 1,
    backgroundColor: 'white',
    zIndex: 1,
  },
  menuButton: {
    padding: 12,
    marginTop: 833,
    backgroundColor: '#eee',
    borderRadius: 4,
    alignSelf: 'flex-start',
    zIndex: 2,
  },

  modalContainer: {
    flex: 1,
    flexDirection: 'row',
  },
  backdrop: {
    width: SCREEN_W - DRAWER_W,
    height: SCREEN_H ,
    backgroundColor: 'rgba(0,0,0,0.4)',
  },

  drawer: {
    position: 'absolute',
    top: 0,
    width: DRAWER_W,
    height: SCREEN_H,
    backgroundColor: 'white',
    paddingTop: 48,
    paddingHorizontal: 16,
    zIndex: 10,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  drawerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  drawerItem: {
    fontSize: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  closeButton: {
    color: 'red',
    marginTop: 24,
  },
});
