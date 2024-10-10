import React from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { Title, Paragraph } from 'react-native-paper';
import { TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';


const LearnMore = () => {
    const router = useRouter();
  return (
    <ScrollView style={styles.container}>
    <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
    <Ionicons name="arrow-back" size={24} color="#1B5E20" />
    </TouchableOpacity>
      <Title style={styles.title}>Learn More</Title>

      <View style={styles.section}>
        <Title style={styles.sectionTitle}>Why Women Empowerment?</Title>
        <Paragraph style={styles.paragraph}>
          Women empowerment is crucial for achieving gender equality and creating a balanced society. Empowered women contribute to economic growth, make informed decisions, and influence positive change in their communities. Empowering women helps to eliminate poverty and promote sustainable development, making it essential for a better future for all.
        </Paragraph>
      </View>

      <View style={styles.section}>
        <Title style={styles.sectionTitle}>Why This App is Important?</Title>
        <Paragraph style={styles.paragraph}>
          This app is designed to provide safety and support to women in our communities. With features like emergency contacts, location sharing, and resources for legal and mental health support, it aims to empower women to take control of their safety. By raising awareness and providing crucial information, we can help women navigate challenging situations more confidently.
        </Paragraph>
      </View>

      <View style={styles.section}>
        <Title style={styles.sectionTitle}>Understanding Women's Rights</Title>
        <Paragraph style={styles.paragraph}>
          Understanding women's rights is essential for promoting gender equality. Women have the right to live free from violence, discrimination, and oppression. This app aims to educate users about their rights and provide resources to help women assert those rights in various situations, ensuring they are informed and protected.
        </Paragraph>
      </View>

      <View style={styles.section}>
        <Title style={styles.sectionTitle}>Community Support</Title>
        <Paragraph style={styles.paragraph}>
          Building a supportive community is vital for women’s empowerment. This app encourages users to connect with local support groups and resources. By fostering community connections, women can share experiences, seek advice, and build networks that enhance their safety and well-being.
        </Paragraph>
      </View>

      <View style={styles.section}>
        <Title style={styles.sectionTitle}>Get Involved!</Title>
        <Paragraph style={styles.paragraph}>
          Want to make a difference? Join us in advocating for women's rights and empowerment. You can help spread the word about this app, participate in local events, or volunteer with organizations that support women's issues. Together, we can create a safer environment for all women.
        </Paragraph>
      </View>
      <View style={styles.bottomMargin} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#E8F5E9', // Soft green for a calm and supportive atmosphere
    paddingTop:50
  },
  backButton: {
    position: 'absolute',
    left: 5,
    backgroundColor: 'transparent', // Transparent to only show the icon
    zIndex: 1, // Ensure the back button is above other elements
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#2E7D32', // Darker green for title to symbolize growth and empowerment
  },
  section: {
    marginBottom: 20,
    padding: 20,
    borderRadius: 12,
    backgroundColor: '#FFFFFF', // White for contrast
    elevation: 4, // Increased elevation for a more defined shadow
  },
  sectionTitle: {
    fontSize: 26,
    marginBottom: 10,
    color: '#1B5E20', // Dark green for section titles
  },
  paragraph: {
    fontSize: 18,
    lineHeight: 24,
    color: '#424242', // Dark gray for better readability
  },
  bottomMargin: {
    height: 40, // Adjust the height for desired bottom margin
  }
});

export default LearnMore;
