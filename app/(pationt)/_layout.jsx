import { Tabs } from 'expo-router';
import React from 'react'; // Removed unused useState, useEffect, useCallback
// import { IconSymbol } from '@/components/ui/IconSymbol'; // Assuming not needed for these tabs
import TabIcon from '@/components/ui/TabIcon'; // Used for tab icons
import { icons } from '@/constants/icons'; // Contains icon definitions
// import { auth } from '../firebase'; // Removed auth import as it's not used in this layout logic
// import Menu from '@/components/menu'; // Removed Menu as it's not shown as a tab in the image structure
import Colors from "../../constants/Colors2"
import { FontAwesome } from '@expo/vector-icons';

export default function TabLayout() {
  return (
    <>
    {/* Removed Menu component */}
    {/* <Menu></Menu> */}
     <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors.primary,
        tabBarInactiveTintColor: Colors.textLight,
        headerShown: true,
      }}
    >
      {/* Tab for indexp.tsx */}
      <Tabs.Screen
        name="indexp" // Matches the file name indexp.tsx
        options={{
          title: 'Home', // Display name for the tab
          tabBarIcon: ({ focused }) => (
            // Using TabIcon component with the home icon
            <TabIcon focused={focused} icon={icons.home} />
          ),
          // headerShown: false, // Control header visibility for this screen
        }}
      />

      {/* Tab for search.jsx */}
      <Tabs.Screen
        name="search" // Matches the file name search.jsx
        options={{
          title: 'Search', // Display name for the tab
          tabBarIcon: ({ focused }) => (
            // Assuming you have a search icon in your icons object
            <TabIcon focused={focused} icon={icons.search} />
          ),
          // headerShown: false, // Control header visibility for this screen
        }}
      />

      {/* Tab for cart.jsx */}
      <Tabs.Screen
        name="cart" // Matches the file name cart.jsx
        options={{
          title: 'Cart', // Display name for the tab
          tabBarIcon: ({ focused }) => (
            // Assuming you have a cart icon in your icons object
            <TabIcon focused={focused} icon={icons.cart} />
          ),
           // headerShown: false, // Control header visibility for this screen
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          tabBarIcon: ({ color }) => <FontAwesome name="user" size={24} color={color} />,
        }}
      />
    

      {/* Removed other tabs like 'explore' and 'Login' */}

    </Tabs>
    </>
  );
}
