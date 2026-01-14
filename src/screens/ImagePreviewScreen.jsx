import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  SafeAreaView,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

export default function ImagePreviewScreen({navigation, route}) {
  const {imageUri} = route.params || {};

  return (
    <SafeAreaView style={styles.safe}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="arrow-back-ios" size={22} color="#ffffff" />
        </TouchableOpacity>

        <View style={styles.headerActions}>
          <TouchableOpacity style={styles.headerButton}>
            <Icon name="share" size={22} color="#ffffff" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.headerButton}>
            <Icon name="delete" size={22} color="#ff5a5a" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Image Preview */}
      <View style={styles.imageWrapper}>
        <Image
          source={{uri: imageUri}}
          resizeMode="contain"
          style={styles.image}
        />
      </View>

      {/* Bottom Actions */}
      <View style={styles.bottomBar}>
        <TouchableOpacity style={styles.actionButton}>
          <Icon name="download" size={24} color="#13ec5b" />
          <Text style={styles.actionText}>Save</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.actionButton}>
          <Icon name="share" size={24} color="#13ec5b" />
          <Text style={styles.actionText}>Share</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

/* ---------------- STYLES ---------------- */

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: '#000000',
  },

  header: {
    height: 56,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
  },

  headerActions: {
    flexDirection: 'row',
    gap: 16,
  },

  headerButton: {
    padding: 6,
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
    paddingVertical: 14,
    borderTopWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
    backgroundColor: '#000000',
  },

  actionButton: {
    alignItems: 'center',
    gap: 4,
  },

  actionText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#13ec5b',
  },
});
