import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import colors from '../theme/colors';

const PermissionView = () => {
  return (
    <View style={styles.illustrationWrapper}>
      <View style={styles.phoneFrame}>
        {/* Speaker */}
        <View style={styles.speaker} />

        {/* Mock Content */}
        <View style={styles.mockContent}>
          <View style={styles.mockCard} />
          <View style={styles.mockLineShort} />
          <View style={styles.mockLine} />
        </View>

        {/* Shield Overlay */}
        <View style={styles.overlay}>
          <View style={styles.shield}>
            <Icon name="verified-user" size={48} color="#fff" />
          </View>
        </View>
      </View>
    </View>
  );
};

export default PermissionView;

const styles = StyleSheet.create({
  illustrationWrapper: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 32,
  },
  phoneFrame: {
    width: 190,
    height: 360,
    backgroundColor: '#fff',
    borderRadius: 32,
    borderWidth: 6,
    borderColor: '#111813',
    padding: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.25,
    shadowRadius: 16,
    elevation: 10,
    position: 'relative',
  },
  speaker: {
    width: 64,
    height: 4,
    borderRadius: 4,
    backgroundColor: '#111813',
    marginBottom: 24,
  },
  mockContent: {
    width: '100%',
    gap: 12,
  },
  mockCard: {
    width: '100%',
    height: 96,
    borderRadius: 12,
    backgroundColor: 'rgba(19,236,91,0.2)',
  },
  mockLine: {
    width: '100%',
    height: 12,
    borderRadius: 6,
    backgroundColor: '#e5e7eb',
  },
  mockLineShort: {
    width: '66%',
    height: 12,
    borderRadius: 6,
    backgroundColor: '#e5e7eb',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    alignItems: 'center',
    justifyContent: 'center',
  },
  shield: {
    width: 96,
    height: 96,
    borderRadius: 48,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 4,
    borderColor: '#fff',
    elevation: 12,
  },
});
