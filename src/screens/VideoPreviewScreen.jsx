import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ImageBackground,
  StyleSheet,
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

export default function VideoPreviewScreen() {
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
        <View style={styles.topNav}>
          <TouchableOpacity style={styles.navButton}>
            <MaterialIcons name="arrow-back-ios" size={24} color="#fff" />
          </TouchableOpacity>
          <View style={styles.navBadge}>
            <Text style={styles.navBadgeText}>VIDEO STATUS</Text>
          </View>
          <View style={{width: 40}} />
        </View>

        {/* Center Play Button */}
        <TouchableOpacity style={styles.playButton}>
          <MaterialIcons name="play-arrow" size={40} color="#000" />
        </TouchableOpacity>

        {/* Bottom Action Bar */}
        <View style={styles.bottomBar}>
          {/* Buttons */}
          <View style={styles.actionButtonContainer}>
            <TouchableOpacity
              style={[styles.actionButton, {backgroundColor: '#13ec5b'}]}>
              <MaterialIcons name="download" size={28} color="#000" />
            </TouchableOpacity>
            <Text style={styles.actionLabel}>Save</Text>
          </View>

          <View style={styles.actionButtonContainer}>
            <TouchableOpacity
              style={[styles.actionButton, {backgroundColor: '#007AFF'}]}>
              <MaterialIcons name="ios_share" size={28} color="#fff" />
            </TouchableOpacity>
            <Text style={styles.actionLabel}>Share</Text>
          </View>

          <View style={styles.actionButtonContainer}>
            <TouchableOpacity
              style={[styles.actionButton, {backgroundColor: '#25D366'}]}>
              <MaterialIcons name="sync" size={28} color="#fff" />
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
    top: 50,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    alignItems: 'center',
  },
  navButton: {
    backgroundColor: 'rgba(0,0,0,0.3)',
    padding: 8,
    borderRadius: 25,
  },
  navBadge: {
    backgroundColor: 'rgba(0,0,0,0.3)',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 25,
  },
  navBadgeText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 12,
  },
  playButton: {
    backgroundColor: '#13ec5b',
    width: 80,
    height: 80,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#13ec5b',
    shadowOffset: {width: 0, height: 0},
    shadowOpacity: 0.5,
    shadowRadius: 15,
  },
  bottomBar: {
    position: 'absolute',
    bottom: 40,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  actionButtonContainer: {
    alignItems: 'center',
  },
  actionButton: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  actionLabel: {
    color: '#fff',
    fontSize: 10,
    fontWeight: '600',
    marginTop: 4,
  },
});
