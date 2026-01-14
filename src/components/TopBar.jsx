import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import {
  responsiveHeight as hp,
  responsiveWidth as wp,
  responsiveFontSize as rf,
} from 'react-native-responsive-dimensions';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

export default function TopBar() {
  return (
    <View style={styles.container}>
      <View style={styles.leftContainer}>
        <MaterialIcons name="menu" size={rf(3)} color="#111813" />
        <Text style={styles.title}>Status Saver</Text>
      </View>
      <TouchableOpacity style={styles.crownButton}>
        <MaterialIcons name="crown" size={rf(3)} color="#13ec5b" />
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
    paddingHorizontal: wp(4),
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
    backgroundColor: '#fff',
  },
  leftContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: wp(2), // gap is supported in newer React Native versions
  },
  title: {
    fontSize: rf(2.2),
    fontWeight: 'bold',
    color: '#111813',
  },
  crownButton: {
    height: hp(5),
    width: hp(5),
    borderRadius: hp(2.5),
    backgroundColor: '#13ec5b22',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
