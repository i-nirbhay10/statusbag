import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
// import DrawerNavigator from './DrawerNavigator';
import BottomTabNavigator from './BottomTabNavigator';
// import SavedScreen from '../screens/SavedScreen';
// import SettingsScreen from '../screens/SettingsScreen';

const Stack = createStackNavigator();

export default function MainStack() {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      {/* Root Drawer */}
      {/* <Stack.Screen name="RootDrawer" component={DrawerNavigator} /> */}
      <Stack.Screen name="RootDrawer" component={BottomTabNavigator} />

      {/* Example Stack Screens */}
      {/* <Stack.Screen name="Saved" component={SavedScreen} />
      <Stack.Screen name="Settings" component={SettingsScreen} /> */}
    </Stack.Navigator>
  );
}
