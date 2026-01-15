import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
// import DrawerNavigator from './DrawerNavigator';
import BottomTabNavigator from './BottomTabNavigator';
import ImagePreviewScreen from '../screens/ImagePreviewScreen';
import Pricing from '../screens/Pricing';
// import SavedScreen from '../screens/SavedScreen';
// import SettingsScreen from '../screens/SettingsScreen';

const Stack = createStackNavigator();

export default function MainStack() {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      {/* Root Drawer */}
      {/* <Stack.Screen name="RootDrawer" component={DrawerNavigator} /> */}
      <Stack.Screen name="RootDrawer" component={BottomTabNavigator} />
      <Stack.Screen name="ImagePreview" component={ImagePreviewScreen} />
      <Stack.Screen name="Pricing" component={Pricing} />
    </Stack.Navigator>
  );
}
