import React, { useState, useEffect } from 'react';
import { View, TextInput, Button, Text, StyleSheet, Alert, KeyboardAvoidingView, Platform, TouchableOpacity } from 'react-native';
import { auth, app } from '@/firebaseConfig';
import { useNavigation } from '@react-navigation/native';
import firebase from 'firebase/compat/app';

const RECAPTCHA_SITE_KEY = '6LeuAFQrAAAAAIAbtR1Y48ysK-GwZsssYDxHn-Fl';

export default function PhoneAuth() {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [confirmationResult, setConfirmationResult] = useState<any>(null);
  const [verificationCode, setVerificationCode] = useState('');
  const navigation = useNavigation();

  const [recaptchaReady, setRecaptchaReady] = React.useState(false);

  useEffect(() => {
    if (Platform.OS === 'web' && recaptchaReady) {
      (window as any).recaptchaVerifier = new firebase.auth.RecaptchaVerifier('recaptcha-container', {
        size: 'invisible',
        siteKey: RECAPTCHA_SITE_KEY,
        callback: (response: any) => {
          console.log('reCAPTCHA solved');
        },
        'expired-callback': () => {
          Alert.alert('reCAPTCHA expired, please try again.');
        }
      });
      (window as any).recaptchaVerifier.render().then((widgetId: any) => {
        (window as any).recaptchaWidgetId = widgetId;
      });
    }
  }, [recaptchaReady]);

  useEffect(() => {
    if (Platform.OS === 'web') {
      setRecaptchaReady(true);
    }
  }, []);

  const sendVerification = async () => {
    if (!phoneNumber) {
      Alert.alert('Error', 'Please enter a phone number');
      return;
    }
    try {
      let e164PhoneNumber = phoneNumber.startsWith('+') ? phoneNumber : '+' + phoneNumber.replace(/\D/g, '');
      if (!phoneNumber.startsWith('+')) {
        e164PhoneNumber = '+91' + phoneNumber.replace(/\D/g, '');
      }
      if (Platform.OS === 'web') {
        const appVerifier = (window as any).recaptchaVerifier;
        const result = await auth.signInWithPhoneNumber(e164PhoneNumber, appVerifier);
        setConfirmationResult(result);
        Alert.alert('Verification code sent to ' + e164PhoneNumber);
      } else {
        const result = await auth.signInWithPhoneNumber(e164PhoneNumber);
        setConfirmationResult(result);
        Alert.alert('Verification code sent to ' + e164PhoneNumber);
      }
    } catch (err: any) {
      Alert.alert('Error', err.message);
    }
  };

  const confirmCode = async () => {
    console.log('confirmCode called');
    if (!verificationCode) {
      Alert.alert('Error', 'Please enter the verification code');
      return;
    }
    try {
      if (!confirmationResult) {
        Alert.alert('Error', 'No confirmation result found');
        return;
      }
      const userCredential = await confirmationResult.confirm(verificationCode);
      console.log('Phone authentication successful!');
      Alert.alert('Phone authentication successful!');
      setShouldNavigate(true);
      console.log('setShouldNavigate(true) called');
    } catch (err: any) {
      Alert.alert('Error', err.message);
    }
  };

  const [shouldNavigate, setShouldNavigate] = React.useState(false);

  useEffect(() => {
    console.log('Navigation useEffect triggered, shouldNavigate:', shouldNavigate);
    if (shouldNavigate) {
      let retries = 5;
      const navigate = async () => {
        console.log('navigate function called, retries left:', retries);
        try {
          navigation.navigate('Tabs' as never);
          console.log('Navigation to Tabs completed');
        } catch (error) {
          console.error('Navigation error:', error);
          Alert.alert('Navigation Error', 'Failed to navigate to Tabs.');
          if (retries > 0) {
            retries--;
            setTimeout(navigate, 200);
          } else {
            Alert.alert('Navigation Error', 'Navigation not ready.');
          }
        }
      };
      navigate();
    }
  }, [shouldNavigate, navigation]);

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
              <TouchableOpacity onPress={confirmCode} style={styles.button}>
                <Text style={styles.buttonText}>Confirm Code</Text>
              </TouchableOpacity>
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
  button: {
    backgroundColor: '#007bff',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 6,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
});
