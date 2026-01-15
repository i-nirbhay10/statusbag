import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  ActivityIndicator,
  Platform,
} from 'react-native';

import RNFS from 'react-native-fs';
import {request, PERMISSIONS, RESULTS} from 'react-native-permissions';

import TopBar from '../components/TopBar';
import ImageGrid from '../components/ImageGrid';
import EmptyState from '../components/EmptyState';

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
  const [hasPermission, setHasPermission] = useState(false);

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
      const result = await request(getPermission());
      console.log('[Permission] Result:', result);

      const granted = result === RESULTS.GRANTED;
      setHasPermission(granted);

      console.log('[Permission] Granted:', granted);
    } catch (error) {
      console.error('[Permission] Request failed:', error);
      setHasPermission(false);
    }
  };

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

  const loadStatuses = async () => {
    console.log('[Status] Load started');
    console.log('[Status] Active tab:', activeTab);

    setLoading(true);

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
    } catch (error) {
      console.error('[Status] Failed to load statuses:', error);
      setStatuses([]);
    } finally {
      setLoading(false);
      console.log('[Status] Load finished');
    }
  };

  /* ---------------- Effects ---------------- */

  useEffect(() => {
    console.log('[Effect] Active tab changed:', activeTab);
    requestPermission();
  }, [activeTab]);

  useEffect(() => {
    console.log('[Effect] Permission state:', hasPermission);

    if (hasPermission) {
      loadStatuses();
    } else {
      console.warn('[Effect] Permission denied — skipping load');
    }
  }, [hasPermission, activeTab]);

  /* ---------------- UI ---------------- */

  return (
    <SafeAreaView style={styles.container}>
      <TopBar />

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
          <ActivityIndicator size="large" color="#13ec5b" />
        </View>
      ) : statuses.length === 0 ? (
        <>
          {console.log('[UI] Empty state displayed')}
          <EmptyState onOpenWhatsApp={() => {}} />
        </>
      ) : (
        <>
          {console.log('[UI] Rendering grid with items:', statuses.length)}
          <ImageGrid data={statuses} isVideo={activeTab === 'videos'} />
        </>
      )}
    </SafeAreaView>
  );
}

/* ---------------- Styles ---------------- */

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f6f8f6',
  },
  tabContainer: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: hp(2),
    borderBottomWidth: 2,
    borderBottomColor: 'transparent',
  },
  activeTab: {
    borderBottomColor: '#13ec5b',
  },
  tabText: {
    fontSize: rf(1.8),
    fontWeight: 'bold',
    color: '#9ca3af',
  },
  activeTabText: {
    color: '#13ec5b',
  },
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

// // import React from 'react';
// // import {
// //   SafeAreaView,
// //   View,
// //   TouchableOpacity,
// //   Text,
// //   StyleSheet,
// // } from 'react-native';
// // import TopBar from '../components/TopBar';
// // import ImageGrid from '../components/ImageGrid';
// // import {
// //   responsiveHeight as hp,
// //   responsiveFontSize as rf,
// // } from 'react-native-responsive-dimensions';

// // export default function StatusSaverHome() {
// //   return (
// //     <SafeAreaView style={styles.container}>
// //       <TopBar />

// //       {/* Tab Selector */}
// //       <View style={styles.tabContainer}>
// //         <TouchableOpacity style={[styles.tab, styles.activeTab]}>
// //           <Text style={[styles.tabText, styles.activeTabText]}>Images</Text>
// //         </TouchableOpacity>
// //         <TouchableOpacity style={styles.tab}>
// //           <Text style={styles.tabText}>Videos</Text>
// //         </TouchableOpacity>
// //       </View>

// //       {/* Image Grid */}
// //       <ImageGrid />
// //     </SafeAreaView>
// //   );
// // }

// // const styles = StyleSheet.create({
// //   container: {
// //     flex: 1,
// //     backgroundColor: '#f6f8f6',
// //   },
// //   tabContainer: {
// //     flexDirection: 'row',
// //     borderBottomWidth: 1,
// //     borderBottomColor: '#e5e7eb',
// //   },
// //   tab: {
// //     flex: 1,
// //     alignItems: 'center',
// //     paddingVertical: hp(2),
// //     borderBottomWidth: 2,
// //     borderBottomColor: 'transparent',
// //   },
// //   activeTab: {
// //     borderBottomColor: '#13ec5b',
// //   },
// //   tabText: {
// //     fontSize: rf(1.8),
// //     fontWeight: 'bold',
// //     color: '#9ca3af',
// //   },
// //   activeTabText: {
// //     color: '#13ec5b',
// //   },
// // });
