import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import PermissionView from '../components/PermissionView';
import colors from '../theme/colors';

const PermissionScreen = ({navigation}) => {
  const onGrantPermission = async () => {
    // Hook this to permissionService later
    // await requestStoragePermission();
    navigation.replace('Home');
  };

  return (
    <View style={styles.container}>
      <StatusBar
        backgroundColor={colors.backgroundLight}
        barStyle="dark-content"
      />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="arrow-back-ios" size={22} color={colors.textLight} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Setup</Text>
        <View style={{width: 24}} />
      </View>

      {/* Progress */}
      <View style={styles.progress}>
        <View style={styles.dotActive} />
        <View style={styles.barActive} />
        <View style={styles.dotInactive} />
      </View>

      {/* Illustration */}
      <PermissionView />

      {/* Text Content */}
      <View style={styles.textBlock}>
        <Text style={styles.title}>Storage Access Needed</Text>
        <Text style={styles.description}>
          To show you your friends' statuses, we need permission to access your
          WhatsApp media folder.
        </Text>
      </View>

      {/* Actions */}
      <View style={styles.actions}>
        <TouchableOpacity
          style={styles.primaryButton}
          onPress={onGrantPermission}>
          <Icon name="lock-open" size={22} color="#102216" />
          <Text style={styles.primaryText}>Grant Permission</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.replace('Home')}>
          <Text style={styles.secondaryText}>I'll do it later</Text>
        </TouchableOpacity>
      </View>

      <View style={{height: 32}} />
    </View>
  );
};

export default PermissionScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.backgroundLight,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
  },
  headerTitle: {
    flex: 1,
    textAlign: 'center',
    fontSize: 18,
    fontWeight: '700',
    color: colors.textLight,
    marginRight: 24,
  },
  progress: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 8,
    paddingVertical: 20,
  },
  dotActive: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.primary,
  },
  barActive: {
    width: 32,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.primary,
  },
  dotInactive: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: 'rgba(19,236,91,0.2)',
  },
  textBlock: {
    paddingHorizontal: 24,
    paddingBottom: 16,
  },
  title: {
    fontSize: 32,
    fontWeight: '700',
    textAlign: 'center',
    color: colors.textLight,
    marginBottom: 12,
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
    textAlign: 'center',
    color: 'rgba(17,24,19,0.7)',
  },
  actions: {
    padding: 24,
    gap: 16,
  },
  primaryButton: {
    height: 64,
    backgroundColor: colors.primary,
    borderRadius: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    elevation: 6,
  },
  primaryText: {
    fontSize: 18,
    fontWeight: '700',
    color: '#102216',
  },
  secondaryText: {
    textAlign: 'center',
    fontSize: 16,
    fontWeight: '500',
    color: 'rgba(17,24,19,0.5)',
  },
});
