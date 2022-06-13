import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import MainStack from './MainStack';
import FlashMessage from 'react-native-flash-message';

export default function Routes() {
  return (
    <NavigationContainer>
      <MainStack />
      <FlashMessage position="top" />
    </NavigationContainer>
  );
}
