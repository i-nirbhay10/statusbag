import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet, Platform} from 'react-native';
import {
  responsiveHeight as hp,
  responsiveWidth as wp,
  responsiveFontSize as rf,
} from 'react-native-responsive-dimensions';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import colors from '../theme/colors';

export default function Header({
  title = 'StatusBag',
  leftIcon = 'menu',
  onLeftPress,
  rightIcon,
  onRightPress,
  rightCustomComponent,
  backgroundColor = colors.white,
}) {
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.container, {paddingTop: insets.top, backgroundColor}]}>
      <View style={styles.headerContent}>
        <View style={styles.leftContainer}>
          {leftIcon ? (
            <TouchableOpacity 
              style={styles.iconButton} 
              onPress={onLeftPress}
              activeOpacity={0.7}
            >
              <MaterialIcons name={leftIcon} size={rf(3.2)} color={colors.textLight} />
            </TouchableOpacity>
          ) : null}
          <Text style={styles.title}>{title}</Text>
        </View>

        <View style={styles.rightContainer}>
          {rightCustomComponent ? (
            rightCustomComponent
          ) : rightIcon ? (
            <TouchableOpacity 
              style={styles.iconButton} 
              onPress={onRightPress}
              activeOpacity={0.7}
            >
              <MaterialIcons name={rightIcon} size={rf(3.2)} color={colors.textLight} />
            </TouchableOpacity>
          ) : null}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
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
    zIndex: 10,
  },
  headerContent: {
    height: hp(8),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: wp(3),
  },
  leftContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: wp(3),
  },
  rightContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconButton: {
    padding: wp(1),
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: rf(2.4),
    fontWeight: '700',
    color: colors.secondary,
    letterSpacing: 0.5,
  },
});
