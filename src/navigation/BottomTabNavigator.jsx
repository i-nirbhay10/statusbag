import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {responsiveFontSize as rf} from 'react-native-responsive-dimensions';
import StatusSaverHome from '../screens/StatusSaverHome';
import SavedScreen from '../screens/SavedScreen';
import SettingsScreen from '../screens/SettingsScreen';

const Tab = createBottomTabNavigator();

export default function BottomTabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        headerShown: false,
        tabBarIcon: ({color}) => {
          let iconName;
          if (route.name === 'Home') iconName = 'home';
          if (route.name === 'Saved') iconName = 'download-for-offline';
          if (route.name === 'Settings') iconName = 'settings';
          return <MaterialIcons name={iconName} size={rf(3)} color={color} />;
        },
        tabBarActiveTintColor: '#13ec5b',
        tabBarInactiveTintColor: '#9ca3af',

        tabBarLabelStyle: {fontSize: rf(1.3), fontWeight: 'bold', height: 50},
      })}>
      <Tab.Screen name="Home" component={StatusSaverHome} />
      <Tab.Screen name="Saved" component={SavedScreen} />
      <Tab.Screen name="Settings" component={SettingsScreen} />
    </Tab.Navigator>
  );
}
