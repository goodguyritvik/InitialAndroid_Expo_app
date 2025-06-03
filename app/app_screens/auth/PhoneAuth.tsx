import React, { useState, useEffect } from 'react';
import { View, TextInput, Button, Text, StyleSheet, Alert, KeyboardAvoidingView, Platform } from 'react-native';
import { auth, app } from '../../../firebaseConfig';
import { useRouter } from 'expo-router';
import firebase from 'firebase/compat/app';

const RECAPTCHA_SITE_KEY = '6LeuAFQrAAAAAIAbtR1Y48ysK-GwZsssYDxHn-Fl';

export default function PhoneAuth() {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [confirmationResult, setConfirmationResult] = useState<any>(null);
  const [verificationCode, setVerificationCode] = useState('');
  const router = useRouter();

  useEffect(() => {
    if (Platform.OS === 'web') {
      // Setup reCAPTCHA verifier for web with site key
      (window as any).recaptchaVerifier = new firebase.auth.RecaptchaVerifier('recaptcha-container', {
        size: 'invisible',
        siteKey: RECAPTCHA_SITE_KEY,
        callback: (response: any) => {
          // reCAPTCHA solved, allow signInWithPhoneNumber.
          console.log('reCAPTCHA solved');
        },
        'expired-callback': () => {
          // Response expired. Ask user to solve reCAPTCHA again.
          Alert.alert('reCAPTCHA expired, please try again.');
        }
      });
      (window as any).recaptchaVerifier.render().then((widgetId: any) => {
        (window as any).recaptchaWidgetId = widgetId;
      });
    }
  }, []);


  const sendVerification = async () => {
    if (!phoneNumber) {
      Alert.alert('Error', 'Please enter a phone number');
      return;
    }
    try {
      console.log('Sending verification code to:', phoneNumber);
      const e164PhoneNumber = phoneNumber.startsWith('+') ? phoneNumber : '+' + phoneNumber.replace(/\D/g, '');
      console.log('Formatted phone number:', e164PhoneNumber);

      if (Platform.OS === 'web') {
        const appVerifier = (window as any).recaptchaVerifier;
        const result = await auth.signInWithPhoneNumber(e164PhoneNumber, appVerifier);
        setConfirmationResult(result);
        Alert.alert('Verification code sent to ' + e164PhoneNumber);
        console.log('Confirmation result set:', result);
      } else {
        const result = await auth.signInWithPhoneNumber(e164PhoneNumber);
        setConfirmationResult(result);
        Alert.alert('Verification code sent to ' + e164PhoneNumber);
        console.log('Confirmation result set:', result);
      }
    } catch (err: any) {
      console.error('Error sending verification code:', err);
      Alert.alert('Error', err.message);
    }
  };

  const confirmCode = async () => {
    if (!verificationCode) {
      Alert.alert('Error', 'Please enter the verification code');
      return;
    }
    try {
      if (!confirmationResult) {
        Alert.alert('Error', 'No confirmation result found');
        return;
      }
      await confirmationResult.confirm(verificationCode);
      console.log('Phone authentication successful, navigating to /tabs');
      Alert.alert('Phone authentication successful!');
      router.replace('/tabs'); // Navigate to main app screen
    } catch (err: any) {
      console.error('Error during confirmation:', err);
      Alert.alert('Error', err.message);
    }
  };

  return (
    <>
      {Platform.OS === 'web' && <div id="recaptcha-container"></div>}
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={styles.container}
      >
        <View style={styles.form}>
          {!confirmationResult ? (
            <>
              <Text style={styles.title}>Enter Phone Number</Text>
              <TextInput
                style={styles.input}
                placeholder="+1234567890"
                onChangeText={setPhoneNumber}
                keyboardType="phone-pad"
                autoComplete="tel"
                textContentType="telephoneNumber"
              />
              <Button title="Send Verification Code" onPress={sendVerification} />
            </>
          ) : (
            <>
              <Text style={styles.title}>Enter Verification Code</Text>
              <TextInput
                style={styles.input}
                placeholder="123456"
                onChangeText={setVerificationCode}
                keyboardType="number-pad"
                textContentType="oneTimeCode"
              />
              <Button title="Confirm Code" onPress={confirmCode} />
            </>
          )}
        </View>
      </KeyboardAvoidingView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
    backgroundColor: '#fff',
  },
  form: {
    backgroundColor: '#f9f9f9',
    padding: 20,
    borderRadius: 8,
    elevation: 2,
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 15,
    textAlign: 'center',
  },
  input: {
    height: 48,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 6,
    marginBottom: 15,
    paddingHorizontal: 10,
  },
});
