import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TextInput, Button, KeyboardAvoidingView, Platform } from 'react-native';
import { useRouter } from 'expo-router';
import { db } from '../../FirebaseConfig';
import { doc, onSnapshot, updateDoc, arrayUnion } from 'firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useLocalSearchParams } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

export default function Chat() {
  const router = useRouter();
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [userId, setUserId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [roomName, setRoomName] = useState('');
  const { roomId } = useLocalSearchParams();

  // Fetch userId from AsyncStorage
  useEffect(() => {
    const fetchUserId = async () => {
      try {
        const storedUserId = await AsyncStorage.getItem('userSession');
        const storedUserIdfinal = JSON.parse(storedUserId);
        setUserId(storedUserIdfinal);
      } catch (error) {
        console.error("Error fetching userId from AsyncStorage:", error);
      }
    };
    fetchUserId();
  }, []);

  // Fetch room name and messages for the selected room
  useEffect(() => {
    if (!roomId) return;

    const unsubscribeRoom = onSnapshot(doc(db, 'MaincommunityRooms', roomId), (doc) => {
      if (doc.exists()) {
        const data = doc.data();
        setRoomName(data.name || 'Chat Room');
        setMessages(data.chats || []);
      } else {
        console.log("No such document!");
      }
      setLoading(false);
    }, (error) => {
      console.error("Error fetching document:", error);
      setLoading(false);
    });

    return () => unsubscribeRoom();
  }, [roomId]);

  // Function to handle sending a new message
  const handleSendMessage = async () => {
    if (newMessage.trim() === '' || !userId) return;

    const messageData = {
      text: newMessage,
      userId: userId,
      timestamp: new Date(),
    };

    try {
      await updateDoc(doc(db, 'MaincommunityRooms', roomId), {
        chats: arrayUnion(messageData),
      });
      setNewMessage(''); // Clear the input after sending
    } catch (error) {
      console.error("Error sending message: ", error);
    }
  };

  if (loading) {
    return (
      <View className="flex-1 justify-center items-center bg-white">
        <Text className="text-lg text-pink-600">Loading messages...</Text>
      </View>
    );
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      className="flex-1 bg-white p-5"
    >
      
      <Text className="text-2xl font-bold text-pink-600 mb-4 pt-8 self-center">Chat Room: {roomName}</Text>
      
      {/* Display Messages */}
      {messages.length > 0 ? (
        <FlatList
          data={messages}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <View className="my-2 p-3 bg-gray-100 rounded-lg shadow-md">
              <Text className="text-xs text-gray-500">{item.userId.email || item.userId}</Text>
              <Text className="text-lg">{item.text}</Text>
            </View>
          )}
          contentContainerStyle={{ paddingBottom: 20 }}
        />
      ) : (
        <Text className="text-gray-500 text-center mt-4">No messages yet. Start the conversation!</Text>
      )}

      {/* Chat Input Box */}
      <View className="flex-row items-center border-t border-gray-300 pt-3">
        <TextInput
          className="flex-1 h-10 p-2 border border-gray-300 rounded-lg mr-2"
          placeholder="Type a message..."
          value={newMessage}
          onChangeText={setNewMessage}
        />
        <Button title="Send" onPress={handleSendMessage} color="#D1006C" />
      </View>
    </KeyboardAvoidingView>
  );
}
