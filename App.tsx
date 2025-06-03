import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import Login from './app/app_screens/auth/Login';
import PhoneAuth from './app/app_screens/auth/PhoneAuth';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Login" screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="PhoneAuth" component={PhoneAuth} />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
