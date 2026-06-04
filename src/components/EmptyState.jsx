import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import colors from '../theme/colors';

export default function EmptyState({onOpenWhatsApp}) {
  return (
    <View style={styles.container}>
      {/* Illustration */}
      <View style={styles.illustrationWrapper}>
        <View style={styles.glow} />
        <Image
          source={require('../assets/statusbagLogo.png')}
          style={styles.illustration}
          resizeMode="contain"
        />
      </View>

      {/* Text */}
      <View style={styles.textWrapper}>
        <Text style={styles.title}>No Statuses Found</Text>
        <Text style={styles.subtitle}>
          Open WhatsApp and view some statuses first, they will appear here
          automatically.
        </Text>
      </View>

      {/* Action Button */}
      <TouchableOpacity
        style={styles.button}
        activeOpacity={0.85}
        onPress={onOpenWhatsApp}>
        <Icon name="chat" size={22} color={colors.white} />
        <Text style={styles.buttonText}>Open WhatsApp</Text>
      </TouchableOpacity>
    </View>
  );
}

/* ---------------- STYLES ---------------- */

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 32,
    backgroundColor: '#f6f8f6',
  },

  illustrationWrapper: {
    width: 260,
    height: 260,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 32,
  },

  glow: {
    position: 'absolute',
    width: 220,
    height: 220,
    borderRadius: 110,
    backgroundColor: colors.primaryLight,
  },

  illustration: {
    width: '100%',
    height: '100%',
  },

  textWrapper: {
    alignItems: 'center',
    marginBottom: 28,
  },

  title: {
    fontSize: 24,
    fontWeight: '800',
    color: '#111813',
    marginBottom: 8,
    textAlign: 'center',
  },

  subtitle: {
    fontSize: 15,
    fontWeight: '500',
    color: '#4e6354',
    textAlign: 'center',
    lineHeight: 22,
  },

  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: 56,
    width: '100%',
    borderRadius: 14,
    backgroundColor: colors.primary,
    gap: 10,
    shadowColor: colors.primary,
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 4,
  },

  buttonText: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.white,
  },
});
