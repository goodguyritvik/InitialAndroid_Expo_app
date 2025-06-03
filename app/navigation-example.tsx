import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';

export default function NavigationExample() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Navigation Example</Text>
      <Button
        title="Go to Settings"
        onPress={() => router.push('/settings')}
      />
      <Button
        title="Go to Profile"
        onPress={() => router.push('/app_screens/Profile')}
      />
      <Button
        title="Go Back"
        onPress={() => router.back()}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  title: {
    fontSize: 24,
    marginBottom: 24,
  },
});
