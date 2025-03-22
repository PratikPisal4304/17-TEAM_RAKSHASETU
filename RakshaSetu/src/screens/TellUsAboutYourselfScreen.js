// TellUsAboutYourselfScreen.js
import { LinearGradient } from 'expo-linear-gradient';
import React, { useState } from 'react';
import {
  Alert,
  Dimensions,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { SafeAreaView } from 'react-native-safe-area-context';

const { width, height } = Dimensions.get('window');
const PINK = '#ff5f96';

export default function TellUsAboutYourselfScreen({ navigation }) {
  const [name, setName] = useState('');
  const [day, setDay] = useState('');
  const [month, setMonth] = useState('');
  const [year, setYear] = useState('');

  const allowDigitsOnly = (text) => text.replace(/[^0-9]/g, '');

  const handleContinue = () => {
    if (!name.trim()) {
      Alert.alert('Error', 'Please enter your name.');
      return;
    }
    if (!day || !month || !year) {
      Alert.alert('Error', 'Please enter a valid date of birth.');
      return;
    }

    Alert.alert(
      'Info',
      `Name: ${name}\nDOB: ${day}/${month}/${year}\nData saved!`
    );
    navigation.replace('MainTabs');
  };

  return (
    <SafeAreaView style={styles.container} edges={['left', 'right']}>
      <KeyboardAwareScrollView contentContainerStyle={{ flexGrow: 1 }} bounces={false}>
        <LinearGradient
          colors={['#ff9dbf', PINK]}
          style={styles.gradientBackground}
        >
          <View style={styles.topSection}>
            <Text style={styles.headerTitle}>Tell us about yourself</Text>
          </View>

          <View style={styles.formCard}>
            <Text style={styles.label}>Enter your name</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter your name"
              placeholderTextColor="#999"
              value={name}
              onChangeText={setName}
            />

            <Text style={[styles.label, { marginTop: 20 }]}>Date of Birth</Text>
            <View style={styles.dobRow}>
              <TextInput
                style={[styles.dobInput, { marginRight: 10 }]}
                placeholder="DD"
                placeholderTextColor="#999"
                keyboardType="numeric"
                maxLength={2}
                value={day}
                onChangeText={(text) => setDay(allowDigitsOnly(text))}
              />
              <TextInput
                style={[styles.dobInput, { marginRight: 10 }]}
                placeholder="MM"
                placeholderTextColor="#999"
                keyboardType="numeric"
                maxLength={2}
                value={month}
                onChangeText={(text) => setMonth(allowDigitsOnly(text))}
              />
              <TextInput
                style={styles.dobInput}
                placeholder="YYYY"
                placeholderTextColor="#999"
                keyboardType="numeric"
                maxLength={4}
                value={year}
                onChangeText={(text) => setYear(allowDigitsOnly(text))}
              />
            </View>

            <TouchableOpacity style={styles.continueButton} onPress={handleContinue}>
              <Text style={styles.continueButtonText}>Continue</Text>
            </TouchableOpacity>
          </View>
        </LinearGradient>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
}

// Styles remain the same
const CARD_HEIGHT = 300;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  gradientBackground: {
    flex: 1,
  },
  topSection: {
    paddingTop: 40,
    paddingHorizontal: 20,
    height: height * 0.2,
    justifyContent: 'flex-end',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#fff',
    marginBottom: 20,
  },
  formCard: {
    backgroundColor: '#fff',
    borderRadius: 40,
    padding: 25,
    minHeight: CARD_HEIGHT,
    marginTop: 20,
    marginHorizontal: 15,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 5 },
    shadowRadius: 8,
    elevation: 5,
  },
  label: {
    fontSize: 15,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
  },
  input: {
    backgroundColor: '#f8f8f8',
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 12,
    fontSize: 15,
    color: '#333',
    borderWidth: 1,
    borderColor: '#eee',
  },
  dobRow: {
    flexDirection: 'row',
    marginTop: 5,
  },
  dobInput: {
    flex: 1,
    backgroundColor: '#f8f8f8',
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 12,
    fontSize: 15,
    color: '#333',
    borderWidth: 1,
    borderColor: '#eee',
    textAlign: 'center',
  },
  continueButton: {
    backgroundColor: PINK,
    borderRadius: 25,
    paddingVertical: 16,
    alignItems: 'center',
    marginTop: 30,
    elevation: 2,
  },
  continueButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
  },
});