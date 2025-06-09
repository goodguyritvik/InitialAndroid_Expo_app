import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

export default function LanguageSelection({ navigation }: { navigation: any }) {
  const [selectedLanguage, setSelectedLanguage] = useState<string | null>(null);

  const selectLanguage = (language: string) => {
    setSelectedLanguage(language);
    console.log('Selected language:', language);
    // Navigate to Login screen immediately after selection
    navigation.navigate('Login');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Select Language</Text>
      <TouchableOpacity
        style={[
          styles.button,
          selectedLanguage === 'Hindi' && styles.selectedButton,
        ]}
        onPress={() => selectLanguage('Hindi')}
      >
        <Text style={styles.buttonText}>Hindi</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[
          styles.button,
          selectedLanguage === 'English' && styles.selectedButton,
        ]}
        onPress={() => selectLanguage('English')}
      >
        <Text style={styles.buttonText}>English</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 40,
  },
  button: {
    backgroundColor: '#007bff',
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 8,
    marginVertical: 10,
    width: '60%',
    alignItems: 'center',
  },
  selectedButton: {
    backgroundColor: '#0056b3',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
  },
});
