import { Tabs } from 'expo-router';
import React, { useState, useEffect, useCallback } from 'react';
import { IconSymbol } from '@/components/ui/IconSymbol';
import TabIcon from '@/components/ui/TabIcon';
import { icons } from '@/constants/icons';
import  {auth}  from '../firebase';
import Menu from '@/components/menu';
import Colors from "../../constants/Colors2"


export default function TabLayout() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // useEffect(() => {
  //   const unsubscribe = auth.onAuthStateChanged((user) => {
  //     setIsLoggedIn(!!user);
  //   });
  //   return () => unsubscribe();
  // }, []);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
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
    <>
    <Menu></Menu>
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors.primary,
        tabBarInactiveTintColor: Colors.textLight,
        headerShown: true,
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
        name="about"
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
    </>
  );
}