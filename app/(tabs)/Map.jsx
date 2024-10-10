import React, { useEffect, useState, useCallback } from 'react';
import { View, Text, ActivityIndicator, Linking, TouchableOpacity } from 'react-native';
import * as Location from 'expo-location';
import { useFocusEffect } from '@react-navigation/native';
import MapView, { Marker } from 'react-native-maps';
import { styled } from 'nativewind';
import { FontAwesome5 } from '@expo/vector-icons';

const StyledView = styled(View);
const StyledText = styled(Text);

const Map = () => {
    const [location, setLocation] = useState(null);
    const [nearestFacility, setNearestFacility] = useState(null);
    const [loading, setLoading] = useState(false);
    const [errorMsg, setErrorMsg] = useState(null);
    const [mapRegion, setMapRegion] = useState({
        latitude: 37.78825,
        longitude: -122.4324,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
    });

    const apiKey = 'Enter_Your_Api_Key';
    const searchRadius = 500; // Stop if a facility is found within 500 meters

    const getDistance = (lat1, lon1, lat2, lon2) => {
        const toRad = (value) => (value * Math.PI) / 180;
        const R = 6371e3; // Earth's radius in meters
        const φ1 = toRad(lat1);
        const φ2 = toRad(lat2);
        const Δφ = toRad(lat2 - lat1);
        const Δλ = toRad(lon2 - lon1);

        const a = Math.sin(Δφ / 2) ** 2 + Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) ** 2;
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        return R * c; // Distance in meters
    };

    const fetchNearestSafeLocation = async (latitude, longitude) => {
        setLoading(true);
        const categories = [
            "service.police",
            "healthcare.hospital",
            "healthcare.pharmacy",
            "healthcare",
            "activity.community_center",
            "activity.sport_club",
            "building.college",
            "building.military",
            "building.service",
            "commercial.supermarket",
            "commercial.marketplace",
            "commercial.shopping_mall",
            "education.library",
            "education.college",
            "education.university",
            "education"
        ];
        const radius = 2000; // Search within 2000 meters

        let nearest = null;
        let minDistance = Infinity;

        for (const category of categories) {
            const url = `https://api.geoapify.com/v2/places?categories=${category}&filter=circle:${longitude},${latitude},${radius}&limit=5&apiKey=${apiKey}`;

            try {
                const response = await fetch(url);
                const data = await response.json();

                if (data.features?.length) {
                    for (const feature of data.features) {
                        const { name, lat, lon } = feature.properties;
                        const facilityDistance = getDistance(latitude, longitude, lat, lon);

                        if (facilityDistance < searchRadius) {
                            nearest = {
                                name: name || "Unnamed Facility",
                                latitude: lat,
                                longitude: lon,
                                type: feature.properties.categories.join(', '),
                                distance: facilityDistance,
                            };
                            setNearestFacility(nearest);
                            setMapRegion({
                                latitude: lat,
                                longitude: lon,
                                latitudeDelta: 0.005,
                                longitudeDelta: 0.005,
                            });
                            setLoading(false);
                            return; // Exit early if a facility is found within 500m
                        }

                        if (facilityDistance < minDistance) {
                            minDistance = facilityDistance;
                            nearest = {
                                name: name || "Unnamed Facility",
                                latitude: lat,
                                longitude: lon,
                                type: feature.properties.categories.join(', '),
                                distance: facilityDistance,
                            };
                        }
                    }
                }
            } catch (error) {
                console.error('Fetch error:', error);
                setErrorMsg('Unable to fetch data. Please try again later.');
            }
        }

        setNearestFacility(nearest || null);
        if (nearest) {
            setMapRegion({
                latitude: nearest.latitude,
                longitude: nearest.longitude,
                latitudeDelta: 0.005,
                longitudeDelta: 0.005,
            });
        }
        setLoading(false);
    };

    const fetchLocationAndFacilities = async () => {
        setLoading(true);
        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
            setErrorMsg('Permission to access location was denied');
            setLoading(false);
            return;
        }

        const currentLocation = await Location.getCurrentPositionAsync({});
        setLocation(currentLocation);
        setMapRegion({
            latitude: currentLocation.coords.latitude,
            longitude: currentLocation.coords.longitude,
            latitudeDelta: 0.005,
            longitudeDelta: 0.005,
        });

        fetchNearestSafeLocation(currentLocation.coords.latitude, currentLocation.coords.longitude);
    };

    useFocusEffect(
        useCallback(() => {
            fetchLocationAndFacilities();
        }, [])
    );

    const openGoogleMaps = () => {
        if (nearestFacility) {
            const { latitude, longitude } = nearestFacility;
            const userLatitude = location?.coords.latitude;
            const userLongitude = location?.coords.longitude;

            const url = `https://www.google.com/maps/dir/?api=1&origin=${userLatitude},${userLongitude}&destination=${latitude},${longitude}&travelmode=driving`;
            Linking.openURL(url);
        }
    };

    return (
        <StyledView className="flex-1 justify-start items-center p-4 bg-gradient-to-b from-white to-pink-50 pt-11">
            <StyledText className="text-3xl font-bold text-pink-600 mb-4">SafeMap</StyledText>

            <View className="w-4/5 h-[250px] rounded-lg border-[3px] border-pink-600 shadow-lg overflow-hidden">
                <MapView 
                    style={{ flex: 1 }} // Ensure the map fills the container
                    region={mapRegion}
                    showsUserLocation={true}
                    loadingEnabled={true}
                    customMapStyle={[
                        { featureType: "water", stylers: [{ color: "#e0f7fa" }] },
                        { featureType: "landscape", stylers: [{ color: "#f0f4f8" }] },
                    ]}
                >
                    {nearestFacility && (
                        <Marker
                            coordinate={{
                                latitude: nearestFacility.latitude,
                                longitude: nearestFacility.longitude,
                            }}
                            title={nearestFacility.name}
                            description={nearestFacility.type}
                        />
                    )}
                    {location && (
                        <Marker
                            coordinate={{
                                latitude: location.coords.latitude,
                                longitude: location.coords.longitude,
                            }}
                            title="You are here"
                            pinColor="#007AFF" 
                        />
                    )}
                </MapView>
            </View>

            {loading ? (
                <ActivityIndicator size="large" color="#ff69b4" className="mt-4" />
            ) : nearestFacility ? (
                <View className="mb-5 p-4 bg-pink-100 rounded-lg shadow-md mt-4">
                    <StyledText className="text-xl font-bold text-pink-600 mb-1">Nearest Safe Location</StyledText>
                    <StyledText className="text-gray-800">Name: {nearestFacility.name}</StyledText>
                    <StyledText className="text-gray-800">Type: {nearestFacility.type}</StyledText>
                    <StyledText className="text-gray-800">Coordinates: ({nearestFacility.latitude}, {nearestFacility.longitude})</StyledText>
                    <StyledText className="text-gray-800">Distance: {nearestFacility.distance.toFixed(2)} meters</StyledText>
                </View>
            ) : (
                <StyledText className="text-red-600">{errorMsg || 'No nearby safe locations found.'}</StyledText>
            )}

            <StyledView className="flex-row justify-between w-full mt-4">
                <TouchableOpacity
                    onPress={fetchLocationAndFacilities}
                    disabled={loading}
                    className="h-12 rounded-full w-[48%] bg-pink-400 justify-center items-center"
                >
                    <StyledText className="text-white font-bold">Find Nearest Safe Location</StyledText>
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={openGoogleMaps}
                    disabled={!nearestFacility}
                    className="h-12 rounded-full w-[48%] bg-pink-400 justify-center items-center flex-row"
                >
                    <StyledText className="text-white font-bold">Show Directions {" "}</StyledText>
                    <FontAwesome5 name="directions" size={24} color="white" style={{ marginRight: 8 }} />
                </TouchableOpacity>
            </StyledView>
        </StyledView>
    );
};

export default Map;
