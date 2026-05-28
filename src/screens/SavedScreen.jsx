import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  ImageBackground,
  StyleSheet,
  Dimensions,
  ActivityIndicator,
  Alert,
  RefreshControl,
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {useNavigation, useIsFocused} from '@react-navigation/native';
import RNFS from 'react-native-fs';
import Header from '../components/Header';
import colors from '../theme/colors';

const {width} = Dimensions.get('window');
const GRID_ITEM_SIZE = (width - 48) / 2; // 16px padding on both sides + 8px gap

export default function SavedScreen() {
  const navigation = useNavigation();
  const isFocused = useIsFocused();
  const [filter, setFilter] = useState('Images');
  const [savedMedia, setSavedMedia] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const fetchSavedMedia = async (isRefresh = false) => {
    if (isRefresh) {
      setRefreshing(true);
    } else {
      setLoading(true);
    }
    let allMedia = [];
    try {
      const picPath = `${RNFS.PicturesDirectoryPath}/StatusBag`;
      const picExists = await RNFS.exists(picPath);
      if (picExists) {
        const picFiles = await RNFS.readDir(picPath);
        picFiles.forEach(f => {
          if (/\.(jpg|jpeg|png)$/i.test(f.name)) {
            allMedia.push({ id: f.path, type: 'image', uri: 'file://' + f.path, path: f.path });
          }
        });
      }

      const vidPath = `${RNFS.DownloadDirectoryPath}/StatusBag`;
      const vidExists = await RNFS.exists(vidPath);
      if (vidExists) {
        const vidFiles = await RNFS.readDir(vidPath);
        vidFiles.forEach(f => {
          if (/\.(mp4)$/i.test(f.name)) {
            allMedia.push({ id: f.path, type: 'video', uri: 'file://' + f.path, path: f.path });
          }
        });
      }
      
      setSavedMedia(allMedia.reverse()); // latest roughly first
    } catch (e) {
      console.log('Error fetching saved media:', e);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    if (isFocused) {
      fetchSavedMedia();
    }
  }, [isFocused]);

  const handleDelete = (path) => {
    Alert.alert('Delete', 'Are you sure you want to delete this file?', [
      { text: 'Cancel', style: 'cancel' },
      { 
        text: 'Delete', 
        style: 'destructive',
        onPress: async () => {
          try {
            await RNFS.unlink(path);
            fetchSavedMedia();
          } catch (e) {
            console.log('Failed to delete:', e);
          }
        }
      }
    ]);
  };

  const filteredData = savedMedia.filter(item =>
    filter === 'Images' ? item.type === 'image' : item.type === 'video',
  );

  const renderItem = ({item}) => (
    <View style={styles.gridItem}>
      <TouchableOpacity 
        style={StyleSheet.absoluteFill} 
        activeOpacity={0.8}
        onPress={() => navigation.navigate('ImagePreview', { uri: item.uri })}
      >
        <ImageBackground
          source={{uri: item.uri}}
          style={styles.image}
          imageStyle={{borderRadius: 16}}>
          
          {item.type === 'video' && (
            <View style={styles.playIconContainer}>
              <MaterialIcons name="play-circle-outline" size={32} color="rgba(255,255,255,0.8)" />
            </View>
          )}

          <View style={styles.overlay} />
        </ImageBackground>
      </TouchableOpacity>
      
      <View style={styles.gridButtons}>
        <TouchableOpacity
          style={[
            styles.iconButton,
            {backgroundColor: 'rgba(255,255,255,0.2)'},
          ]}>
          <MaterialIcons name="share" size={20} color="#fff" />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => handleDelete(item.path)}
          style={[
            styles.iconButton,
            {backgroundColor: 'rgba(255,255,255,0.2)'},
          ]}>
          <MaterialIcons name="delete" size={20} color="#ff5a5a" />
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Top AppBar using modular Header */}
      <Header 
        title="Your Downloads"
        leftIcon="arrow-back-ios"
        onLeftPress={() => navigation.goBack()} 
        rightCustomComponent={
          <TouchableOpacity style={styles.selectButton}>
            <Text style={styles.selectButtonText}>Select</Text>
          </TouchableOpacity>
        }
      />

      {/* Filter Segmented Buttons */}
      <View style={styles.segmented}>
        {['Images', 'Videos'].map(type => (
          <TouchableOpacity
            key={type}
            onPress={() => setFilter(type)}
            style={[
              styles.segmentButton,
              filter === type && styles.segmentButtonActive,
            ]}>
            <Text
              style={[
                styles.segmentText,
                filter === type && styles.segmentTextActive,
              ]}>
              {type}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Media Grid */}
      {loading ? (
        <View style={styles.centerContainer}>
          <ActivityIndicator size="large" color={colors.primary} />
        </View>
      ) : filteredData.length === 0 ? (
        <View style={styles.centerContainer}>
          <MaterialIcons name="folder-open" size={48} color={colors.grayMedium} />
          <Text style={styles.emptyText}>No saved {filter.toLowerCase()} found</Text>
        </View>
      ) : (
        <FlatList
          data={filteredData}
          renderItem={renderItem}
          keyExtractor={item => item.id}
          numColumns={2}
          columnWrapperStyle={{justifyContent: 'space-between', marginBottom: 12}}
          contentContainerStyle={{paddingHorizontal: 16, paddingBottom: 120, paddingTop: 8}}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={() => fetchSavedMedia(true)}
              colors={[colors.primary]}
            />
          }
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: colors.backgroundLight},
  selectButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
    backgroundColor: colors.primaryLight,
  },
  selectButtonText: {color: colors.primaryDark, fontWeight: '700', fontSize: 14},
  segmented: {
    flexDirection: 'row',
    margin: 16,
    backgroundColor: colors.grayLight,
    borderRadius: 16,
    padding: 4,
  },
  segmentButton: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 12,
    paddingVertical: 8,
  },
  segmentButtonActive: {backgroundColor: colors.white},
  segmentText: {color: colors.grayMedium, fontWeight: '600'},
  segmentTextActive: {color: colors.textLight, fontWeight: 'bold'},
  gridItem: {
    width: GRID_ITEM_SIZE,
    height: GRID_ITEM_SIZE * 1.33,
    borderRadius: 16,
    overflow: 'hidden',
    backgroundColor: '#ccc',
  },
  image: {flex: 1, justifyContent: 'flex-end'},
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.2)',
  },
  gridButtons: {
    position: 'absolute',
    bottom: 8,
    right: 8,
    flexDirection: 'row',
    gap: 8,
  },
  iconButton: {
    width: 32,
    height: 32,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  playIconContainer: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    marginTop: 12,
    fontSize: 16,
    color: colors.grayMedium,
    fontWeight: '500',
  }
});
