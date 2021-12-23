import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from '~/features/Auth/Login/Screen';

const Stack = createNativeStackNavigator();

const AuthRoutes = () => (
  <NavigationContainer>
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name='Login' component={Login} />
    </Stack.Navigator>
  </NavigationContainer>
);

export default AuthRoutes;