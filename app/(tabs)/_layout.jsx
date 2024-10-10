import { View, Text, StyleSheet } from 'react-native';
import React from 'react';
import { Tabs } from 'expo-router';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import FontAwesome from '@expo/vector-icons/FontAwesome';

export default function TabLayout() {
  return (
    <Tabs 
      screenOptions={{
        headerShown: false,
        tabBarStyle: styles.tabBar,  // Custom styles for the tab bar
        tabBarLabelStyle: styles.tabBarLabel,  // Styling the labels
        tabBarActiveTintColor: '#FF69B4', // Active tab color (bright pink)
        tabBarInactiveTintColor: '#8B8B8B', // Inactive tab color (grey)
        tabBarIconStyle: styles.tabBarIcon, // Add styles to icons
      }}
    >
      <Tabs.Screen 
        name="Home"
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({ color, size }) => <FontAwesome5 name="home" size={size} color={color} />,
        }}
      />
      <Tabs.Screen 
        name="Map"
        options={{
          tabBarLabel: 'Map',
          tabBarIcon: ({ color, size }) => <FontAwesome name="map-marker" size={size} color={color} />,
        }}
      />
      <Tabs.Screen 
        name="Community"
        options={{
          tabBarLabel: 'Community',
          tabBarIcon: ({ color, size }) => <FontAwesome name="group" size={size} color={color} />,
        }}
      />
      <Tabs.Screen 
        name="Profile"
        options={{
          tabBarLabel: 'Profile',
          tabBarIcon: ({ color, size }) => <FontAwesome name="user" size={size} color={color} />,
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: '#ffffff',  // White background for the tab bar
    borderTopWidth: 1,
    borderTopColor: '#F0F0F0',  // Light border for a cleaner look
    height: 60,
    elevation: 10,  // Shadow for the tab bar to make it stand out
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 6,
  },
  tabBarLabel: {
    fontSize: 12,  // Smaller text size for a compact look
    fontWeight: '600',  // Slightly bolder font
    marginBottom: 5,  // Space between icon and text
    fontFamily: 'Arial',  // You can change the font to any other custom font
  },
  tabBarIcon: {
    marginTop: 5,  // Add space between icon and tab bar for a cleaner layout
  },
});
