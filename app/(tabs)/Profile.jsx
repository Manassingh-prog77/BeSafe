import React, { useEffect, useState } from 'react';
import { View, Text, Image, TouchableOpacity, ActivityIndicator } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { doc, getDoc } from 'firebase/firestore';
import { auth, db } from '../../FirebaseConfig';
import Entypo from '@expo/vector-icons/Entypo';

export default function Profile() {
    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(true);
    const router = useRouter();
    const navigation = useNavigation();

    useEffect(() => {
        const fetchUserProfile = async () => {
            try {
                const session = await AsyncStorage.getItem('userSession');
                if (session) {
                    const sessionData = JSON.parse(session);
                    const { uid } = sessionData;

                    const userRef = doc(db, uid, 'data');
                    const docSnapshot = await getDoc(userRef);

                    if (docSnapshot.exists()) {
                        setUserData(docSnapshot.data());
                    } else {
                        console.log('No user data found');
                    }
                }
            } catch (error) {
                console.error('Error fetching user profile:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchUserProfile();
    }, []);

    const handleLogout = async () => {
        try {
            await AsyncStorage.removeItem('userSession');
            alert('Logged out successfully');
            router.push('/components/Login');
        } catch (error) {
            console.error('Error during logout:', error);
        }
    };

    if (loading) {
        return (
            <View className="flex-1 justify-center items-center bg-white">
                <ActivityIndicator size="large" color="#FF69B4" />
            </View>
        );
    }

    if (!userData) {
        return (
            <View className="flex-1 justify-center items-center bg-white">
                <Text className="text-lg text-gray-700">No user data found.</Text>
             {/* Logout Button */}
             <TouchableOpacity 
             onPress={handleLogout}
             className="bg-red-500 py-3 px-10 rounded-full mt-5 self-center shadow-lg"
         >
             <Text className="text-white font-bold text-lg flex-row items-center">
                 Logout <Entypo name="log-out" size={24} color="white" style={{ marginLeft: 10 }} />
             </Text>
         </TouchableOpacity>
            </View>
        );
    }

    return (
        <View className="flex-1 bg-gray-100 p-6 pt-11">
            {/* Header */}
            <View className="flex-row justify-between items-center mb-6">
                <Text className="text-3xl font-bold text-pink-600">My Profile</Text>
                <TouchableOpacity onPress={() => router.push('/components/Setting')}>
                    <Ionicons name="settings" size={28} color="#FF69B4" />
                </TouchableOpacity>
            </View>

            {/* Profile Picture */}
            <View className="items-center mb-6">
                <Image 
                    source={{ uri: userData.profilePicture || 'https://w7.pngwing.com/pngs/584/113/png-transparent-pink-user-icon-thumbnail.png' }} 
                    className="w-40 h-40 rounded-full border-4 border-pink-500 shadow-md"
                    resizeMode="cover" 
                />
            </View>

            {/* User Info */}
            <View className="bg-white p-6 rounded-lg shadow-md">
                <Text className="text-2xl font-semibold text-gray-900 text-center mb-2">{userData.name}</Text>
                <Text className="text-lg text-gray-600 text-center mb-2">{userData.email}</Text>
                <Text className="text-lg text-gray-600 text-center mb-2">{userData.phoneNumber}</Text>
                <Text className="text-lg text-gray-600 text-center mb-2">{userData.homeAddress}</Text>
                <Text className="text-lg text-gray-600 text-center mb-2">{userData.dateOfBirth}</Text>
            </View>

            {/* Edit Profile Button */}
            <TouchableOpacity
                className="bg-pink-600 py-3 px-10 rounded-full mt-6 self-center shadow-lg"
                onPress={() => router.push('/components/EditProfile')}
            >
                <Text className="text-white font-bold text-lg">Edit Profile</Text>
            </TouchableOpacity>

            {/* Logout Button */}
            <TouchableOpacity 
                onPress={handleLogout}
                className="bg-red-500 py-3 px-10 rounded-full mt-5 self-center shadow-lg"
            >
                <Text className="text-white font-bold text-lg flex-row items-center">
                    Logout <Entypo name="log-out" size={24} color="white" style={{ marginLeft: 10 }} />
                </Text>
            </TouchableOpacity>
        </View>
    );
}
