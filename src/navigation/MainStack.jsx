import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import BottomTabNavigator from './BottomTabNavigator';
import ImagePreviewScreen from '../screens/ImagePreviewScreen';
import Pricing from '../screens/Pricing';
import SplashScreen from '../screens/SplashScreen';

const Stack = createStackNavigator();

export default function MainStack() {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}} initialRouteName="Splash">
      <Stack.Screen name="Splash" component={SplashScreen} />
      <Stack.Screen name="RootDrawer" component={BottomTabNavigator} />
      <Stack.Screen name="ImagePreview" component={ImagePreviewScreen} />
      <Stack.Screen name="Pricing" component={Pricing} />
    </Stack.Navigator>
  );
}
