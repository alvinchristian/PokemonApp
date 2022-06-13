import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Screens from '../../screens';

const Stack = createStackNavigator();

export default function MainStack() {
  return (
    <Stack.Navigator
      initialRouteName="Splash"
      screenOptions={{headerShown: false}}>
      <Stack.Screen name="Splash" component={Screens.Splash} />
      <Stack.Screen name="Login" component={Screens.Login} />
      <Stack.Screen name="Register" component={Screens.Register} />
      <Stack.Screen name="Dashboard" component={Screens.Dashboard} />
      <Stack.Screen name="Detail" component={Screens.Detail} />
      <Stack.Screen name="Bag" component={Screens.Bag} />
    </Stack.Navigator>
  );
}
