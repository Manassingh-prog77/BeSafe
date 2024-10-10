import React from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const HowitWorks = () => {
  const navigation = useNavigation();

  const functionalities = [
    {
      title: "Emergency SOS",
      description: "Instantly alert authorities and your emergency contacts with your location when you feel threatened. Simply press the SOS button to send an alert.",
      icon: "alert-circle"
    },
    {
      title: "Fake Call",
      description: "Set a fake call to escape uncomfortable situations. You can either call instantly or set a timer for the call to ring at a later time.",
      icon: "phone-portrait"
    },
    {
      title: "Location Sharing",
      description: "Share your location with trusted contacts during an emergency, ensuring someone knows where you are at all times.",
      icon: "people"
    },
    {
      title: "AI Chatbot", // Newly added functionality
      description: "Interact with an AI Chatbot for immediate support and guidance. Get answers to your safety questions or receive assistance in finding resources.",
      icon: "chatbubble-ellipses"
    },
    {
      title: "Safety Sounds",
      description: "Play safety sounds like police sirens, emergency alarms, or screams to attract attention in case of danger.",
      icon: "volume-high"
    },
    {
      title: "Timer for Call",
      description: "Set a timer for a call to ring at a specified time, giving you a way to signal for help without raising suspicion.",
      icon: "timer"
    },
    {
      title: "Nearest Safe Locations",
      description: "Find and navigate to the nearest safe locations, such as police stations or public areas.",
      icon: "location"
    },
    {
      title: "Community Rooms",
      description: "Join community rooms for support and advice, including legal assistance and media resources in case of trouble.",
      icon: "people-circle"
    },
    {
      title: "Self-Defense Tutorials",
      description: "Access a variety of self-defense tutorials and quick safety tips to empower yourself.",
      icon: "book"
    },
  ];

  return (
    <ScrollView className="flex-1 bg-gray-100 p-4 pt-6 mb-4">
      {/* Back Arrow */}
      <TouchableOpacity onPress={() => navigation.goBack()} className="mb-4">
        <Ionicons name="arrow-back" size={24} color="#4B0082" />
      </TouchableOpacity>
      <Text className="text-2xl font-bold text-center text-purple-800 mb-4">How It Works</Text>
      {functionalities.map((func, index) => (
        <View key={index} className="flex-row items-start mb-5 bg-pink-300 rounded-lg p-4 shadow-lg">
          <Ionicons name={func.icon} size={30} color="#4B0082" className="mr-3" />
          <View className="flex-1">
            <Text className="text-xl font-semibold text-purple-800">{" "}{func.title}</Text>
            <Text className="text-base text-gray-700 mt-1">{func.description}</Text>
          </View>
        </View>
      ))}
    </ScrollView>
  );
};

export default HowitWorks;
