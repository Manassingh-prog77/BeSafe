import { View, Image, Text, TouchableOpacity } from 'react-native';
import React from 'react';
import { useRouter } from 'expo-router'; // Make sure this is the correct import for routing

export default function Login() {
  const router = useRouter();

  return (
    <View className="flex-1 bg-white">
      {/* Background Image */}
      <View className="h-1/2">
        <Image
          source={require('../assets/images/home.png')} // Adjust the path as necessary
          className="w-full h-full"
          style={{ resizeMode: 'cover' }} // Ensure the image scales properly
        />
      </View>

      {/* Information Container */}
      <View className="flex-1 justify-end bg-gray-50 p-6 rounded-tl-lg rounded-tr-lg shadow-lg">
        {/* App Description */}
        <View className="mb-4">
          <Text className="text-center text-3xl outfit-bold" style={{ fontFamily: 'outfit-bold', color: '#4B0082' }}>
            Welcome to I Am Safe!
          </Text>
          <Text className="text-center mt-1 text-lg" style={{ fontFamily: 'outfit-medium', color: '#555555' }}>
            Our app is designed to empower and protect women by providing instant access to safety features, emergency contacts, and educational resources. Together, we can create a safer environment for everyone.
          </Text>
        </View>

        {/* Get Started Button */}
        <TouchableOpacity
          className="bg-purple-800 rounded-lg p-4 mt-4 shadow-lg"
          onPress={() => {
            // Use a string path for routing
            router.push('auth/sign-in'); // Adjust the path as necessary
          }}
        >
          <Text className="text-center text-white text-lg font-bold" style={{ fontFamily: 'outfit-bold' }}>
            Get Started
          </Text>
        </TouchableOpacity>

        {/* Additional Links */}
        <View className="mt-5">
          <Text className="text-center" style={{ fontFamily: 'outfit-regular', color: '#777777' }}>
            Join us in our mission to enhance women's safety.{' '}
            <Text className="text-purple-700 font-semibold" onPress={()=>router.push('/components/LearnMore')}>Learn More</Text>
          </Text>
        </View>
      </View>
    </View>
  );
}
