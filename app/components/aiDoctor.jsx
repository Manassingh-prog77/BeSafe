// Chatbot.js
import React, { useState } from 'react';
import { View, Text, TextInput, Button, ScrollView, ActivityIndicator, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons'; // Ensure to install react-native-vector-icons

const aiDoctor = () => {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSend = async () => {
    if (!input.trim()) return; // Prevent sending empty messages

    // Add user message to the chat
    const userMessage = { role: 'user', content: input };
    setMessages((prev) => [...prev, { sender: 'User', text: input }]);

    // Clear input
    setInput('');
    setLoading(true);

    // Fetch response from the RapidAPI endpoint
    try {
      const response = await fetch('https://chatgpt-42.p.rapidapi.com/conversationgpt4-2', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-rapidapi-host': 'chatgpt-42.p.rapidapi.com',
          'x-rapidapi-key': 'YOUR_RAPIDAPI_KEY', 
        },
        body: JSON.stringify({
          messages: [userMessage],
          system_prompt: '',
          temperature: 0.9,
          top_k: 5,
          top_p: 0.9,
          max_tokens: 256,
          web_access: false,
        }),
      });

      // Check if the response is ok
      if (!response.ok) {
        const errorMessage = await response.text(); // Get the error message from the response
        throw new Error(`Error: ${errorMessage}`);
      }

      const data = await response.json();
      console.log(data);

      // Check if the response contains a valid message
      if (data) {
        const aiMessage = { sender: 'AI', text: data.result };
        setMessages((prev) => [...prev, aiMessage]);
      } else {
        setMessages((prev) => [...prev, { sender: 'AI', text: 'Sorry, I did not understand that.' }]);
      }
    } catch (error) {
      setMessages((prev) => [...prev, { sender: 'AI', text: `Error: ${error.message}` }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View className="flex-1 bg-[#fef5f8] p-6">
      <TouchableOpacity onPress={() => router.back()} className="flex flex-row items-center mb-4 top-11">
        <Ionicons name="arrow-back" size={24} color="#D1006C" />
      </TouchableOpacity>
        <Text className="text-2xl font-bold text-pink-600 ml-2 self-center">Your AI ChatBot</Text>
      <ScrollView 
        className="flex-1 mb-4"
        contentContainerStyle={{ paddingBottom: 10, justifyContent: 'flex-end' }}
      >
        {messages.map((msg, index) => (
          <View key={index} className={`my-2 p-4 rounded-lg shadow-md ${msg.sender === 'User' ? 'bg-[#D1006C] self-end' : 'bg-[#FFC1CC] self-start'}`}>
            <Text className="font-semibold text-white">{msg.sender}:</Text>
            <Text className="text-white">{msg.text}</Text>
          </View>
        ))}
      </ScrollView>
      <View className="flex-row items-center mt-4">
    <TextInput
        value={input}
        onChangeText={setInput}
        className="border border-gray-300 bg-white shadow-md rounded-lg h-14 w-3/4 pl-4" // Using NativeWind class names
        placeholder="Type your message here..."
        placeholderTextColor="#BEBEBE"
    />
    <TouchableOpacity
        onPress={handleSend}
        className="bg-pink-600 rounded-full py-3 px-6 ml-2" // Using NativeWind class names
    >
        <Text className="text-white font-bold">Send</Text>
    </TouchableOpacity>
</View>
      {loading && <ActivityIndicator size="large" className="mt-4" color="#D1006C" />}
    </View>
  );
};

export default aiDoctor;
