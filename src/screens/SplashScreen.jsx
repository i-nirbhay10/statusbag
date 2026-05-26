import React, {useEffect} from 'react';
import {View, Text, StyleSheet, StatusBar} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Loader from '../components/Loader';
import colors from '../theme/colors';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

const SplashScreen = ({navigation}) => {
  const insets = useSafeAreaInsets();

  useEffect(() => {
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
        {/* App Icon */}
        <View style={styles.iconWrapper}>
          <Icon name="folder-zip" size={72} color={colors.white} />
          <View style={styles.downloadIcon}>
            <Icon name="file-download" size={32} color={colors.white} />
          </View>
        </View>

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
  iconWrapper: {
    width: 128,
    height: 128,
    borderRadius: 24,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: colors.primary,
    shadowOffset: {width: 0, height: 8},
    shadowOpacity: 0.35,
    shadowRadius: 16,
    elevation: 12,
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
