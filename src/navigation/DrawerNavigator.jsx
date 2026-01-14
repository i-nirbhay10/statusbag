import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import BottomTabNavigator from './BottomTabNavigator';
// import SettingsScreen from '../screens/SettingsScreen';

const Drawer = createDrawerNavigator();

export default function DrawerNavigator() {
  return (
    <Drawer.Navigator
      screenOptions={{
        headerShown: false,
        drawerActiveTintColor: '#13ec5b',
        drawerInactiveTintColor: '#9ca3af',
      }}>
      <Drawer.Screen
        name="HomeTabs"
        component={BottomTabNavigator}
        options={{title: 'Home'}}
      />
      {/* <Drawer.Screen name="Settings" component={SettingsScreen} /> */}
    </Drawer.Navigator>
  );
}
