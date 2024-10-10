import React, { useState ,useEffect} from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Entypo from '@expo/vector-icons/Entypo';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { doc, updateDoc } from 'firebase/firestore'; // Firebase imports
import { db } from '../../FirebaseConfig'; // Import your Firebase configuration

export default function EditProfile() {
    const navigation = useNavigation();
    const router = useRouter();

    // State for form fields
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [bio, setBio] = useState('Empowered women empower women. Passionate about mental health and community support.');
    const [address, setAddress] = useState('');

    const [userUid, setUserUid] = useState(null); // Save user UID

    // Use effect to get the user UID only (not fetching profile data)
    useEffect(() => {
        const getUserUid = async () => {
            try {
                const userSession = await AsyncStorage.getItem('userSession');
                if (userSession) {
                    const { uid } = JSON.parse(userSession);
                    setUserUid(uid); // Store UID for future updates
                } else {
                    Alert.alert('Error', 'No user session found. Please log in.');
                }
            } catch (error) {
                console.error('Error fetching user UID:', error);
                Alert.alert('Error', 'Could not fetch user UID. Please try again later.');
            }
        };

        getUserUid();
    }, []);

    // Handle Save Profile with validation
    const handleSaveProfile = async () => {
        if (!name || !email || !phone || !bio || !address) {
            Alert.alert('Validation Error', 'All fields are required!');
            return;
        }

        try {
            if (userUid) {
                const userDocRef = doc(db, userUid, 'data'); // Reference to the user's document

                // Update profile data in Firestore
                await updateDoc(userDocRef, {
                    name,
                    email,
                    phone,
                    address,
                });

                Alert.alert('Success', 'Profile updated successfully!');
                navigation.navigate('Profile'); // Navigate back to Profile after saving
            } else {
                Alert.alert('Error', 'No user session found. Please log in.');
            }
        } catch (error) {
            console.error('Error updating profile:', error);
            Alert.alert('Error', 'Could not update profile. Please try again later.');
        }
    };

    return (
        <ScrollView className="flex-1 bg-white p-6 rounded-lg shadow-lg pt-11">
            <TouchableOpacity onPress={() => router.back()} className="absolute top-0 left-0 z-10">
                <Entypo name="cross" size={30} color="#ec4899" />
            </TouchableOpacity>
            <Text className="text-3xl font-bold text-pink-500 mb-6 text-center">Edit Profile</Text>

            {/* Name Input */}
            <View className="mb-5">
                <Text className="text-lg font-bold text-gray-700 mb-2">Name</Text>
                <TextInput
                    value={name}
                    onChangeText={setName}
                    placeholder="Enter your name"
                    className="border border-pink-400 rounded-lg px-4 py-3 text-base text-gray-700"
                />
            </View>

            {/* Email Input */}
            <View className="mb-5">
                <Text className="text-lg font-bold text-gray-700 mb-2">Email</Text>
                <TextInput
                    value={email}
                    onChangeText={setEmail}
                    placeholder="Enter your email"
                    keyboardType="email-address"
                    className="border border-pink-400 rounded-lg px-4 py-3 text-base text-gray-700"
                />
            </View>

            {/* Phone Input */}
            <View className="mb-5">
                <Text className="text-lg font-bold text-gray-700 mb-2">Phone Number</Text>
                <TextInput
                    value={phone}
                    onChangeText={setPhone}
                    placeholder="Enter your phone number"
                    keyboardType="phone-pad"
                    className="border border-pink-400 rounded-lg px-4 py-3 text-base text-gray-700"
                />
            </View>

            {/* Bio Input */}
            <View className="mb-5">
                <Text className="text-lg font-bold text-gray-700 mb-2">Bio</Text>
                <Text className="border border-pink-400 rounded-lg px-4 py-3 text-base text-gray-700">{bio}</Text>
            </View>

            {/* Address Input */}
            <View className="mb-5">
                <Text className="text-lg font-bold text-gray-700 mb-2">House Address</Text>
                <TextInput
                    value={address}
                    onChangeText={setAddress}
                    placeholder="Enter your house address"
                    className="border border-pink-400 rounded-lg px-4 py-3 text-base text-gray-700"
                />
            </View>

            {/* Save Button */}
            <TouchableOpacity 
                onPress={handleSaveProfile}
                className="bg-pink-500 py-3 px-8 rounded-full shadow-lg mt-6 self-center">
                <Text className="text-white font-bold text-lg">Save Profile</Text>
            </TouchableOpacity>
        </ScrollView>
    );
}
