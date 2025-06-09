import React, { useRef } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, KeyboardAvoidingView, Platform } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const Login = () => {
  const navigation = useNavigation();
  const isMounted = useRef(false);

  React.useEffect(() => {
    isMounted.current = true;
    return () => {
      isMounted.current = false;
    };
  }, []);

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      style={styles.container}
    >
      <View style={styles.form}>
        <Text style={styles.title}>Login</Text>
        <TouchableOpacity onPress={() => {
          if (isMounted.current) {
            console.log("Login: Button pressed, navigating to PhoneAuth");
            navigation.navigate('PhoneAuth' as never);
          }
        }}>
          <Text style={styles.linkText}>Login with Phone Number</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

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
    fontSize: 24,
    fontWeight: '600',
    marginBottom: 20,
    textAlign: 'center',
  },
  linkText: {
    color: '#2563eb',
    textAlign: 'center',
    marginTop: 10,
  },
});

export default Login;
