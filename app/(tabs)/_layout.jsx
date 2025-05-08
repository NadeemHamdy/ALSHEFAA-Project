import { Tabs } from 'expo-router';
import React, { useState, useEffect, useCallback } from 'react';
import { IconSymbol } from '@/components/ui/IconSymbol';
import TabIcon from '@/components/ui/TabIcon';
import { icons } from '@/constants/icons';
import  {auth}  from '../firebase';


export default function TabLayout() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setIsLoggedIn(!!user);
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      // ...your logic...
    });
    return () => unsubscribe();
  }, []);

  const getProfileTabOptions = useCallback(() => {
    return {
      title: isLoggedIn ? 'Profile' : 'Login',
      tabBarIcon: ({ focused }) => (
        <TabIcon focused={focused} icon={ icons.login} />
      ),
      headerShown: false,
    };
  }, [isLoggedIn]);

  return (
    <Tabs
      screenOptions={{
        tabBarItemStyle: {
          width: "100%",
          height: "100%",
          justifyContent: "center",
          alignItems: "center",
        },
        tabBarStyle: {
          backgroundColor: 'rgb(252, 226, 250)',
          justifyContent: "center",
          alignItems: "center",
          height: "9%",
          position: "absolute",
          overflow: "hidden",
          borderWidth: 1,
          borderColor: "#000",
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ focused }) => (
            <TabIcon focused={focused} icon={icons.home} />
          ),
        }}
      />
      <Tabs.Screen
        name="search"
        options={{
          title: "Search",
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <TabIcon focused={focused} icon={icons.search} />
          ),
        }}
      />
      <Tabs.Screen
        name="explore"
        options={{
          title: 'Explore',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="paperplane.fill" color={color} />,
        }}
      />
      <Tabs.Screen
        name="Login"
        options={getProfileTabOptions}
      />
    </Tabs>
  );
}