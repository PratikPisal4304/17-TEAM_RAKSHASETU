import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Alert,
  Dimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

const { width, height } = Dimensions.get('window');
const PINK = '#ff5f96';

export default function OTPVerificationScreen({ navigation }) {
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const otpRefs = Array.from({ length: 6 }, () => useRef(null));

  const handleOtpChange = (text, index) => {
    const newText = text.replace(/[^0-9]/g, '').slice(-1);
    const updated = [...otp];
    updated[index] = newText;
    setOtp(updated);

    if (newText && index < 5) {
      otpRefs[index + 1].current?.focus();
    }
  };

  const handleVerifyOTP = () => {
    if (otp.includes('')) {
      Alert.alert('Error', 'Please fill out all 6 digits of the OTP.');
      return;
    }
    Alert.alert('Success', 'OTP verified!');
    navigation.replace('MainTabs');
  };

  const handleChangeNumber = () => {
    navigation.replace('Login');
  };

  const handleResendCode = () => {
    Alert.alert('Resend Code', 'Logic to resend OTP goes here.');
  };

  return (
    <SafeAreaView style={styles.container} edges={['left', 'right']}>
      <KeyboardAwareScrollView contentContainerStyle={{ flexGrow: 1 }} bounces={false}>
        <LinearGradient colors={['#ff9dbf', PINK]} style={styles.gradientBackground}>
          <View style={styles.topSection}>
            <Text style={styles.title}>Phone Verification</Text>
          </View>

          <View style={styles.formCard}>
            <Text style={styles.subtitle}>Enter the 6-digit verification code sent to your number</Text>

            <View style={styles.otpRow}>
              {otp.map((digit, i) => (
                <View key={`otp-${i}`} style={styles.otpBox}>
                  <TextInput
                    ref={otpRefs[i]}
                    style={styles.otpInput}
                    keyboardType="numeric"
                    maxLength={1}
                    value={digit}
                    onChangeText={(text) => handleOtpChange(text, i)}
                  />
                </View>
              ))}
            </View>

            <TouchableOpacity onPress={handleChangeNumber}>
              <Text style={styles.changeNumberText}>Change Number</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.verifyButton} onPress={() => navigation.navigate('MainTabs')}>
              <Text style={styles.verifyButtonText}>Verify OTP</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={handleResendCode}>
              <Text style={styles.resendText}>Resend Code</Text>
            </TouchableOpacity>
          </View>
        </LinearGradient>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  gradientBackground: {
    flex: 1,
  },
  topSection: {
    paddingTop: 60,
    paddingHorizontal: 20,
    height: height * 0.25,
    justifyContent: 'flex-end',
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: '#fff',
    marginBottom: 20,
  },
  formCard: {
    backgroundColor: '#fff',
    borderRadius: 40,
    padding: 25,
    minHeight: 320,
    marginTop: 20,
    marginHorizontal: 15,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 5 },
    shadowRadius: 8,
    elevation: 5,
  },
  subtitle: {
    fontSize: 14,
    color: '#666',
    marginBottom: 25,
    textAlign: 'center',
    lineHeight: 18,
  },
  otpRow: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginBottom: 20,
  },
  otpBox: {
    width: 50,
    height: 50,
    borderRadius: 10,
    backgroundColor: '#fff',
    borderWidth: 1.5,
    borderColor: PINK,
    justifyContent: 'center',
    alignItems: 'center',
  },
  otpInput: {
    fontSize: 20,
    textAlign: 'center',
    width: '100%',
    color: '#333',
  },
  changeNumberText: {
    color: PINK,
    fontSize: 14,
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 30,
  },
  verifyButton: {
    backgroundColor: PINK,
    borderRadius: 25,
    paddingVertical: 14,
    alignItems: 'center',
    marginBottom: 20,
    elevation: 2,
  },
  verifyButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
  },
  resendText: {
    color: '#666',
    fontSize: 14,
    textAlign: 'center',
    fontWeight: '500',
  },
});
