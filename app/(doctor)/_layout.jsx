import { Tabs } from 'expo-router';
import { FontAwesome } from '@expo/vector-icons';
import React, { useState, useEffect, useCallback } from 'react';
import TabIcon from '@/components/ui/TabIcon';
import { icons } from '@/constants/icons';
import { auth } from '../firebase';
import Menu from '@/components/menu';
import Colors from "../../constants/Colors2"

export default function TabLayout() {
  return (
    <>
    <Menu></Menu>
     <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors.primary,
        tabBarInactiveTintColor: Colors.textLight,
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name="indexd"
        options={{
          title: 'Home',
          tabBarIcon: ({ focused }) => (
            <TabIcon focused={focused} icon={icons.home} />
          ),
        }}
      />
       <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          tabBarIcon: ({ color }) => <FontAwesome name="user-md" size={24} color={color} />,
        }}
      />
    </Tabs>
    </>
  );
}
