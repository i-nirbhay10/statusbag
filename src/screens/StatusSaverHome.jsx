import React from 'react';
import {
  SafeAreaView,
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
} from 'react-native';
import TopBar from '../components/TopBar';
import ImageGrid from '../components/ImageGrid';
import {
  responsiveHeight as hp,
  responsiveFontSize as rf,
} from 'react-native-responsive-dimensions';

export default function StatusSaverHome() {
  return (
    <SafeAreaView style={styles.container}>
      <TopBar />

      {/* Tab Selector */}
      <View style={styles.tabContainer}>
        <TouchableOpacity style={[styles.tab, styles.activeTab]}>
          <Text style={[styles.tabText, styles.activeTabText]}>Images</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.tab}>
          <Text style={styles.tabText}>Videos</Text>
        </TouchableOpacity>
      </View>

      {/* Image Grid */}
      <ImageGrid />
    </SafeAreaView>
  );
}

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
});
