import React, {useEffect} from 'react';
import {View, Text, StyleSheet, StatusBar} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Loader from '../components/Loader';
import colors from '../theme/colors';

const SplashScreen = ({navigation}) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.replace('RootDrawer'); // change later
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar
        backgroundColor={colors.backgroundLight}
        barStyle="dark-content"
      />

      {/* Top Spacer */}
      <View style={{height: 40}} />

      {/* Center Content */}
      <View style={styles.centerContent}>
        {/* App Icon */}
        <View style={styles.iconWrapper}>
          <Icon name="folder-zip" size={72} color="#fff" />
          <View style={styles.downloadIcon}>
            <Icon name="download" size={32} color="#fff" />
          </View>
        </View>

        {/* App Name */}
        <Text style={styles.title}>StatusSave</Text>
      </View>

      {/* Bottom Loader */}
      <View style={styles.bottomSection}>
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
  iconWrapper: {
    width: 128,
    height: 128,
    borderRadius: 24,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: colors.primary,
    shadowOpacity: 0.25,
    shadowRadius: 12,
    elevation: 8,
  },
  downloadIcon: {
    position: 'absolute',
    bottom: 24,
  },
  title: {
    fontSize: 32,
    fontWeight: '700',
    color: colors.textLight,
    letterSpacing: -0.5,
  },
  bottomSection: {
    paddingBottom: 64,
    alignItems: 'center',
    gap: 12,
  },
  subtitle: {
    fontSize: 14,
    color: 'rgba(17,24,19,0.4)',
    fontWeight: '500',
  },
});
