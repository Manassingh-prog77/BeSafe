import React, { useEffect, useState } from 'react';
import { View, Text, Alert, StyleSheet } from 'react-native';
import { Button, Card, Switch, Title, Paragraph } from 'react-native-paper';
import * as Contacts from 'expo-contacts';
import * as Location from 'expo-location';
import { Linking } from 'react-native';

const Setting = () => {
  const [locationPermission, setLocationPermission] = useState(true); // Default to true
  const [contactsPermission, setContactsPermission] = useState(true); // Default to true
  const [isLocationEnabled, setIsLocationEnabled] = useState(true);
  const [isContactsEnabled, setIsContactsEnabled] = useState(true);

  useEffect(() => {
    // Only check permissions if not already granted
    if (!locationPermission || !contactsPermission) {
      checkPermissions();
    }
  }, [locationPermission, contactsPermission]);

  const checkPermissions = async () => {
    // Check for Location permission
    const { status: locationStatus } = await Location.requestForegroundPermissionsAsync();
    setLocationPermission(locationStatus === 'granted');
    setIsLocationEnabled(locationStatus === 'granted');

    // Check for Contacts permission
    const { status: contactsStatus } = await Contacts.requestPermissionsAsync();
    setContactsPermission(contactsStatus === 'granted');
    setIsContactsEnabled(contactsStatus === 'granted');
  };

  const toggleLocationPermission = async () => {
    if (isLocationEnabled) {
      Alert.alert(
        'Disable Location Permission',
        'Are you sure you want to disable location permission? This will restrict location features in the app.',
        [
          { text: 'Cancel', style: 'cancel' },
          { text: 'Disable', onPress: () => setIsLocationEnabled(false) },
        ]
      );
    } else {
      setIsLocationEnabled(true);
      Alert.alert('Location Permission', 'Permission enabled');
    }
  };

  const toggleContactsPermission = async () => {
    if (isContactsEnabled) {
      Alert.alert(
        'Disable Contacts Permission',
        'Are you sure you want to disable contacts permission? This will restrict contact features in the app.',
        [
          { text: 'Cancel', style: 'cancel' },
          { text: 'Disable', onPress: () => setIsContactsEnabled(false) },
        ]
      );
    } else {
      setIsContactsEnabled(true);
      Alert.alert('Contacts Permission', 'Permission enabled');
    }
  };

  const openAppSettings = () => {
    Linking.openURL('app-settings:');
  };

  return (
    <View style={styles.container} className="pt-11">
      <Title style={styles.title}>Settings</Title>

      <Card style={styles.card}>
        <Card.Content>
          <Paragraph style={styles.paragraph}>Location Permission</Paragraph>
          <Switch
            value={isLocationEnabled}
            onValueChange={toggleLocationPermission}
            color="#6200ee"
          />
          <Text style={styles.permissionStatus}>
            {isLocationEnabled ? 'Location Permission is enabled' : 'Location Permission is disabled'}
          </Text>
        </Card.Content>
      </Card>

      <Card style={styles.card}>
        <Card.Content>
          <Paragraph style={styles.paragraph}>Contacts Permission</Paragraph>
          <Switch
            value={isContactsEnabled}
            onValueChange={toggleContactsPermission}
            color="#6200ee"
          />
          <Text style={styles.permissionStatus}>
            {isContactsEnabled ? 'Contacts Permission is enabled' : 'Contacts Permission is disabled'}
          </Text>
        </Card.Content>
      </Card>

      <Button
        mode="contained"
        onPress={openAppSettings}
        style={styles.settingsButton}
      >
        Open App Settings
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f7f7f7',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  card: {
    marginBottom: 20,
    borderRadius: 10,
    elevation: 3,
    backgroundColor: '#fff',
  },
  paragraph: {
    fontSize: 18,
    marginBottom: 10,
  },
  permissionStatus: {
    marginTop: 10,
    fontStyle: 'italic',
    color: '#777',
  },
  settingsButton: {
    marginTop: 20,
    paddingVertical: 10,
  },
});

export default Setting;
