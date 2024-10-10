import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, ScrollView, Alert } from 'react-native';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import Entypo from '@expo/vector-icons/Entypo';
import { useRouter } from 'expo-router';
import * as SMS from 'expo-sms';
import * as Location from 'expo-location';
import { db } from '../../FirebaseConfig'; // Make sure the path is correct
import { collection, getDocs } from 'firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Home() {
  const router = useRouter();

  const [PriorContacts, setPriorContacts] = useState([]); // State for priority contacts
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  // Fetch priority contacts from Firestore
  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const userSession = await AsyncStorage.getItem('userSession');
        if (userSession) {
          const { uid } = JSON.parse(userSession);
          const importantCollection = collection(db, uid, 'important', 'prioritycontacts');
          const contactsSnapshot = await getDocs(importantCollection);
          const phoneNumbersList = contactsSnapshot.docs.flatMap(doc => {
            const data = doc.data();
            return data.phoneNumbers.map(phone => phone.number);
          });
          setPriorContacts(phoneNumbersList);
        } else {
          Alert.alert('Error', 'No user session found. Please log in.');
        }
      } catch (error) {
        console.error('Error fetching contacts:', error);
        Alert.alert('Error', 'Could not fetch contacts. Please try again later.');
      }
    };

    fetchContacts();
  }, []);

  // Function to send SOS message
  const sendSOSMessage = async () => {
    const message = 'There is an Emergency';
    const contacts = PriorContacts || [];
    const validContacts = contacts.filter(contact => contact && contact.trim() !== '');

    if (validContacts.length === 0) {
      Alert.alert('No Contacts', 'Please add emergency contacts before sending an SOS message.');
      return;
    }

    try {
      const isAvailable = await SMS.isAvailableAsync();
      if (isAvailable) {
        await SMS.sendSMSAsync(validContacts, message);
        Alert.alert('SOS Alert Sent', 'Your SOS message has been sent to your emergency contacts.');
      } else {
        Alert.alert('SMS Not Available', 'Your device does not support SMS messaging.');
      }
    } catch (error) {
      Alert.alert('Error', 'Could not send SOS message. Please try again later.');
      console.error(error);
    }
  };

  // Function to share location
  const shareLocation = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      setErrorMsg('Permission to access location was denied');
      return;
    }

    let location = await Location.getCurrentPositionAsync({});
    setLocation(location);
    const { latitude, longitude } = location.coords;
    const message = `I need help. My current location is: https://www.google.com/maps/search/?api=1&query=${latitude},${longitude}`;
    const contacts = PriorContacts.map(contact => contact);

    try {
      const isAvailable = await SMS.isAvailableAsync();
      if (isAvailable) {
        await SMS.sendSMSAsync(contacts, message);
        Alert.alert('Location Shared', 'Your location has been shared with your emergency contacts.');
      } else {
        Alert.alert('SMS Not Available', 'Your device does not support SMS messaging.');
      }
    } catch (error) {
      Alert.alert('Error', 'Could not share location. Please try again later.');
      console.error(error);
    }
  };

  return (
    <ScrollView style={styles.container}>
      {/* Hero / Welcome Section */}
      <View style={styles.heroSection}>
        <Text style={styles.welcomeText}>Welcome to Your Safety Hub</Text>
        <Text style={styles.subtitleText}>Empowering Women Everywhere</Text>
        <Image
          source={require('../assets/images/hero.png')}
          style={styles.heroImage}
        />
      </View>

      {/* Safety Toolkit Section */}
      <View style={styles.toolkitContainer}>
        <Text style={styles.toolkitTitle}>Your Safety Toolkit</Text>

        {/* SOS Feature */}
        <TouchableOpacity style={styles.featureButton} onPress={sendSOSMessage}>
          <FontAwesome5 name="bell" size={24} color="white" />
          <Text style={styles.buttonText}>SOS Alert</Text>
        </TouchableOpacity>

        {/* Manage Contacts Feature */}
        <TouchableOpacity style={styles.featureButton} onPress={() => router.push('/components/ManageContact')}>
          <FontAwesome5 name="address-book" size={24} color="white" />
          <Text style={styles.buttonText}>Manage Contacts</Text>
        </TouchableOpacity>

        {/* Location Sharing Feature */}
        <TouchableOpacity style={styles.featureButton} onPress={shareLocation}>
          <FontAwesome name="map-marker" size={24} color="white" />
          <Text style={styles.buttonText}>Share Location</Text>
        </TouchableOpacity>

        {/* Safe Zone Feature */}
        <TouchableOpacity style={styles.featureButton} onPress={() => router.push('/components/aiDoctor')}>
        <Entypo name="chat" size={24} color="white" />
          <Text style={styles.buttonText}>Ai ChatBot</Text>
        </TouchableOpacity>

        {/* Safety Toolkit Feature */}
        <TouchableOpacity style={styles.featureButton} onPress={() => router.push('/components/SafetyToolkit')}>
          <FontAwesome5 name="tools" size={24} color="white" />
          <Text style={styles.buttonText}>Safety Toolkit</Text>
        </TouchableOpacity>
        
        {/* Self-Defense Tutorials Feature */}
        <TouchableOpacity style={styles.featureButton} onPress={() => router.push('/components/SelfDefence')}>
          <FontAwesome name="video-camera" size={24} color="white" />
          <Text style={styles.buttonText}>Self-Defense Tutorials</Text>
        </TouchableOpacity>

        {/* Quick Tips */}
        <TouchableOpacity style={styles.featureButton} onPress={() => router.push('/components/QuickSafety')}>
          <FontAwesome5 name="lightbulb" size={24} color="white" />
          <Text style={styles.buttonText}>Quick Safety Tips</Text>
        </TouchableOpacity>


      </View>
    </ScrollView>
  );
}

// Native CSS for Advanced Styling
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f7f7f7',
    padding: 20,
    paddingTop: 20
  },
  heroSection: {
    alignItems: 'center',
    marginBottom: 30,
  },
  welcomeText: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FF69B4',
    textAlign: 'center',
    marginVertical: 10,
  },
  subtitleText: {
    fontSize: 18,
    color: '#696969',
    textAlign: 'center',
    marginBottom: 20,
  },
  heroImage: {
    width: '100%',
    height: 250,
    borderRadius: 15,
  },
  toolkitContainer: {
    marginTop: 10,
    marginBottom: 50,
  },
  toolkitTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#4B0082',
    marginBottom: 20,
    textAlign: 'center',
  },
  featureButton: {
    backgroundColor: '#FF69B4',
    borderRadius: 12,
    paddingVertical: 20,
    paddingHorizontal: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 15,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 5 },
    shadowRadius: 10,
    elevation: 5,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 18,
    marginLeft: 10,
  },
});
