// Import necessary dependencies
import React, { useState, useRef } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Modal, Alert } from 'react-native';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import Feather from '@expo/vector-icons/Feather';
import { Audio } from 'expo-av';
import whistle from '../assets/sounds/whistle.wav';
import policeSiren from '../assets/sounds/PoliceSiren.mp3';
import emergency from '../assets/sounds/emergency.wav';
import Crowd from '../assets/sounds/CrowdSound.wav';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

export default function SafetyToolkit() {
  const [isCallModalVisible, setCallModalVisible] = useState(false);
  const [currentSound, setCurrentSound] = useState(null); // Store the currently playing sound

  const router = useRouter();

  // Function to stop the current sound
  const stopCurrentSound = async () => {
    if (currentSound) {
      await currentSound.stopAsync();
      await currentSound.unloadAsync();
      setCurrentSound(null);
    }
  };

  // Function to play sound
  const playSound = async (soundUri) => {
    await stopCurrentSound(); // Stop any currently playing sound before playing a new one
    const { sound } = await Audio.Sound.createAsync(soundUri);
    setCurrentSound(sound); // Keep track of the currently playing sound
    await sound.playAsync();
  };

  // Function to stop all sounds
  const stopAllSounds = async () => {
    await stopCurrentSound(); // Stop the currently playing sound
  };

  // Function to set timer for call
  const setTimerForCall = () => {
    Alert.alert(
      "Timer Set",
      "The call will be initiated in 5 seconds.",
      [{ text: "OK" }]
    );
    setTimeout(() => {
      router.push('/components/FakeCall');
    }, 5000); // 10 seconds
  };

  return (
    <ScrollView style={styles.container}>
      {/*Back Arrow*/}
      <TouchableOpacity onPress={() => router.back()} className="absolute top-4 left-0 z-10">
                <Ionicons name="arrow-back" size={24} color="#FF69B4" />
            </TouchableOpacity>
      {/* Safety Toolkit Section */}
      <View style={styles.toolkitContainer}>
        <Text style={styles.toolkitTitle}>Your Safety Toolkit</Text>
        
        {/* Voices Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Voices</Text>
          <View style={styles.grid}>
            <View style={styles.gridItem}>
              <TouchableOpacity style={styles.voiceButton} onPress={() => playSound(policeSiren)}>
                <FontAwesome5 name="volume-up" size={24} color="white" />
                <Text style={styles.gridButtonText}>Police Siren</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.gridItem}>
              <TouchableOpacity style={styles.voiceButton} onPress={() => playSound(emergency)}>
                <FontAwesome5 name="volume-up" size={24} color="white" />
                <Text style={styles.gridButtonText}>Emergency Alarm</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.gridItem}>
              <TouchableOpacity style={styles.voiceButton} onPress={() => playSound(Crowd)}>
                <FontAwesome5 name="volume-up" size={24} color="white" />
                <Text style={styles.gridButtonText}>Crowd Sound</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.gridItem}>
              <TouchableOpacity style={styles.voiceButton} onPress={() => playSound(whistle)}>
                <FontAwesome5 name="volume-up" size={24} color="white" />
                <Text style={styles.gridButtonText}>Whistle</Text>
              </TouchableOpacity>
            </View>
          </View>
          <TouchableOpacity style={styles.stopButton} onPress={stopAllSounds}>
            <Text style={styles.stopButtonText}>Stop All Sounds</Text>
          </TouchableOpacity>
        </View>

        {/* Police Fake Call Interface Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Police Fake Call</Text>
          <View style={styles.grid}>
            <View style={styles.gridItem}>
              <TouchableOpacity style={styles.toolButton} onPress={()=>router.push('/components/FakeCall')}>
                <Feather name="phone" size={24} color="white" />
                <Text style={styles.gridButtonText}>Fake Call Now</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.gridItem}>
              <TouchableOpacity style={styles.toolButton} onPress={setTimerForCall}>
                <FontAwesome5 name="cog" size={24} color="white" />
                <Text style={styles.gridButtonText}>Set Timer for Call</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.gridItem}>
              <TouchableOpacity style={styles.toolButton} onPress={()=>router.push('/components/HowitWork')}>
                <FontAwesome5 name="info-circle" size={24} color="white" />
                <Text style={styles.gridButtonText}>How It Works</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.gridItem}>
              <TouchableOpacity style={styles.toolButton} onPress={()=>router.push('/components/FAQ')}>
                <FontAwesome5 name="question-circle" size={24} color="white" />
                <Text style={styles.gridButtonText}>FAQs</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

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
    paddingTop: 30,
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
  section: {
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#4B0082',
    marginBottom: 10,
    textAlign: 'left',
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  gridItem: {
    backgroundColor: '#FF69B4',
    borderRadius: 12,
    padding: 15,
    marginBottom: 15,
    width: '48%', // Adjust width to fit two items per row
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 5 },
    shadowRadius: 10,
    elevation: 5,
  },
  voiceButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingVertical: 12,
    paddingHorizontal: 15,
  },
  toolButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    backgroundColor: '#FF69B4',
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 15,
  },
  gridButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
    marginLeft: 10,
  },
  stopButton: {
    marginTop: 20,
    backgroundColor: '#FF1493',
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: 'center',
  },
  stopButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 20,
    padding: 20,
  },
  callName: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#4B0082',
    marginBottom: 10,
  },
  callStatus: {
    fontSize: 20,
    color: '#888',
    marginBottom: 20,
  },
  answerButton: {
    backgroundColor: '#FF69B4',
    borderRadius: 12,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  answerButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
