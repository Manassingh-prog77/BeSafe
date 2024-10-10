import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, FlatList, TouchableOpacity } from 'react-native';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../FirebaseConfig'; // Update with your Firebase path
import AntDesign from '@expo/vector-icons/AntDesign';
import { useRouter } from 'expo-router'; // Import the useRouter hook for navigation

const COMMUNITY_ROOMS_COLLECTION = 'MaincommunityRooms'; // Define your collection name here

export default function Community() {
  const [rooms, setRooms] = useState([]);
  const [filteredRooms, setFilteredRooms] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [error, setError] = useState(null); // State for error handling

  // Room categories for filtering
  const roomCategories = ['NGO Support', 'Legal Room', 'Women Help', 'Media Room', 'Health & Wellness'];

  // Fetch community rooms from Firestore
  const fetchRooms = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, COMMUNITY_ROOMS_COLLECTION));
      const roomsData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setRooms(roomsData);
      setFilteredRooms(roomsData); // Set all rooms initially
      setError(null); // Clear any previous errors
    } catch (error) {
      console.error("Error fetching rooms: ", error);
      setError("Failed to load rooms. Please try again."); // Set error message
    }
  };

  useEffect(() => {
    fetchRooms();
  }, []);

  // Filter rooms based on category and search text
  const filterRooms = () => {
    let filtered = rooms;

    if (searchText) {
      filtered = filtered.filter(room => 
        room.name.toLowerCase().includes(searchText.toLowerCase()) || 
        room.description.toLowerCase().includes(searchText.toLowerCase())
      );
    }

    if (selectedCategory) {
      filtered = filtered.filter(room => room.category === selectedCategory);
    }

    // Update state only if the filtered result is different
    if (JSON.stringify(filtered) !== JSON.stringify(filteredRooms)) {
      setFilteredRooms(filtered);
    }
  };

  useEffect(() => {
    filterRooms();
  }, [searchText, selectedCategory, rooms]);

  const router = useRouter(); // Create a router instance

  const handleRoomSelect = (roomId) => {
    router.push({ pathname: '/components/Chat', params: { roomId: roomId } });
  };
  

  return (
    <View style={{ flex: 1, backgroundColor: 'white', padding: 20 , paddingTop:40}}>
      <Text style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 20, color: '#D1006C' }}>
        Community Rooms
      </Text>

      {/* Search bar */}
      <TextInput
        style={{ borderColor: 'gray', borderWidth: 1, padding: 10, borderRadius: 5, marginBottom: 10 }}
        placeholder="Search by room name or description"
        value={searchText}
        onChangeText={setSearchText}
        placeholderTextColor="#999"
        accessibilityLabel="Search for rooms"
      />

      {/* Room Categories Filter */}
      <Text style={{ fontSize: 16, fontWeight: '600', color: 'gray', marginBottom: 10 }}>Filter by Category:</Text>
      <View style={{ flexDirection: 'row', flexWrap: 'wrap', marginBottom: 20 }}>
        {roomCategories.map((category) => (
          <TouchableOpacity
            key={category}
            onPress={() => {
              setSelectedCategory(selectedCategory === category ? '' : category); // Deselect if already selected
            }}
            style={{
              padding: 10,
              borderRadius: 20,
              backgroundColor: selectedCategory === category ? '#D1006C' : '#E0E0E0',
              marginRight: 10,
              marginBottom: 10,
            }}
            accessibilityLabel={`Filter by ${category}`} // Accessibility label for the button
          >
            <Text style={{ color: selectedCategory === category ? 'white' : '#4A4A4A', fontWeight: '500' }}>
              {category}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Error Message */}
      {error && <Text style={{ color: 'red', textAlign: 'center' }}>{error}</Text>}

      {/* List of Filtered Rooms */}
      <FlatList
        data={filteredRooms}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={{ backgroundColor: '#FFEBEE', padding: 15, borderRadius: 10, marginBottom: 10 }}
            onPress={() => handleRoomSelect(item.id)} // Navigate to the chat room on press
          >
            <Text style={{ fontSize: 18, fontWeight: 'bold', color: '#D1006C' }}>{item.name}</Text>
            <Text style={{ color: 'gray', marginTop: 5 }}>{item.description}</Text>
            <Text style={{ fontSize: 12, color: 'gray', fontStyle: 'italic', marginTop: 5 }}>{item.category}</Text>
          </TouchableOpacity>
        )}
        ListEmptyComponent={<Text style={{ textAlign: 'center', color: 'gray' }}>No rooms found</Text>}
      />

       {/* Reload Button */}
       <TouchableOpacity 
        style={{
          backgroundColor: '#D1006C',
          width: 56,
          height: 56,
          borderRadius: 28,
          justifyContent: 'center',
          alignItems: 'center',
          position: 'absolute',
          bottom: 20,
          left: 20,
        }} 
        onPress={fetchRooms} // Call fetchRooms when button is pressed
        accessibilityLabel="Reload rooms"
      >
        <AntDesign name="reload1" size={24} color="white" />
      </TouchableOpacity>

      {/* Floating + Button */}
      <TouchableOpacity
        style={{
          backgroundColor: '#D1006C',
          width: 56,
          height: 56,
          borderRadius: 28,
          position: 'absolute',
          bottom: 20,
          right: 20,
          justifyContent: 'center',
          alignItems: 'center',
        }}
        onPress={() => router.push('/components/CreateRoom')} // Use the router to navigate to CreateRoom
        accessibilityLabel="Create a new room" // Accessibility label for the button
      >
        <AntDesign name="plus" size={24} color="white" />
      </TouchableOpacity>
    </View>
  );
}
