import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import LanguageSelection from './LanguageSelection';
import Login from './Login';
import PhoneAuth from './PhoneAuth';

const Stack = createNativeStackNavigator();

const AuthLayoutNav = () => {
  return (
    <Stack.Navigator initialRouteName="LanguageSelection" screenOptions={{ headerShown: false }}>
      <Stack.Screen name="LanguageSelection" component={LanguageSelection} />
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="PhoneAuth" component={PhoneAuth} />
    </Stack.Navigator>
  );
};

export default AuthLayoutNav;
