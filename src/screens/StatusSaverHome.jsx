import React, { useEffect, useState } from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  ActivityIndicator,
  Platform,
  Linking,
  AppState,
} from 'react-native';

import RNFS from 'react-native-fs';
import { request, PERMISSIONS, RESULTS } from 'react-native-permissions';
import AsyncStorage from '@react-native-async-storage/async-storage';

import Header from '../components/Header';
import ImageGrid from '../components/ImageGrid';
import EmptyState from '../components/EmptyState';
import colors from '../theme/colors';

import {
  responsiveHeight as hp,
  responsiveFontSize as rf,
} from 'react-native-responsive-dimensions';

/* ---------------- WhatsApp Status Paths ---------------- */

const STATUS_PATHS = [
  '/storage/emulated/0/Android/media/com.whatsapp/WhatsApp/Media/.Statuses/',
  '/storage/emulated/0/Android/media/com.whatsapp/WhatsApp/Media/.Statuses',
  // '/storage/emulated/0/Android/media/com.whatsapp.w4b/WhatsApp Business/Media/.Statuses',
];

export default function StatusSaverHome() {
  const [activeTab, setActiveTab] = useState('images');
  const [statuses, setStatuses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const appState = React.useRef(AppState.currentState);

  /* ---------------- Permission ---------------- */

  const getPermission = () => {
    const permission =
      Platform.Version >= 33
        ? activeTab === 'images'
          ? PERMISSIONS.ANDROID.READ_MEDIA_IMAGES
          : PERMISSIONS.ANDROID.READ_MEDIA_VIDEO
        : PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE;

    console.log('[Permission] Required:', permission);
    return permission;
  };

  const requestPermission = async () => {
    console.log('[Permission] Request started');

    try {
      // First, get standard media permissions (which we still need for WhatsApp Images if needed, but MANAGE_EXTERNAL handles all)
      const result = await request(getPermission());
      console.log('[Permission] Media result:', result);

      if (Platform.OS === 'android' && Platform.Version >= 30) {
        const hasPrompted = await AsyncStorage.getItem('hasPromptedManageStorage');
        if (hasPrompted !== 'true') {
          console.log('[Permission] Android 11+ detected, requesting MANAGE_EXTERNAL_STORAGE');
          await AsyncStorage.setItem('hasPromptedManageStorage', 'true');
          
          // We prompt the user to grant all files access in settings
          try {
            await Linking.sendIntent('android.settings.MANAGE_APP_ALL_FILES_ACCESS_PERMISSION', [
              {
                key: 'android.intent.extra.PACKAGE_NAME',
                value: 'package:com.statusbag', // Make sure this matches your Android package name
              },
            ]);
          } catch (e) {
            console.log('[Permission] Failed to open specific settings, trying generic...');
            await Linking.sendIntent('android.settings.MANAGE_ALL_FILES_ACCESS_PERMISSION');
          }
          return; // Let the AppState listener handle the reload when they return
        }
      }

      console.log('[Permission] Request finished, loading statuses directly');
      loadStatuses();
    } catch (error) {
      console.error('[Permission] Request failed:', error);
      loadStatuses(); // Try loading anyway
    }
  };

  // Re-check files when returning from settings
  useEffect(() => {
    const subscription = AppState.addEventListener('change', nextAppState => {
      if (
        appState.current.match(/inactive|background/) &&
        nextAppState === 'active'
      ) {
        console.log('[App] App has come to the foreground! Reloading statuses...');
        loadStatuses(true);
      }
      appState.current = nextAppState;
    });

    return () => {
      subscription.remove();
    };
  }, [activeTab]);

  /* ---------------- Find Status Folder ---------------- */

  const findStatusPath = async () => {
    console.log('[Path] Searching for WhatsApp status directory');

    for (const path of STATUS_PATHS) {
      try {
        const exists = await RNFS.exists(path);
        console.log(`[Path] Checked: ${path} → ${exists}`);

        if (exists) {
          console.log('[Path] Using:', path);
          return path;
        }
      } catch (err) {
        console.error('[Path] Error checking path:', path, err);
      }
    }

    console.warn('[Path] No valid WhatsApp status directory found');
    return null;
  };

  /* ---------------- Load Statuses ---------------- */

  const performAutoSave = async (files) => {
    try {
      const autoSaveOn = await AsyncStorage.getItem('autoSave');
      if (autoSaveOn !== 'true') return;

      console.log('[AutoSave] Starting background auto-save for', files.length, 'files');

      for (const file of files) {
        const isVideoItem = file.name.endsWith('.mp4');
        const destDir = isVideoItem ? RNFS.DownloadDirectoryPath : RNFS.PicturesDirectoryPath;
        const folderPath = `${destDir}/StatusBag`;
        
        const folderExists = await RNFS.exists(folderPath);
        if (!folderExists) {
          await RNFS.mkdir(folderPath);
        }

        const destPath = `${folderPath}/${file.name}`;
        const fileExists = await RNFS.exists(destPath);
        if (!fileExists) {
           const rawSource = file.path.replace('file://', '');
           await RNFS.copyFile(rawSource, destPath).catch(() => {});
           RNFS.scanFile(destPath).catch(() => {});
        }
      }
      console.log('[AutoSave] Finished background auto-save');
    } catch (e) {
      console.error('[AutoSave] Error during auto-save:', e);
    }
  };

  const loadStatuses = async (isRefresh = false) => {
    console.log('[Status] Load started. Refresh:', isRefresh);
    console.log('[Status] Active tab:', activeTab);

    if (isRefresh) {
      setRefreshing(true);
    } else {
      setLoading(true);
    }

    try {
      const path = await findStatusPath();

      if (!path) {
        console.warn('[Status] Status folder not found');
        setStatuses([]);
        return;
      }

      const files = await RNFS.readDir(path);
      console.log('[Status] Total files found:', files.length);

      // const filtered = files.filter(file =>
      //   activeTab === 'images'
      //     ? /\.(jpg|png)$/i.test(file.name)
      //     : /\.mp4$/i.test(file.name),
      // );

      const filtered = files
        .filter(file =>
          activeTab === 'images'
            ? /\.(jpg|png)$/i.test(file.name)
            : /\.mp4$/i.test(file.name),
        )
        .map(file => ({
          name: file.name,
          path: 'file://' + file.path, // 🔥 FIX
        }));

      console.log('[Status] Filtered files:', filtered.length);
      console.log(
        '[Status] Sample:',
        filtered.slice(0, 3).map(f => f.name),
      );

      setStatuses(filtered);
      
      // Trigger background auto-save
      performAutoSave(filtered);
    } catch (error) {
      console.error('[Status] Failed to load statuses:', error);
      setStatuses([]);
    } finally {
      setLoading(false);
      setRefreshing(false);
      console.log('[Status] Load finished');
    }
  };

  /* ---------------- Effects ---------------- */

  useEffect(() => {
    console.log('[Effect] Active tab changed:', activeTab);
    requestPermission();
  }, [activeTab]);

  /* ---------------- UI ---------------- */

  return (
    <View style={styles.container}>
      <Header
        title="StatusBag"
        leftIcon={null}
        rightIcon="workspace-premium"
      />

      {/* Tabs */}
      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'images' && styles.activeTab]}
          onPress={() => {
            console.log('[UI] Images tab pressed');
            setActiveTab('images');
          }}>
          <Text
            style={[
              styles.tabText,
              activeTab === 'images' && styles.activeTabText,
            ]}>
            Images
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.tab, activeTab === 'videos' && styles.activeTab]}
          onPress={() => {
            console.log('[UI] Videos tab pressed');
            setActiveTab('videos');
          }}>
          <Text
            style={[
              styles.tabText,
              activeTab === 'videos' && styles.activeTabText,
            ]}>
            Videos
          </Text>
        </TouchableOpacity>
      </View>

      {/* Content */}
      {loading ? (
        <View style={styles.loader}>
          <ActivityIndicator size="large" color={colors.primary} />
        </View>
      ) : statuses.length === 0 ? (
        <>
          {console.log('[UI] Empty state displayed')}
          <EmptyState onOpenWhatsApp={() => { }} />
        </>
      ) : (
        <>
          {console.log('[UI] Rendering grid with items:', statuses.length)}
          <ImageGrid 
            data={statuses} 
            isVideo={activeTab === 'videos'} 
            refreshing={refreshing}
            onRefresh={() => loadStatuses(true)}
          />
        </>
      )}
    </View>
  );
}

/* ---------------- Styles ---------------- */

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.backgroundLight,
  },
  tabContainer: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: colors.grayLight,
    backgroundColor: colors.white,
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: hp(2),
    borderBottomWidth: 3,
    borderBottomColor: 'transparent',
  },
  activeTab: {
    borderBottomColor: colors.primary,
  },
  tabText: {
    fontSize: rf(1.8),
    fontWeight: '600',
    color: colors.grayMedium,
  },
  activeTabText: {
    color: colors.primaryDark,
    fontWeight: 'bold',
  },
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

