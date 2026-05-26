import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {responsiveFontSize as rf, responsiveHeight as hp} from 'react-native-responsive-dimensions';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import StatusSaverHome from '../screens/StatusSaverHome';
import SavedScreen from '../screens/SavedScreen';
import SettingsScreen from '../screens/SettingsScreen';
import colors from '../theme/colors';

const Tab = createBottomTabNavigator();

export default function BottomTabNavigator() {
  const insets = useSafeAreaInsets();
  
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        headerShown: false,
        tabBarIcon: ({focused, color}) => {
          let iconName;
          if (route.name === 'Home') iconName = focused ? 'home' : 'home-outline';
          if (route.name === 'Saved') iconName = focused ? 'download-for-offline' : 'download';
          if (route.name === 'Settings') iconName = focused ? 'settings' : 'settings-outline';
          
          // Fallback if some outline icons don't exist in the current MaterialIcons version
          if (iconName === 'home-outline') iconName = 'home';
          if (iconName === 'settings-outline') iconName = 'settings';
          
          return <MaterialIcons name={iconName} size={rf(3.2)} color={color} />;
        },
        tabBarActiveTintColor: colors.primaryDark,
        tabBarInactiveTintColor: colors.grayMedium,
        tabBarStyle: {
          backgroundColor: colors.white,
          borderTopWidth: 1,
          borderTopColor: colors.grayLight,
          height: hp(7) + insets.bottom,
          paddingBottom: insets.bottom > 0 ? insets.bottom : hp(1),
          paddingTop: hp(1),
          elevation: 8,
          shadowColor: '#000',
          shadowOffset: {width: 0, height: -2},
          shadowOpacity: 0.1,
          shadowRadius: 4,
        },
        tabBarLabelStyle: {
          fontSize: rf(1.4),
          fontWeight: '600',
          marginBottom: insets.bottom > 0 ? 0 : hp(0.5)
        },
      })}>
      <Tab.Screen name="Home" component={StatusSaverHome} />
      <Tab.Screen name="Saved" component={SavedScreen} />
      <Tab.Screen name="Settings" component={SettingsScreen} />
    </Tab.Navigator>
  );
}
