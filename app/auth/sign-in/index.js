import React, { useState } from 'react';
import { View, Image, Text, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import Ionicons from '@expo/vector-icons/Ionicons'; // Importing Ionicons for the back button
import { auth } from '../../../FirebaseConfig'; // Import Firebase authentication
import { signInWithEmailAndPassword } from 'firebase/auth'; // Firebase sign-in function
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function SignIn() {
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false); // Track loading state

    const handleSignIn = async () => {
        if (email === '' || password === '') {
            Alert.alert("Error", "All fields are required!");
            return;
        }
        setLoading(true); // Start loading
        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;
    
            // Store user data in AsyncStorage
            const userData = {
                uid: user.uid,
                email: user.email,
                // Add any other user details you want to store
            };
            await AsyncStorage.setItem('userSession', JSON.stringify(userData));
    
            Alert.alert('Sign-In Successful', `Welcome back, ${user.email}!`);
            router.push('/Home'); // Redirect to home page
        } catch (error) {
            Alert.alert('Sign-In Failed', error.message);
        } finally {
            setLoading(false); // Stop loading
        }
    };
    

    return (
        <KeyboardAvoidingView
            style={{
                flex: 1,
                position: 'relative',
                backgroundColor: '#fff', // Pink and white theme
            }}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
          {/* Back Button */}
            <TouchableOpacity
                style={{
                    position: 'absolute',
                    top: 50, // Adjust as per your design
                    left: 20,
                    zIndex: 10,
                }}
                onPress={() => router.back()}
            >
                <Ionicons name="arrow-back" size={24} color="black" />
            </TouchableOpacity>

            <View
                style={{
                    flex: 1,
                    justifyContent: 'center',
                    padding: 20,
                    backgroundColor: 'rgba(255, 182, 193, 0.8)', // Pink background with transparency
                    borderRadius: 10,
                    marginHorizontal: 20,
                    shadowColor: '#000',
                    shadowOffset: {
                        width: 0,
                        height: 2,
                    },
                    shadowOpacity: 0.25,
                    shadowRadius: 3.84,
                    elevation: 5,
                }}
            >
                {/* Header */}
                <Text
                    style={{
                        fontSize: 28,
                        fontWeight: 'bold',
                        color: '#FF69B4', // Hot pink color
                        textAlign: 'center',
                    }}
                >
                    Welcome Back!
                </Text>
                <Text
                    style={{
                        fontSize: 16,
                        color: '#fff',
                        textAlign: 'center',
                        marginBottom: 30,
                    }}
                >
                    Sign in to continue
                </Text>

                {/* Input Fields */}
                <View style={{ marginBottom: 20 }}>
                    <TextInput
                        style={{
                            height: 50,
                            borderColor: '#FF69B4',
                            borderWidth: 1,
                            borderRadius: 5,
                            paddingHorizontal: 15,
                            marginBottom: 15,
                            backgroundColor: '#fff', // White input field
                            color: '#333',
                            fontSize: 16,
                        }}
                        placeholder="Email"
                        placeholderTextColor="#A3A3A3"
                        value={email}
                        onChangeText={setEmail}
                        keyboardType="email-address"
                    />
                    <TextInput
                        style={{
                            height: 50,
                            borderColor: '#FF69B4',
                            borderWidth: 1,
                            borderRadius: 5,
                            paddingHorizontal: 15,
                            marginBottom: 15,
                            backgroundColor: '#fff', // White input field
                            color: '#333',
                            fontSize: 16,
                        }}
                        placeholder="Password"
                        placeholderTextColor="#A3A3A3"
                        value={password}
                        onChangeText={setPassword}
                        secureTextEntry
                    />
                </View>

                {/* Sign In Button */}
                <TouchableOpacity
                    style={{
                        backgroundColor: '#FF69B4', // Hot pink button
                        borderRadius: 5,
                        paddingVertical: 15,
                        alignItems: 'center',
                        marginTop: 10,
                    }}
                    onPress={handleSignIn}
                    disabled={loading} // Disable button while loading
                >
                    <Text
                        style={{
                            color: '#fff',
                            fontWeight: 'bold',
                            fontSize: 16,
                        }}
                    >
                        {loading ? 'Signing In...' : 'Sign In'}
                    </Text>
                </TouchableOpacity>

                {/* Additional Links */}
                <View style={{ marginTop: 20, alignItems: 'center' }}>
                    <Text style={{ color: '#777' }}>
                        Don't have an account?{' '}
                        <Text
                            style={{
                                color: '#FF69B4',
                                fontWeight: 'bold',
                            }}
                            onPress={() => router.push('auth/sign-up')}
                        >
                            Sign Up
                        </Text>
                    </Text>
                </View>
            </View>
        </KeyboardAvoidingView>
    );
}
