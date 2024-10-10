import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import Ionicons from '@expo/vector-icons/Ionicons'; 
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { auth, db } from '../../../FirebaseConfig'; // Ensure Firebase Firestore is correctly configured and imported
import AsyncStorage from '@react-native-async-storage/async-storage'; // Import AsyncStorage


export default function SignUp() {
    const router = useRouter();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [dateOfBirth, setDateOfBirth] = useState('');
    const [homeAddress, setHomeAddress] = useState('');

    // Function to handle account creation
    const handleSignUp = async () => {
        if (password !== confirmPassword) {
            Alert.alert("Error", "Passwords do not match!");
            return;
        }
    
        if (name === '' || email === '' || password === '' || phoneNumber === '' || dateOfBirth === '' || homeAddress === '') {
            Alert.alert("Error", "All fields are required!");
            return;
        }
    
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;
    
            // Store additional user information in Firestore
            const userRef = doc(db, user.uid, 'data'); // Create subcollection
            await setDoc(userRef, {
                name: name,
                email: email,
                phoneNumber: phoneNumber,
                dateOfBirth: dateOfBirth,
                homeAddress: homeAddress,
            });
    
            // Store user UID and other data in AsyncStorage
            const userData = {
                uid: user.uid,
                email: email
            };
            await AsyncStorage.setItem('userSession', JSON.stringify(userData));
    
            Alert.alert("Success", "Account created successfully!");
            router.push('/Home'); // Redirect to home or other pages after successful signup
        } catch (error) {
            console.error("Error during sign up: ", error);
            Alert.alert("Error", error.message);
        }
    };

    return (
        <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
            
            {/* Back Button */}
            <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
                <Ionicons name="arrow-back" size={24} color="black" />
            </TouchableOpacity>

            {/* Sign Up Form */}
            <View style={styles.formContainer}>
                <Text style={styles.title}>Create Your Account</Text>
                <Text style={styles.subtitle}>Sign up to join our community</Text>

                {/* Input Fields */}
                <View style={styles.inputContainer}>
                    <View style={styles.inputWrapper}>
                        <Ionicons name="person-outline" size={20} color="#ff66cc" />
                        <TextInput
                            style={styles.input}
                            placeholder="Full Name"
                            placeholderTextColor="#ff99cc"
                            value={name}
                            onChangeText={setName}
                        />
                    </View>
                    <View style={styles.inputWrapper}>
                        <Ionicons name="mail-outline" size={20} color="#ff66cc" />
                        <TextInput
                            style={styles.input}
                            placeholder="Email"
                            placeholderTextColor="#ff99cc"
                            value={email}
                            onChangeText={setEmail}
                            keyboardType="email-address"
                        />
                    </View>
                    <View style={styles.inputWrapper}>
                        <Ionicons name="call-outline" size={20} color="#ff66cc" />
                        <TextInput
                            style={styles.input}
                            placeholder="Phone Number"
                            placeholderTextColor="#ff99cc"
                            value={phoneNumber}
                            onChangeText={setPhoneNumber}
                        />
                    </View>
                    <View style={styles.inputWrapper}>
                        <Ionicons name="calendar-outline" size={20} color="#ff66cc" />
                        <TextInput
                            style={styles.input}
                            placeholder="Date of Birth (DD/MM/YYYY)"
                            placeholderTextColor="#ff99cc"
                            value={dateOfBirth}
                            onChangeText={setDateOfBirth}
                        />
                    </View>
                    <View style={styles.inputWrapper}>
                        <Ionicons name="home-outline" size={20} color="#ff66cc" />
                        <TextInput
                            style={styles.input}
                            placeholder="Home Address"
                            placeholderTextColor="#ff99cc"
                            value={homeAddress}
                            onChangeText={setHomeAddress}
                        />
                    </View>
                    <View style={styles.inputWrapper}>
                        <Ionicons name="lock-closed-outline" size={20} color="#ff66cc" />
                        <TextInput
                            style={styles.input}
                            placeholder="Password"
                            placeholderTextColor="#ff99cc"
                            value={password}
                            onChangeText={setPassword}
                            secureTextEntry
                        />
                    </View>
                    <View style={styles.inputWrapper}>
                        <Ionicons name="lock-closed-outline" size={20} color="#ff66cc" />
                        <TextInput
                            style={styles.input}
                            placeholder="Confirm Password"
                            placeholderTextColor="#ff99cc"
                            value={confirmPassword}
                            onChangeText={setConfirmPassword}
                            secureTextEntry
                        />
                    </View>
                </View>

                {/* Sign Up Button */}
                <TouchableOpacity style={styles.signUpButton} onPress={handleSignUp}>
                    <Text style={styles.signUpButtonText}>Sign Up</Text>
                </TouchableOpacity>

                {/* Additional Links */}
                <View style={styles.additionalLinks}>
                    <Text style={styles.additionalText}>
                        Already have an account?
                        <Text style={styles.signInLink} onPress={() => router.push('auth/sign-in')}>
                            {' Sign In'}
                        </Text>
                    </Text>
                </View>
            </View>
        </KeyboardAvoidingView>
    );
}

// Native CSS for styling the components
const styles = {
    container: {
        flex: 1,
        position: 'relative',
        justifyContent: 'center',
    },
    backButton: {
        position: 'absolute',
        top: 50,
        left: 20,
        padding: 10,
        borderRadius: 50,
        zIndex: 10,
    },
    formContainer: {
        flex: 1,
        justifyContent: 'center',
        padding: 20,
        marginHorizontal: 20,
        backgroundColor: 'rgba(255, 255, 255, 0.85)',
        borderRadius: 15,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 5 },
        shadowOpacity: 0.2,
        shadowRadius: 5,
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#ff66cc',
        textAlign: 'center',
        marginBottom: 10,
    },
    subtitle: {
        fontSize: 16,
        color: '#ff99cc',
        textAlign: 'center',
        marginBottom: 20,
    },
    inputContainer: {
        marginBottom: 15,
    },
    inputWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        borderColor: '#ff66cc',
        borderWidth: 1,
        borderRadius: 10,
        paddingHorizontal: 10,
        marginBottom: 10,
        backgroundColor: 'white',
    },
    input: {
        flex: 1,
        padding: 10,
        color: '#ff66cc',
        fontSize: 16,
    },
    signUpButton: {
        backgroundColor: '#ff66cc',
        borderRadius: 10,
        paddingVertical: 12,
        alignItems: 'center',
        marginTop: 10,
    },
    signUpButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    additionalLinks: {
        alignItems: 'center',
        marginTop: 10,
    },
    additionalText: {
        color: '#ff99cc',
    },
    signInLink: {
        color: '#ff66cc',
        fontWeight: 'bold',
    },
};
