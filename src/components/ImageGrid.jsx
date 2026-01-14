import React from 'react';
import {
  View,
  ScrollView,
  ImageBackground,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import {
  responsiveHeight as hp,
  responsiveWidth as wp,
  responsiveFontSize as rf,
} from 'react-native-responsive-dimensions';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const images = [
  'https://www.devoutgrowth.com/admin/team_uploads/1763707290_6920099a27a61_WhatsApp%20Image%202025-11-21%20at%2012.08.10%20PM.jpeg',
  'https://lh3.googleusercontent.com/aida-public/AB6AXuApE35r7cF7Y8Gb3I-CbISHb5C7u5lXgab9MgD7RAU_5s-5xSTWUsHnhMB8Mbd81OAfjcOhrkXcx9ENFk13kbRrkJ79WgU_P3XN6rla4cfB56TV2bY4hbRY6v_6lKASwxx5bFIdOSVWQdrDUdI0DwH7mJg4o6GGRIvUwgYWGx3V-0H9PWt3w2SIMPvcOfqWoIq8t_xi_Lp4Lg76woBpa0Nhsw5K2MH6vR3xTf8EMBlxh6y4SPnG2_3IZBr18LZAMLDuxvnZ1VibV9s',
  // Add more images
];

export default function ImageGrid() {
  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.grid}>
        {images.map((img, idx) => (
          <View key={idx} style={styles.card}>
            <ImageBackground
              source={{
                uri: 'https://www.devoutgrowth.com/admin/team_uploads/1763707290_6920099a27a61_WhatsApp%20Image%202025-11-21%20at%2012.08.10%20PM.jpeg',
              }}
              style={styles.image}
              resizeMode="cover">
              <TouchableOpacity style={styles.downloadButton}>
                <MaterialIcons name="download" size={rf(2)} color="#fff" />
              </TouchableOpacity>
            </ImageBackground>
          </View>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    padding: wp(1),
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  card: {
    width: wp(30),
    aspectRatio: 4 / 5,
    marginBottom: wp(1),
    borderRadius: wp(2),
    overflow: 'hidden',
    backgroundColor: '#e5e7eb',
  },
  image: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  downloadButton: {
    position: 'absolute',
    bottom: hp(1),
    right: wp(1),
    height: hp(4),
    width: hp(4),
    borderRadius: hp(2),
    backgroundColor: '#13ec5b',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
