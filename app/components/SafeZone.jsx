import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, Alert } from 'react-native';
import * as Location from 'expo-location';
import { styled } from 'nativewind';
import { Ionicons } from '@expo/vector-icons';

// Styled components using NativeWind
const Container = styled(View, "flex-1 items-center justify-center p-4 bg-white");
const Header = styled(Text, "text-2xl font-bold text-pink-500 mb-4 text-center");
const Input = styled(TextInput, "h-12 border border-gray-300 rounded-lg p-2 mb-4 w-full");
const SubmitButton = styled(Button, "mt-2 mb-2 w-full bg-pink-500 rounded-lg");
const LocationText = styled(Text, "mt-4 text-lg text-gray-700");
const AlertText = styled(Text, "mt-2 text-lg text-red-600 font-semibold");

// Constants for the route coordinates (example)
const routeCoordinates = [
    { latitude: 37.78825, longitude: -122.4324 }, // Example start
    { latitude: 37.78875, longitude: -122.4344 }, // Example point
    { latitude: 37.79000, longitude: -122.4400 }, // Example end point
];

// Function to calculate distance using Haversine formula
const haversineDistance = (coords1, coords2) => {
    const toRad = (Value) => (Value * Math.PI) / 180;

    const lat1 = coords1.latitude;
    const lon1 = coords1.longitude;
    const lat2 = coords2.latitude;
    const lon2 = coords2.longitude;

    const R = 6371; // Radius of the earth in km
    const dLat = toRad(lat2 - lat1);
    const dLon = toRad(lon2 - lon1);
    const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c; // Distance in km
};

// Function to check if the user is close to the route
const isWithinSafeZone = (userCoords) => {
    return routeCoordinates.some(coord => {
        const distance = haversineDistance(userCoords, coord);
        return distance <= 10; // Check if within 10 km of any point on the route
    });
};

export default function SafeZone() {
    const [startLocation, setStartLocation] = useState('');
    const [destination, setDestination] = useState('');
    const [userLocation, setUserLocation] = useState(null);
    const [isOutOfBounds, setIsOutOfBounds] = useState(false);

    const handleTrackLocation = async () => {
        // Request permission to access location
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
            Alert.alert('Permission Denied', 'Please allow location access in settings.');
            return;
        }

        // Watch location
        Location.watchPositionAsync(
            {
                accuracy: Location.Accuracy.High,
                distanceInterval: 5000,
                timeInterval: 10000,
            },
            (position) => {
                const { latitude, longitude } = position.coords;
                setUserLocation({ latitude, longitude });

                // Check if user is within safe zone
                if (!isWithinSafeZone({ latitude, longitude })) {
                    setIsOutOfBounds(true);
                    Alert.alert('Alert', 'You have left your planned route. Please check your safety.');
                } else {
                    setIsOutOfBounds(false);
                }
            }
        );
    };

    const handleSubmit = () => {
        Alert.alert('Schedule Submitted', `Start: ${startLocation}, Destination: ${destination}`);
        handleTrackLocation();
    };

    return (
        <Container>
             
            <Header>SafeZone Alert</Header>
            <Input
                placeholder="Start Location"
                value={startLocation}
                onChangeText={setStartLocation}
                placeholderTextColor="#888"
            />
            <Input
                placeholder="Destination"
                value={destination}
                onChangeText={setDestination}
                placeholderTextColor="#888"
            />
            <SubmitButton title="Set Schedule" onPress={handleSubmit} color="#FF69B4" />
            {userLocation && (
                <LocationText>
                    Current Location: {userLocation.latitude.toFixed(5)}, {userLocation.longitude.toFixed(5)}
                </LocationText>
            )}
            {isOutOfBounds && <AlertText>You are out of the safe zone!</AlertText>}
        </Container>
    );
}
