import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet, Platform} from 'react-native';
import {
  responsiveHeight as hp,
  responsiveWidth as wp,
  responsiveFontSize as rf,
} from 'react-native-responsive-dimensions';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import colors from '../theme/colors';

export default function TopBar() {
  return (
    <View style={styles.container}>
      <View style={styles.leftContainer}>
        <TouchableOpacity style={styles.iconButton}>
          <MaterialIcons name="menu" size={rf(3.2)} color={colors.textLight} />
        </TouchableOpacity>
        <Text style={styles.title}>Status Saver</Text>
      </View>
      <TouchableOpacity style={styles.premiumButton} activeOpacity={0.8}>
        <MaterialIcons name="workspace-premium" size={rf(3)} color={colors.primaryDark} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: hp(8),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: wp(3),
    backgroundColor: colors.white,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: {width: 0, height: 2},
        shadowOpacity: 0.05,
        shadowRadius: 3,
      },
      android: {
        elevation: 4,
      },
    }),
  },
  leftContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: wp(3),
  },
  iconButton: {
    padding: wp(1),
  },
  title: {
    fontSize: rf(2.4),
    fontWeight: '700',
    color: colors.secondary,
    letterSpacing: 0.5,
  },
  premiumButton: {
    height: hp(5.5),
    width: hp(5.5),
    borderRadius: hp(2.75),
    backgroundColor: colors.primaryLight,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
