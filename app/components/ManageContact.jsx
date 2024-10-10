import React, { useEffect, useState } from 'react';
import { View, Text, Button, FlatList, StyleSheet, Alert, TouchableOpacity, TextInput } from 'react-native';
import * as Contacts from 'expo-contacts';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { db } from '../../FirebaseConfig'; // Adjust the path according to your project structure
import { collection, addDoc, getDocs, deleteDoc, doc, query } from 'firebase/firestore'; // Import Firestore functions
import AsyncStorage from '@react-native-async-storage/async-storage'; // Import AsyncStorage

export default function ManageContacts() {
    const [contacts, setContacts] = useState([]);
    const [filteredContacts, setFilteredContacts] = useState([]);
    const [permissionGranted, setPermissionGranted] = useState(null);
    const [selectedContacts, setSelectedContacts] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const navigation = useNavigation();
    const [uid, setUid] = useState(null); // State for user uid

    const requestContactPermission = async () => {
        const { status } = await Contacts.requestPermissionsAsync();
        setPermissionGranted(status === 'granted');

        if (status === 'granted') {
            getContacts();
        } else {
            Alert.alert(
                "Permission Denied",
                "To display your contacts, please allow permission in your device settings.",
                [{ text: "OK" }]
            );
        }
    };

    const getContacts = async () => {
        const { data } = await Contacts.getContactsAsync({
            fields: [Contacts.Fields.PhoneNumbers],
        });
        if (data.length > 0) {
            setContacts(data);
            setFilteredContacts(data); // Initialize filtered contacts
        }
    };

    const fetchUserSession = async () => {
        const session = await AsyncStorage.getItem('userSession');
        if (session) {
            const userData = JSON.parse(session);
            setUid(userData.uid);
        }
    };

    useEffect(() => {
        fetchUserSession();
        const checkPermissions = async () => {
            const { status } = await Contacts.getPermissionsAsync();
            setPermissionGranted(status === 'granted');
            if (status === 'granted') {
                getContacts();
            }
        };
        checkPermissions();
    }, []);

    const handleSelectContact = (contact) => {
        if (selectedContacts.includes(contact)) {
            setSelectedContacts(selectedContacts.filter((c) => c.id !== contact.id));
        } else {
            if (selectedContacts.length >= 5) {
                Alert.alert(
                    "Selection Limit Reached",
                    "You can only select up to 5 contacts.",
                    [{ text: "OK" }]
                );
                return;
            }
            setSelectedContacts([...selectedContacts, contact]);
        }
    };

    const handleSearch = (query) => {
        setSearchQuery(query);
        if (query) {
            const filteredData = contacts.filter(contact =>
                contact.name.toLowerCase().includes(query.toLowerCase())
            );
            setFilteredContacts(filteredData);
        } else {
            setFilteredContacts(contacts);
        }
    };

    const handleSubmit = async () => {
        if (!uid) {
            Alert.alert("Error", "User UID is not available.");
            return;
        }

        try {
            const priorityContactsRef = collection(db, uid, 'important', 'prioritycontacts'); // Reference to priority contacts

            // Check if the collection already exists
            const existingContactsQuery = query(priorityContactsRef);
            const existingContactsSnapshot = await getDocs(existingContactsQuery);

            if (existingContactsSnapshot.empty) {
                // If the collection doesn't exist, create it
                for (const contact of selectedContacts) {
                    await addDoc(priorityContactsRef, {
                        name: contact.name,
                        phoneNumbers: contact.phoneNumbers ? contact.phoneNumbers : [],
                    });
                }
                Alert.alert("Success", "Contacts saved successfully!");
            } else {
                // If the collection exists, clear existing contacts first
                const deletePromises = existingContactsSnapshot.docs.map(contactDoc => deleteDoc(doc(priorityContactsRef, contactDoc.id)));

                // Wait for all delete operations to complete
                await Promise.all(deletePromises);

                // Then add new selected contacts
                for (const contact of selectedContacts) {
                    await addDoc(priorityContactsRef, {
                        name: contact.name,
                        phoneNumbers: contact.phoneNumbers ? contact.phoneNumbers : [],
                    });
                }
                Alert.alert("Updated", "Contacts updated successfully!");
            }

            setSelectedContacts([]); // Reset selected contacts
        } catch (error) {
            console.error("Error adding document: ", error);
            Alert.alert("Error", "There was an error saving the contacts.");
        }
    };

    return (
        <View className="flex-1 bg-white p-4 pt-12">
            <Text className="text-3xl font-bold text-center text-[#FF69B4] mb-6">Manage Contacts</Text>
            <TouchableOpacity onPress={() => navigation.goBack()} className="absolute top-14 left-4 z-10">
                <Ionicons name="arrow-back" size={24} color="#FF69B4" />
            </TouchableOpacity>

            {permissionGranted === null ? (
                <Text className="text-lg text-gray-500 text-center">Checking permissions...</Text>
            ) : permissionGranted ? (
                <>
                    <TextInput
                        style={styles.searchInput}
                        placeholder="Search Contacts"
                        value={searchQuery}
                        onChangeText={handleSearch}
                    />
                    <FlatList
                        data={filteredContacts}
                        keyExtractor={(item) => item.id}
                        renderItem={({ item }) => (
                            <TouchableOpacity 
                                onPress={() => handleSelectContact(item)} 
                                style={[styles.contactItem, selectedContacts.includes(item) ? styles.selected : null]}
                            >
                                <Text className="text-lg font-semibold text-black">{item.name}</Text>
                            </TouchableOpacity>
                        )}
                    />
                    {selectedContacts.length >= 2 && (
                        <TouchableOpacity
                            style={styles.submitButton}
                            onPress={handleSubmit}
                        >
                            <Text className="text-white font-bold text-center">Submit</Text>
                        </TouchableOpacity>
                    )}
                </>
            ) : (
                <View className="justify-center items-center mt-10">
                    <Text className="text-red-500 text-lg font-semibold text-center mb-4">
                        Permission denied to access contacts.
                    </Text>
                    <Button
                        title="Grant Permission"
                        onPress={requestContactPermission}
                        color="#FF69B4"
                    />
                </View>
            )}
        </View>
    );
}

// Styles
const styles = StyleSheet.create({
    contactItem: {
        backgroundColor: '#f0f0f0',
        padding: 15,
        borderRadius: 10,
        marginBottom: 10,
    },
    selected: {
        backgroundColor: '#FF69B4',
    },
    submitButton: {
        backgroundColor: '#FF69B4',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
        marginTop: 20,
        alignSelf: 'center',
    },
    searchInput: {
        height: 40,
        borderColor: '#FF69B4',
        borderWidth: 1,
        borderRadius: 5,
        marginBottom: 10,
        paddingHorizontal: 10,
    },
});
