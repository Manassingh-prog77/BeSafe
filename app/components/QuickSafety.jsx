import React from 'react';
import { ScrollView, View, Text, TouchableOpacity } from 'react-native';
import { styled } from 'nativewind';
import { useRouter } from 'expo-router'; // Assuming you're using expo-router or react-router-native

// Define the main container with styling
const Container = styled(View, 'flex-1 bg-pink-50');

const SafetyTips = () => {
    const router = useRouter(); // For navigation control

    // Array of safety tips
    const tips = [
        {
            id: 1,
            title: "Stay Alert in Public",
            icon: "👀",
            description: "Always be aware of your surroundings. Avoid distractions like using your phone or wearing earphones in unsafe areas."
        },
        {
            id: 2,
            title: "Trust Your Instincts",
            icon: "💡",
            description: "If you feel uncomfortable in a situation, trust your gut feeling and remove yourself from the situation."
        },
        {
            id: 3,
            title: "Carry a Safety Device",
            icon: "🛡️",
            description: "Carry a personal safety device, such as a whistle, pepper spray, or a safety app on your phone for emergencies."
        },
        {
            id: 4,
            title: "Let Someone Know",
            icon: "📞",
            description: "Inform a trusted friend or family member of your whereabouts, especially when traveling or going to unfamiliar places."
        },
        {
            id: 5,
            title: "Use Well-Lit Areas",
            icon: "🔦",
            description: "When walking at night, stick to well-lit areas and avoid shortcuts through dark alleys or isolated streets."
        }
    ];

    return (
        <Container className='pt-6'>
            {/* Back Button */}
            <View className="bg-purple-50 p-4 ">
                <TouchableOpacity onPress={() => router.back()} className="bg-purple py-2 px-4 rounded-full shadow-md">
                    <Text className="text-purple-800 font-bold">{"< Back"}</Text>
                </TouchableOpacity>
            </View>

            {/* Section Heading */}
            <Text className="text-2xl font-bold text-center text-purple-800 mb-4">
                Quick Safety Tips
            </Text>

            {/* Scrollable Tips Section */}
            <ScrollView contentContainerStyle={{ paddingBottom: 20 }} className="px-4">
                <View className="space-y-6">
                    {tips.map((tip) => (
                        <View key={tip.id} className="bg-white rounded-lg p-4 shadow-md border border-purple-100">
                            {/* Icon and Title Row */}
                            <View className="flex-row items-center space-x-3 mb-3">
                                <Text className="text-3xl">{tip.icon}</Text>
                                <Text className="text-lg font-semibold text-purple-800">{tip.title}</Text>
                            </View>
                            
                            {/* Description */}
                            <Text className="text-sm text-gray-600">{tip.description}</Text>
                        </View>
                    ))}
                </View>
            </ScrollView>
        </Container>
    );
};

export default SafetyTips;
