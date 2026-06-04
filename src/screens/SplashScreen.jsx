import React, {useEffect} from 'react';
import {View, Text, StyleSheet, StatusBar, Image} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Loader from '../components/Loader';
import colors from '../theme/colors';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {useAppUpdate} from '../hooks/useAppUpdate';

const SplashScreen = ({navigation}) => {
  const insets = useSafeAreaInsets();
  const { checkForUpdates } = useAppUpdate();

  useEffect(() => {
    checkForUpdates(false);
    
    const timer = setTimeout(() => {
      navigation.replace('RootDrawer');
    }, 2000);

    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <View style={styles.container}>
      <StatusBar
        backgroundColor={colors.backgroundLight}
        barStyle="dark-content"
      />

      {/* Top Spacer */}
      <View style={{height: insets.top > 0 ? insets.top + 40 : 40}} />

      {/* Center Content */}
      <View style={styles.centerContent}>
        {/* App Logo */}
        <Image 
          source={require('../assets/statusbagLogo.png')} 
          style={styles.logo}
          resizeMode="contain"
        />

        {/* App Name */}
        <Text style={styles.title}>StatusBag</Text>
      </View>

      {/* Bottom Loader */}
      <View style={[styles.bottomSection, {paddingBottom: insets.bottom > 0 ? insets.bottom + 20 : 64}]}>
        <Loader />
        <Text style={styles.subtitle}>Fast & Secure</Text>
      </View>
    </View>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.backgroundLight,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  centerContent: {
    alignItems: 'center',
    gap: 24,
  },
  logo: {
    width: 160,
    height: 160,
    marginBottom: 8,
  },
  title: {
    fontSize: 32,
    fontWeight: '700',
    color: colors.textLight,
    letterSpacing: -0.5,
  },
  bottomSection: {
    alignItems: 'center',
    gap: 12,
  },
  subtitle: {
    fontSize: 14,
    color: colors.grayMedium,
    fontWeight: '500',
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
});
