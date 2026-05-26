import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import colors from '../theme/colors';

export default function ImagePreviewScreen({navigation, route}) {
  const {imageUri, uri} = route.params || {};
  const insets = useSafeAreaInsets();
  const sourceUri = uri || imageUri;

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={[styles.header, {paddingTop: insets.top}]}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.headerButton}>
          <Icon name="arrow-back-ios" size={24} color={colors.white} />
        </TouchableOpacity>

        <View style={styles.headerActions}>
          <TouchableOpacity style={styles.headerButton}>
            <Icon name="share" size={24} color={colors.white} />
          </TouchableOpacity>

          <TouchableOpacity style={styles.headerButton}>
            <Icon name="delete" size={24} color="#ff5a5a" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Image Preview */}
      <View style={styles.imageWrapper}>
        <Image
          source={{uri: sourceUri}}
          resizeMode="contain"
          style={styles.image}
        />
      </View>

      {/* Bottom Actions */}
      <View style={[styles.bottomBar, {paddingBottom: insets.bottom > 0 ? insets.bottom : 16}]}>
        <TouchableOpacity style={styles.actionButton}>
          <Icon name="file-download" size={28} color={colors.primary} />
          <Text style={styles.actionText}>Save</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.actionButton}>
          <Icon name="share" size={28} color={colors.primary} />
          <Text style={styles.actionText}>Share</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

/* ---------------- STYLES ---------------- */

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
  },

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingBottom: 16,
    backgroundColor: 'rgba(0,0,0,0.5)',
    zIndex: 10,
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
  },

  headerActions: {
    flexDirection: 'row',
    gap: 16,
  },

  headerButton: {
    padding: 8,
  },

  imageWrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  image: {
    width: '100%',
    height: '100%',
  },

  bottomBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingTop: 16,
    borderTopWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
    backgroundColor: 'rgba(0,0,0,0.5)',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },

  actionButton: {
    alignItems: 'center',
    gap: 6,
  },

  actionText: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.primary,
  },
});
