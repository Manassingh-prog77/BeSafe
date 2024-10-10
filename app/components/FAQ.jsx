import React from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const FAQ = () => {
  const navigation = useNavigation();

  const faqs = [
    {
      question: "What should I do in an emergency?",
      answer: "Press the SOS button to alert authorities and your emergency contacts immediately.",
    },
    {
      question: "How can I set up the fake call feature?",
      answer: "Go to settings and configure the fake call timer to ring at your preferred time.",
    },
    {
      question: "Can I share my location with someone during an emergency?",
      answer: "Yes, you can share your location with trusted contacts via the contact sharing feature.",
    },
    {
      question: "Are there tutorials for self-defense?",
      answer: "Yes, we provide access to self-defense tutorials through the app.",
    },
    {
      question: "How can I find nearby safe locations?",
      answer: "Use the 'Nearest Safe Locations' feature to find police stations and public areas nearby.",
    },
    {
      question: "Is there a community support feature?",
      answer: "Yes, you can join community rooms for legal advice and media support.",
    },
  ];

  return (
    <ScrollView className="flex-1 bg-gray-100 p-4 pt-6 mb-5">
      {/* Back Arrow */}
      <TouchableOpacity onPress={() => navigation.goBack()} className="mb-4">
        <Ionicons name="arrow-back" size={24} color="#4B0082" />
      </TouchableOpacity>
      <Text className="text-2xl font-bold text-center text-purple-800 mb-4">Frequently Asked Questions</Text>
      {faqs.map((faq, index) => (
        <View key={index} className="mb-4 bg-pink-300 rounded-lg p-4 shadow-lg">
          <Text className="text-xl font-semibold text-purple-800">{faq.question}</Text>
          <Text className="text-base text-gray-700 mt-2">{faq.answer}</Text>
        </View>
      ))}
    </ScrollView>
  );
};

export default FAQ;
