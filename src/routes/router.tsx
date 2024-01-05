
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AppNavigator from './AppNavigator';

export default function Router() {
 
  return (
    <NavigationContainer>
      <AppNavigator />
    </NavigationContainer>
  );
}