import React from 'react';
import {Text, View} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {responsiveFontSize as rf} from 'react-native-responsive-dimensions';
import StatusSaverHome from '../screens/StatusSaverHome';

const Tab = createBottomTabNavigator();

function SavedScreen() {
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text>Saved Screen</Text>
    </View>
  );
}

function SettingsScreen() {
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text>Settings Screen</Text>
    </View>
  );
}

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
        tabBarLabelStyle: {fontSize: rf(1.3), fontWeight: 'bold'},
      })}>
      <Tab.Screen name="Home" component={StatusSaverHome} />
      <Tab.Screen name="Saved" component={SavedScreen} />
      <Tab.Screen name="Settings" component={SettingsScreen} />
    </Tab.Navigator>
  );
}
