import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, FlatList, TouchableOpacity, Switch } from 'react-native';
import { db } from '../../FirebaseConfig'; // Update with your correct path
import { collection, addDoc, getDocs } from 'firebase/firestore';
import { useRouter } from 'expo-router'; // Import useRouter from expo-router
import Ionicons from 'react-native-vector-icons/Ionicons'; // Import Ionicons for back button

export default function CreateRoom() {
    const [rooms, setRooms] = useState([]);
    const [roomName, setRoomName] = useState('');
    const [roomDescription, setRoomDescription] = useState('');
    const [isAnonymous, setIsAnonymous] = useState(false); // Toggle for anonymous posting
    const [selectedCategory, setSelectedCategory] = useState('General'); // Room categories
  
    const roomCategories = ['NGO Support', 'Legal Room', 'Women Help', 'Media Room', 'Health & Wellness'];

    const router = useRouter(); // Initialize the router

    // Fetch community rooms from Firestore
    const fetchRooms = async () => {
        const querySnapshot = await getDocs(collection(db, 'communityRooms'));
        const roomsData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setRooms(roomsData);
    };
  
    // Create a new room
    const createRoom = async () => {
        if (roomName && roomDescription) {
            await addDoc(collection(db, 'MaincommunityRooms'), {
                name: isAnonymous ? 'Anonymous' : roomName,
                description: roomDescription,
                category: selectedCategory,
                createdAt: new Date(),
            });
            setRoomName('');
            setRoomDescription('');
            fetchRooms(); // Refresh the room list
        }
    };
  
    useEffect(() => {
        fetchRooms();
    }, []);
  
    return (
        <View className="flex-1 bg-white p-5">
            {/* Back Button */}
            <TouchableOpacity
                style={{
                    position: 'absolute',
                    top: 30, // Adjust as per your design
                    left: 20,
                    zIndex: 10,
                }}
                onPress={() => router.back()}
            >
                <Ionicons name="arrow-back" size={24} color="black" />
            </TouchableOpacity>

            {/* Title */}
            <Text className="text-3xl font-bold mb-4 text-pink-500 mt-16">Create Room</Text>
            <Text className="text-lg mb-4 text-gray-500">
                Connect with other women for support, safety tips, and more.
            </Text>
  
            {/* Room Categories */}
            <View className="mb-5">
                <Text className="text-base font-semibold text-gray-600 mb-2">Select Room Category:</Text>
                <View className="flex-row flex-wrap gap-2">
                    {roomCategories.map((category) => (
                        <TouchableOpacity
                            key={category}
                            onPress={() => setSelectedCategory(category)}
                            className={`px-4 py-2 rounded-full ${selectedCategory === category ? 'bg-pink-500' : 'bg-gray-300'}`}
                        >
                            <Text className={`${selectedCategory === category ? 'text-white' : 'text-gray-700'} font-medium`}>
                                {category}
                            </Text>
                        </TouchableOpacity>
                    ))}
                </View>
            </View>
  
            {/* Input Fields */}
            <TextInput
                className="border border-pink-500 p-3 rounded-md mb-3"
                placeholder="Room Name"
                value={roomName}
                onChangeText={setRoomName}
                placeholderTextColor="#999"
            />
            <TextInput
                className="border border-pink-500 p-3 rounded-md mb-3"
                placeholder="Room Description"
                value={roomDescription}
                onChangeText={setRoomDescription}
                placeholderTextColor="#999"
            />
  
            {/* Anonymous Switch */}
            <View className="flex-row items-center mb-5">
                <Text className="text-base text-gray-600 mr-3">Post Anonymously</Text>
                <Switch
                    value={isAnonymous}
                    onValueChange={setIsAnonymous}
                    trackColor={{ false: '#ccc', true: '#FF69B4' }}
                    thumbColor={isAnonymous ? '#FF69B4' : '#f4f3f4'}
                />
            </View>
  
            {/* Create Room Button */}
            <TouchableOpacity
                onPress={createRoom}
                className="bg-pink-500 p-4 rounded-lg mt-5 shadow-md"
            >
                <Text className="text-center text-white font-bold text-lg">Create Room</Text>
            </TouchableOpacity>
        </View>
    );
}
