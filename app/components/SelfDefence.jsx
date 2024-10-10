import React, { useState } from 'react';
import { ScrollView, View, Text, Button, ActivityIndicator, Linking, TouchableOpacity } from 'react-native';
import { styled } from 'nativewind';
import { useRouter } from 'expo-router'; // Assuming you're using expo-router or react-router-native

// Define a container with styling
const Container = styled(ScrollView, 'flex-1 bg-pink-50 p-6');

const SelfDefence = () => {
    const router = useRouter(); // For navigation control
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // Video links (YouTube URLs) with headings and descriptions
    const videos = [
        {
            id: 1,
            title: "Basic Self Defense Techniques",
            videoUrl: "https://www.youtube.com/watch?v=yH6mU_fDHqY",
            description: "Learn basic yet effective self-defense moves every woman should know to stay safe in any situation."
        },
        {
            id: 2,
            title: "How to Defend Against an Attacker",
            videoUrl: "https://www.youtube.com/watch?v=B725c7vi1xk",
            description: "Understand how to react to and neutralize an attacker's threat with expert advice."
        },
        {
            id: 3,
            title: "Self Defense for Everyday Situations",
            videoUrl: "https://www.youtube.com/watch?v=7ZLfqWvsccQ",
            description: "Master essential self-defense skills that can be applied in everyday scenarios to protect yourself."
        },
        {
            id: 4,
            title: "Advanced Self Defense Moves",
            videoUrl: "https://www.youtube.com/watch?v=wzZNE8b426g",
            description: "Push your limits with advanced self-defense moves designed for real-world threats."
        },
        {
            id: 5,
            title: "Women's Self Defense Tips",
            videoUrl: "https://www.youtube.com/watch?v=Q1quzrqHxjA",
            description: "Expert tips on how women can stay safe and protect themselves in threatening situations."
        },
    ];

    const handleVideoSelect = async (url) => {
        setLoading(true);
        setError(null);
        try {
            await Linking.openURL(url);  // Open YouTube video in browser
        } catch (err) {
            setError('Failed to open video');
        } finally {
            setLoading(false);
        }
    };

    return (
        <Container>
            {/* Back Button */}
            <TouchableOpacity onPress={() => router.back()} className="absolute top-4 left-3 bg-purple-200 p-2 rounded-full shadow-lg">
                <Text className="text-purple-800 font-bold">{"< Back"}</Text>
            </TouchableOpacity>

            <Text className="text-2xl font-bold text-center text-purple-800 mb-6 mt-12 pt-7">Women’s Protection: Self Defense Tutorials</Text>

            <View className="space-y-4">
                {videos.map((video) => (
                    <View key={video.id} className="bg-white rounded-lg p-4 shadow-md border border-purple-100">
                        <Text className="text-lg font-semibold text-purple-800">{video.title}</Text>
                        <Text className="text-sm text-gray-600 mb-4">{video.description}</Text>
                        <Button
                            color="#8B5CF6"
                            title="Watch Video"
                            onPress={() => handleVideoSelect(video.videoUrl)}
                        />
                    </View>
                ))}
            </View>

            <View className="mt-8">
                {loading && (
                    <ActivityIndicator size="large" color="#8B5CF6" />
                )}
                {error && <Text className="text-red-500 text-center mt-4">{error}</Text>}
            </View>
        </Container>
    );
};

export default SelfDefence;
