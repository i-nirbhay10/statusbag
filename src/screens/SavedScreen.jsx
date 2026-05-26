import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  ImageBackground,
  StyleSheet,
  Dimensions,
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Header from '../components/Header';
import colors from '../theme/colors';

const {width} = Dimensions.get('window');
const GRID_ITEM_SIZE = (width - 48) / 2; // 16px padding on both sides + 8px gap

const mediaData = [
  {
    id: '1',
    type: 'image',
    uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC3GuX29ogehkkzmTwTBwXGqwZf22857H8YjCSqtLoFJIPm2YZpNXQdr78FdH-zsphXMs9zMBQ9tiVCuktsTu5-_vDT7dXA_Adpcp_kkwgOptVysAIqD9a1AhiN7x7GGoyY1SLiPUepJ3iE7mfvPLipeYn2BlbmA-ShQpnGPDDLkm78RihPDuh2o7azrh2HHNAtwjjeMEZs1A',
  },
  {
    id: '2',
    type: 'image',
    uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCKLGqHWDAsj67kkWwHg4-VyIptp1LFaXKpYz0ImYMElAroqdD-nvk9aH0Fo6WYVYVuM28tZ7CpFNEH6l1pqyaNFpNweNFdrlSFESfDMXOA2fMMF0YuUMtGN_8B5gQugBaOARTePbgXyml_alfNqQHWo7_hovB42-iPmeDdGtB2kI9UkFD-oPq6wthqcLPrVbZ-2En7HVcfaTf7uEIC4A3R1CN3K3-I_ILUHWH2-qYaj9T1OXDFqYKKcl1ZtlMDmmz21HWQddSNP24',
  },
  {
    id: '3',
    type: 'image',
    uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBmCHSFDZSo17F6cqfkIy2BsD4dVy8-nPnJIXj8FSKV9mTUGKW4PxG_cJMg921bi2SigNZi3YPhzDsRAf0WAkLPN218g6uwfGCPSPojP_8d1K9MyFMswIiZ7LBhwHtn6hgrqLm5oBTln34uiVDjS0mgqzxEprqIRjm-vgD2EWbbtOd_5Jvv4kScWP-OCBx_ypitIkopJ7crq8q1dVIX_bRRQGl4Q24ZtbidZ-r8t_JXKkCTuomlqs7VGfjlC-Z565ZTugg4YoBWvmY',
  },
  {
    id: '4',
    type: 'image',
    uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBL3q_CcLKRbe0KYiCRJB6AL6D-PyFPTgWEfqqGtF4EtNshlfEDgyNW3Rgvv83nUe_yDleivZMIgCKqQ5QafqLcOgqH4biCgX2a9nORnhpJh7ykE3Ov7on5CyC24nrTIupUPm3HLItjtoZVyEQ1_fEWDmIqo0OxrKAiFQwkGQs-9QS9H53YK-XT62gEwBayQDaDsogj9uiDpCu5o58DMzufJBnjbT3gqeaosvjIECxxh53tTo5kmFnwC7b93e7zMsaFPftWHUUW1m8',
  },
];

export default function SavedScreen() {
  const [filter, setFilter] = useState('Images');

  const filteredData = mediaData.filter(item =>
    filter === 'Images' ? item.type === 'image' : item.type === 'video',
  );

  const renderItem = ({item}) => (
    <View style={styles.gridItem}>
      <ImageBackground
        source={{uri: item.uri}}
        style={styles.image}
        imageStyle={{borderRadius: 16}}>
        <View style={styles.overlay} />
        <View style={styles.gridButtons}>
          <TouchableOpacity
            style={[
              styles.iconButton,
              {backgroundColor: 'rgba(255,255,255,0.2)'},
            ]}>
            <MaterialIcons name="share" size={20} color="#fff" />
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.iconButton,
              {backgroundColor: 'rgba(255,255,255,0.2)'},
            ]}>
            <MaterialIcons name="delete" size={20} color="#fff" />
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Top AppBar using modular Header */}
      <Header 
        title="Your Downloads"
        leftIcon="arrow-back-ios"
        onLeftPress={() => {}} // Navigation can be injected
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
      <FlatList
        data={filteredData}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        numColumns={2}
        columnWrapperStyle={{justifyContent: 'space-between', marginBottom: 12}}
        contentContainerStyle={{paddingHorizontal: 16, paddingBottom: 120}}
      />
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
});
