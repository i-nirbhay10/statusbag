import React from 'react';
import {
  View,
  FlatList,
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
import {useNavigation} from '@react-navigation/native';
import colors from '../theme/colors';

/* ---------------- Component ---------------- */

export default function ImageGrid({data = [], isVideo = false}) {
  const navigation = useNavigation();

  const onItemPress = item => {
    console.log('[Grid] Item pressed:', item.path || item);

    navigation.navigate('ImagePreview', {
      uri: item.path || item,
      isVideo,
    });
  };

  const onDownloadPress = item => {
    console.log('[Grid] Download pressed:', item.path || item);
    // TODO: implement save logic
  };

  const renderItem = ({item, index}) => (
    <TouchableOpacity
      style={styles.card}
      activeOpacity={0.85}
      onPress={() => onItemPress(item)}>
      <ImageBackground
        source={{uri: item.path || item}}
        style={styles.image}
        resizeMode="cover">
        
        {isVideo && (
          <View style={styles.playIconContainer}>
            <MaterialIcons name="play-circle-outline" size={rf(4)} color="rgba(255,255,255,0.8)" />
          </View>
        )}

        <TouchableOpacity
          style={styles.downloadButton}
          onPress={() => onDownloadPress(item)}
          activeOpacity={0.8}>
          <MaterialIcons name="file-download" size={rf(2.4)} color={colors.white} />
        </TouchableOpacity>
      </ImageBackground>
    </TouchableOpacity>
  );

  return (
    <FlatList
      data={data}
      keyExtractor={(item, index) => (item.path || item) + index}
      numColumns={3}
      renderItem={renderItem}
      contentContainerStyle={styles.list}
      showsVerticalScrollIndicator={false}
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
    height: hp(4.5),
    width: hp(4.5),
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

// import React from 'react';
// import {
//   View,
//   ScrollView,
//   ImageBackground,
//   TouchableOpacity,
//   StyleSheet,
// } from 'react-native';
// import {
//   responsiveHeight as hp,
//   responsiveWidth as wp,
//   responsiveFontSize as rf,
// } from 'react-native-responsive-dimensions';
// import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
// import {useNavigation} from '@react-navigation/native';

// const images = [
//   'https://www.devoutgrowth.com/admin/team_uploads/1763707290_6920099a27a61_WhatsApp%20Image%202025-11-21%20at%2012.08.10%20PM.jpeg',
//   'https://lh3.googleusercontent.com/aida-public/AB6AXuApE35r7cF7Y8Gb3I-CbISHb5C7u5lXgab9MgD7RAU_5s-5xSTWUsHnhMB8Mbd81OAfjcOhrkXcx9ENFk13kbRrkJ79WgU_P3XN6rla4cfB56TV2bY4hbRY6v_6lKASwxx5bFIdOSVWQdrDUdI0DwH7mJg4o6GGRIvUwgYWGx3V-0H9PWt3w2SIMPvcOfqWoIq8t_xi_Lp4Lg76woBpa0Nhsw5K2MH6vR3xTf8EMBlxh6y4SPnG2_3IZBr18LZAMLDuxvnZ1VibV9s',
// ];

// export default function ImageGrid() {
//   const navigation = useNavigation();

//   return (
//     <ScrollView contentContainerStyle={styles.scrollContainer}>
//       <View style={styles.grid}>
//         {images.map((img, idx) => (
//           <TouchableOpacity
//             key={idx}
//             style={styles.card}
//             activeOpacity={0.8}
//             onPress={() =>
//               navigation.navigate('ImagePreview', {
//                 imageUri: img,
//               })
//             }>
//             <ImageBackground
//               source={{uri: img}}
//               style={styles.image}
//               resizeMode="cover">
//               <TouchableOpacity style={styles.downloadButton}>
//                 <MaterialIcons name="download" size={rf(2)} color="#fff" />
//               </TouchableOpacity>
//             </ImageBackground>
//           </TouchableOpacity>
//         ))}
//       </View>
//     </ScrollView>
//   );
// }

// const styles = StyleSheet.create({
//   scrollContainer: {
//     padding: wp(1),
//   },
//   grid: {
//     flexDirection: 'row',
//     flexWrap: 'wrap',
//     justifyContent: 'space-between',
//   },
//   card: {
//     width: wp(30),
//     aspectRatio: 4 / 5,
//     marginBottom: wp(1),
//     borderRadius: wp(2),
//     overflow: 'hidden',
//     backgroundColor: '#e5e7eb',
//   },
//   image: {
//     flex: 1,
//   },
//   downloadButton: {
//     position: 'absolute',
//     bottom: hp(1),
//     right: wp(1),
//     height: hp(4),
//     width: hp(4),
//     borderRadius: hp(2),
//     backgroundColor: '#13ec5b',
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
// });

// // import React from 'react';
// // import {
// //   View,
// //   ScrollView,
// //   ImageBackground,
// //   TouchableOpacity,
// //   StyleSheet,
// // } from 'react-native';
// // import {
// //   responsiveHeight as hp,
// //   responsiveWidth as wp,
// //   responsiveFontSize as rf,
// // } from 'react-native-responsive-dimensions';
// // import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
// // import {useNavigation} from '@react-navigation/native';

// // const images = [
// //   'https://www.devoutgrowth.com/admin/team_uploads/1763707290_6920099a27a61_WhatsApp%20Image%202025-11-21%20at%2012.08.10%20PM.jpeg',
// //   'https://lh3.googleusercontent.com/aida-public/AB6AXuApE35r7cF7Y8Gb3I-CbISHb5C7u5lXgab9MgD7RAU_5s-5xSTWUsHnhMB8Mbd81OAfjcOhrkXcx9ENFk13kbRrkJ79WgU_P3XN6rla4cfB56TV2bY4hbRY6v_6lKASwxx5bFIdOSVWQdrDUdI0DwH7mJg4o6GGRIvUwgYWGx3V-0H9PWt3w2SIMPvcOfqWoIq8t_xi_Lp4Lg76woBpa0Nhsw5K2MH6vR3xTf8EMBlxh6y4SPnG2_3IZBr18LZAMLDuxvnZ1VibV9s',
// // ];

// // export default function ImageGrid() {
// //   const navigation = useNavigation();

// //   return (
// //     <ScrollView contentContainerStyle={styles.scrollContainer}>
// //       <View style={styles.grid}>
// //         {images.map((img, idx) => (
// //           <TouchableOpacity
// //             key={idx}
// //             style={styles.card}
// //             activeOpacity={0.8}
// //             onPress={() =>
// //               navigation.navigate('ImagePreview', {
// //                 imageUri: img,
// //               })
// //             }>
// //             <ImageBackground
// //               source={{uri: img}}
// //               style={styles.image}
// //               resizeMode="cover">
// //               <TouchableOpacity style={styles.downloadButton}>
// //                 <MaterialIcons name="download" size={rf(2)} color="#fff" />
// //               </TouchableOpacity>
// //             </ImageBackground>
// //           </TouchableOpacity>
// //         ))}
// //       </View>
// //     </ScrollView>
// //   );
// // }

// // const styles = StyleSheet.create({
// //   scrollContainer: {
// //     padding: wp(1),
// //   },
// //   grid: {
// //     flexDirection: 'row',
// //     flexWrap: 'wrap',
// //     justifyContent: 'space-between',
// //   },
// //   card: {
// //     width: wp(30),
// //     aspectRatio: 4 / 5,
// //     marginBottom: wp(1),
// //     borderRadius: wp(2),
// //     overflow: 'hidden',
// //     backgroundColor: '#e5e7eb',
// //   },
// //   image: {
// //     flex: 1,
// //   },
// //   downloadButton: {
// //     position: 'absolute',
// //     bottom: hp(1),
// //     right: wp(1),
// //     height: hp(4),
// //     width: hp(4),
// //     borderRadius: hp(2),
// //     backgroundColor: '#13ec5b',
// //     justifyContent: 'center',
// //     alignItems: 'center',
// //   },
// // });
