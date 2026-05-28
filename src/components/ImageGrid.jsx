import React from 'react';
import {
  View,
  FlatList,
  ImageBackground,
  TouchableOpacity,
  StyleSheet,
  ToastAndroid,
  Alert,
  Platform,
  RefreshControl,
} from 'react-native';
import RNFS from 'react-native-fs';

import {
  responsiveHeight as hp,
  responsiveWidth as wp,
  responsiveFontSize as rf,
} from 'react-native-responsive-dimensions';

import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';
import colors from '../theme/colors';

/* ---------------- Component ---------------- */

export default function ImageGrid({ data = [], isVideo = false, refreshing = false, onRefresh }) {
  const navigation = useNavigation();

  const onItemPress = item => {
    console.log('[Grid] Item pressed:', item.path || item);

    navigation.navigate('ImagePreview', {
      uri: item.path || item,
      isVideo,
    });
  };

  const onDownloadPress = async item => {
    console.log('[Grid] Download pressed:', item.path || item);
    try {
      const sourceUri = item.path || item;
      const isVideoItem = sourceUri.endsWith('.mp4');
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

      // Notify media scanner so it appears in the gallery
      RNFS.scanFile(destPath).catch(err => console.log('Scan failed:', err));

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

  const renderItem = ({ item, index }) => (
    <View style={styles.card}>
      <TouchableOpacity
        style={StyleSheet.absoluteFill}
        activeOpacity={0.85}
        onPress={() => onItemPress(item)}>
        <ImageBackground
          source={{ uri: item.path || item }}
          style={styles.image}
          resizeMode="cover">

          {isVideo && (
            <View style={styles.playIconContainer}>
              <MaterialIcons name="play-circle-outline" size={rf(4)} color="rgba(255,255,255,0.8)" />
            </View>
          )}
        </ImageBackground>
      </TouchableOpacity>

      {/* Download Button moved outside to prevent nested touch issues on Android */}
      <TouchableOpacity
        style={styles.downloadButton}
        onPress={() => onDownloadPress(item)}
        activeOpacity={0.8}>
        <MaterialIcons name="file-download" size={rf(2)} color={colors.white} />
      </TouchableOpacity>
    </View>
  );

  return (
    <FlatList
      data={data}
      keyExtractor={(item, index) => (item.path || item) + index}
      numColumns={3}
      renderItem={renderItem}
      contentContainerStyle={styles.list}
      showsVerticalScrollIndicator={false}
      refreshControl={
        onRefresh ? (
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={[colors.primary]}
          />
        ) : undefined
      }
    />
  );
}

/* ---------------- Styles ---------------- */

const styles = StyleSheet.create({
  list: {
    padding: wp(1.5),
    paddingBottom: hp(10), // Padding for bottom nav
  },
  card: {
    width: wp(30),
    aspectRatio: 3 / 4,
    margin: wp(1),
    borderRadius: wp(3),
    overflow: 'hidden',
    backgroundColor: colors.grayLight,
    elevation: 2, // shadow for android
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  image: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  playIconContainer: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
  },
  downloadButton: {
    position: 'absolute',
    bottom: hp(1),
    right: wp(1.5),
    height: hp(3.5),
    width: hp(3.5),
    borderRadius: hp(2.25),
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
});
