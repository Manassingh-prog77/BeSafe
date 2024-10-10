import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { Audio } from 'expo-av'; // Ensure you have installed expo-av
import { useRouter } from 'expo-router';
import ringtone from '../assets/sounds/ringtone.mp3'; // Ensure the path is correct

const FakeCall = () => {
    const router = useRouter();
    const [ringtoneSound, setRingtoneSound] = useState(null);

    useEffect(() => {
        playRingtone();

        // Cleanup function to stop ringtone when the component unmounts
        return () => {
            stopRingtone();
        };
    }, []);

    const playRingtone = async () => {
        try {
            const { sound } = await Audio.Sound.createAsync(
                ringtone, // Use the imported ringtone directly
                { isLooping: true } // Loop the ringtone
            );
            setRingtoneSound(sound);
            await sound.playAsync();
        } catch (error) {
            console.error('Error playing ringtone:', error);
        }
    };

    const stopRingtone = async () => {
        if (ringtoneSound) {
            await ringtoneSound.stopAsync();
            setRingtoneSound(null);
        }
    };

    const handlePickCall = () => {
        stopRingtone();
        router.back(); // Navigate back on accepting the call
    };

    const handleRejectCall = () => {
        stopRingtone();
        router.back(); // Navigate back on rejecting the call
    };

    const handleSendMessage = () => {
        // Logic to send a default message
        alert("Default message sent!"); // Replace with actual message sending logic
    };

    return (
        <View style={styles.container}>
            <Image
                source={{ uri: 'https://9to5mac.com/wp-content/uploads/sites/6/2023/09/iPhone-15-wallpaper-5.png' }} // Replace with your background image URL
                style={styles.backgroundImage}
            />
            
            {/* Caller Name at the Top */}
            <View style={styles.callInfo}>
                <Text style={styles.callerName}>DCP Uncle</Text>
            </View>

            {/* Centered Default Message Button */}
            <TouchableOpacity onPress={handleSendMessage} style={styles.messageButton}>
                <Text style={styles.messageButtonText}>Send Default Message</Text>
            </TouchableOpacity>

            {/* Accept and Reject Buttons at the Bottom */}
            <View style={styles.buttonContainer}>
                <TouchableOpacity onPress={handleRejectCall} style={styles.rejectButton}>
                    <Text style={styles.buttonText}>Reject</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={handlePickCall} style={styles.pickButton}>
                    <Text style={styles.buttonText}>Accept</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-between', // Space elements between top and bottom
        alignItems: 'center',
        backgroundColor: '#000', // Black background
        padding: 20,
    },
    backgroundImage: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        justifyContent: 'center',
        alignItems: 'center',
        resizeMode: 'cover', // Cover the entire screen
        opacity: 0.8, // Slight transparency for the background
    },
    callInfo: {
        alignItems: 'center',
        marginTop: 50, // Space from the top
    },
    callerName: {
        fontSize: 36,
        color: '#fff',
        fontWeight: 'bold',
    },
    messageButton: {
        paddingVertical: 15,
        paddingHorizontal: 30,
        backgroundColor: '#007BFF', // Blue background for the message button
        borderRadius: 20,
        marginVertical: 20, // Space above and below the button
    },
    messageButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        paddingBottom: 20,
    },
    pickButton: {
        backgroundColor: '#4CAF50', // Green for accept
        paddingVertical: 15,
        borderRadius: 30,
        flex: 1,
        marginLeft: 10,
    },
    rejectButton: {
        backgroundColor: '#F44336', // Red for reject
        paddingVertical: 15,
        borderRadius: 30,
        flex: 1,
        marginRight: 10,
    },
    buttonText: {
        textAlign: 'center',
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 20, // Slightly smaller text for buttons
    },
});

export default FakeCall;
