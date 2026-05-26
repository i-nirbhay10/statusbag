import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ImageBackground,
  StyleSheet,
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {useNavigation} from '@react-navigation/native';
import colors from '../theme/colors';

export default function VideoPreviewScreen() {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      {/* Video Background */}
      <ImageBackground
        source={{
          uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAFpxnmYgGF0x9p13duLiRHcchuIhSITaSz4t1RDdkMkUTTWBbPxQIyXlMR68WTwrvTiLw2cKan2eeGj6MIJcsVMseZCMIBdDCu7kd0eXfwJD3eWVeyPyZh5PwemDLWl_jz39R2ClhlYq0cADCVV1m-_3YJpr1e0CeOXvWf59pm8kuOtsbnbZNzqEuEGhZvW1q5oTGLBnD3fJiEAxnPZF_LlzbYRWKn8NlyIvB70BdFeO4RhgUaTPnj_f2b_LgGoxavSmnt-tSP2H0',
        }}
        style={styles.background}>
        {/* Gradient Overlay */}
        <View style={styles.overlay} />

        {/* Top Navigation */}
        <View style={[styles.topNav, {top: insets.top > 0 ? insets.top : 16}]}>
          <TouchableOpacity style={styles.navButton} onPress={() => navigation.goBack()}>
            <MaterialIcons name="arrow-back-ios" size={24} color={colors.white} />
          </TouchableOpacity>
          <View style={styles.navBadge}>
            <Text style={styles.navBadgeText}>VIDEO STATUS</Text>
          </View>
          <View style={{width: 40}} />
        </View>

        {/* Center Play Button */}
        <TouchableOpacity style={styles.playButton} activeOpacity={0.8}>
          <MaterialIcons name="play-arrow" size={40} color={colors.white} />
        </TouchableOpacity>

        {/* Bottom Action Bar */}
        <View style={[styles.bottomBar, {bottom: insets.bottom > 0 ? insets.bottom + 16 : 40}]}>
          {/* Buttons */}
          <View style={styles.actionButtonContainer}>
            <TouchableOpacity
              style={[styles.actionButton, {backgroundColor: colors.primary}]}>
              <MaterialIcons name="file-download" size={28} color={colors.white} />
            </TouchableOpacity>
            <Text style={styles.actionLabel}>Save</Text>
          </View>

          <View style={styles.actionButtonContainer}>
            <TouchableOpacity
              style={[styles.actionButton, {backgroundColor: '#007AFF'}]}>
              <MaterialIcons name="ios-share" size={28} color={colors.white} />
            </TouchableOpacity>
            <Text style={styles.actionLabel}>Share</Text>
          </View>

          <View style={styles.actionButtonContainer}>
            <TouchableOpacity
              style={[styles.actionButton, {backgroundColor: colors.secondary}]}>
              <MaterialIcons name="sync" size={28} color={colors.white} />
            </TouchableOpacity>
            <Text style={styles.actionLabel}>Repost</Text>
          </View>
        </View>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  background: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.4)',
  },
  topNav: {
    position: 'absolute',
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    alignItems: 'center',
    zIndex: 10,
  },
  navButton: {
    backgroundColor: 'rgba(0,0,0,0.4)',
    padding: 8,
    borderRadius: 25,
    paddingLeft: 12, // For back icon centering
  },
  navBadge: {
    backgroundColor: 'rgba(0,0,0,0.5)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 25,
  },
  navBadgeText: {
    color: colors.white,
    fontWeight: '700',
    fontSize: 12,
    letterSpacing: 0.5,
  },
  playButton: {
    backgroundColor: colors.primary,
    width: 72,
    height: 72,
    borderRadius: 36,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: colors.primary,
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.4,
    shadowRadius: 10,
    elevation: 8,
  },
  bottomBar: {
    position: 'absolute',
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  actionButtonContainer: {
    alignItems: 'center',
  },
  actionButton: {
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  actionLabel: {
    color: colors.white,
    fontSize: 12,
    fontWeight: '600',
    marginTop: 8,
    textShadowColor: 'rgba(0,0,0,0.5)',
    textShadowOffset: {width: 0, height: 1},
    textShadowRadius: 2,
  },
});
