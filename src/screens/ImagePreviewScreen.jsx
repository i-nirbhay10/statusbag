import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ToastAndroid,
  Alert,
  Platform,
  Share,
} from 'react-native';
import Video from 'react-native-video';
import RNFS from 'react-native-fs';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import colors from '../theme/colors';

export default function ImagePreviewScreen({ navigation, route }) {
  const { imageUri, uri } = route.params || {};
  const insets = useSafeAreaInsets();
  const sourceUri = uri || imageUri;
  const isVideoItem = sourceUri?.endsWith('.mp4');

  const handleSave = async () => {
    if (!sourceUri) return;
    try {
      const fileName = sourceUri.substring(sourceUri.lastIndexOf('/') + 1);

      const destDir = isVideoItem ? RNFS.DownloadDirectoryPath : RNFS.PicturesDirectoryPath;
      const folderPath = `${destDir}/StatusBag`;

      const folderExists = await RNFS.exists(folderPath);
      if (!folderExists) {
        await RNFS.mkdir(folderPath);
      }

      const destPath = `${folderPath}/${fileName}`;

      const fileExists = await RNFS.exists(destPath);
      if (fileExists) {
        if (Platform.OS === 'android') {
          ToastAndroid.show('Already saved!', ToastAndroid.SHORT);
        } else {
          Alert.alert('Info', 'Already saved!');
        }
        return;
      }

      const rawSource = sourceUri.replace('file://', '');
      await RNFS.copyFile(rawSource, destPath);
      RNFS.scanFile(destPath).catch(() => { });

      if (Platform.OS === 'android') {
        ToastAndroid.show('Saved to StatusBag folder', ToastAndroid.SHORT);
      } else {
        Alert.alert('Success', 'Saved successfully!');
      }
    } catch (error) {
      console.error('Save failed:', error);
      if (Platform.OS === 'android') {
        ToastAndroid.show('Failed to save', ToastAndroid.SHORT);
      } else {
        Alert.alert('Error', 'Failed to save file');
      }
    }
  };

  const handleShare = async () => {
    if (!sourceUri) return;
    try {
      await Share.share({
        url: sourceUri,
        message: 'Check out this status from StatusBag!',
      });
    } catch (error) {
      console.error('Share error:', error);
      Alert.alert('Error', 'Could not share file');
    }
  };

  const handleDelete = () => {
    if (!sourceUri) return;
    Alert.alert(
      'Delete Status',
      'Are you sure you want to delete this file?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: async () => {
            try {
              const fileExists = await RNFS.exists(sourceUri.replace('file://', ''));
              if (fileExists) {
                await RNFS.unlink(sourceUri.replace('file://', ''));
                if (Platform.OS === 'android') {
                  ToastAndroid.show('Deleted successfully', ToastAndroid.SHORT);
                }
                navigation.goBack();
              } else {
                Alert.alert('Error', 'File not found');
              }
            } catch (error) {
              console.error('Delete error:', error);
              Alert.alert('Error', 'Failed to delete file');
            }
          },
        },
      ]
    );
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={[styles.header, { paddingTop: insets.top > 0 ? insets.top + 16 : 16 }]}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.headerButton}>
          <Icon name="arrow-back-ios" size={24} color={colors.white} />
        </TouchableOpacity>

        <View style={styles.headerActions}>


          <TouchableOpacity style={styles.headerButton} onPress={handleDelete}>
            <Icon name="delete" size={24} color="#ff5a5a" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Media Preview */}
      <View style={styles.mediaWrapper}>
        {isVideoItem ? (
          <Video
            source={{ uri: sourceUri }}
            style={styles.media}
            resizeMode="contain"
            controls={true}
            repeat={true}
          />
        ) : (
          <Image
            source={{ uri: sourceUri }}
            resizeMode="contain"
            style={styles.media}
          />
        )}
      </View>

      {/* Bottom Actions */}
      <View style={[styles.bottomBar, { paddingBottom: insets.bottom > 0 ? insets.bottom + 16 : 24 }]}>
        <TouchableOpacity style={styles.actionButton} onPress={handleSave}>
          <Icon name="file-download" size={24} color={colors.white} />
          <Text style={styles.actionText}>Save</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.actionButton} onPress={handleShare}>
          <Icon name="share" size={24} color={colors.white} />
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
    gap: 24,
  },

  headerButton: {
    padding: 8,
  },

  mediaWrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  media: {
    width: '100%',
    height: '100%',
  },

  bottomBar: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
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
  },

  actionText: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.white,
    marginTop: 2,
  },
});
