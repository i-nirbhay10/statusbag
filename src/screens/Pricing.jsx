// App.js
import React from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  Alert,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/MaterialIcons';
import colors from '../theme/colors';

export default function Pricing() {
  const navigation = useNavigation();

  const handleUpgrade = async () => {
    try {
      await AsyncStorage.setItem('isPro', 'true');
      Alert.alert('Success', 'You have successfully upgraded to Pro!', [
        { text: 'Awesome!', onPress: () => navigation.goBack() }
      ]);
    } catch (error) {
      Alert.alert('Error', 'Failed to complete upgrade.');
    }
  };

  const handleRestore = async () => {
    try {
      const isPro = await AsyncStorage.getItem('isPro');
      if (isPro === 'true') {
        Alert.alert('Restored', 'Your Pro purchase has been restored!', [
          { text: 'OK', onPress: () => navigation.goBack() }
        ]);
      } else {
        Alert.alert('No Purchase Found', 'We could not find a previous Pro purchase.');
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to restore purchase.');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="close" size={28} color="#111813" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Go Pro</Text>
        <TouchableOpacity>
          <Icon name="workspace-premium" size={28} color="#D4AF37" />
        </TouchableOpacity>
      </View>

      {/* Main Content */}
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}>
        {/* Hero Section */}
        <View style={styles.hero}>
          <View style={styles.heroIconWrapper}>
            <Icon name="stars" size={48} color={colors.primary} />
          </View>
          <Text style={styles.heroTitle}>Unlock the Full Experience</Text>
          <Text style={styles.heroSubtitle}>
            Join 10,000+ Pro Users in India
          </Text>
        </View>

        {/* Features */}
        <View style={styles.features}>
          {[
            {
              icon: 'block',
              title: 'No Ads',
              desc: 'Enjoy a seamless experience without interruptions.',
            },
            {
              icon: 'dynamic-feed',
              title: 'Batch Download',
              desc: 'Save multiple statuses with a single tap.',
            },
            {
              icon: 'bolt',
              title: 'Ultra Fast Speed',
              desc: 'Optimized servers for lightning-quick saves.',
            },
          ].map((f, index) => (
            <View key={index} style={styles.featureCard}>
              <View style={styles.featureIcon}>
                <Icon name={f.icon} size={24} color={colors.primary} />
              </View>
              <View style={{flex: 1}}>
                <Text style={styles.featureTitle}>{f.title}</Text>
                <Text style={styles.featureDesc}>{f.desc}</Text>
              </View>
              <Icon name="check-circle" size={24} color={colors.primary} />
            </View>
          ))}
        </View>

        {/* Pricing */}
        <View style={styles.pricingSection}>
          <Text style={styles.pricingTitle}>Select a Plan</Text>

          <View style={styles.pricingWrapper}>
            {/* Monthly */}
            <View style={styles.planCard}>
              <View style={styles.planHeader}>
                <Text style={styles.planName}>Monthly</Text>
                <Text style={styles.planPrice}>
                  ₹99 <Text style={styles.planDuration}>/ month</Text>
                </Text>
              </View>
              <View style={styles.planFeatures}>
                <View style={styles.planFeature}>
                  <Icon name="check" size={18} color={colors.primary} />
                  <Text style={styles.planFeatureText}>Standard Features</Text>
                </View>
                <View style={styles.planFeature}>
                  <Icon name="check" size={18} color={colors.primary} />
                  <Text style={styles.planFeatureText}>Ads Disabled</Text>
                </View>
              </View>
            </View>

            {/* Yearly - Best Value */}
            <View style={[styles.planCard, styles.bestPlan]}>
              <View style={styles.bestBadge}>
                <Text style={styles.bestBadgeText}>Best Value</Text>
              </View>
              <View style={styles.planHeader}>
                <Text style={styles.planName}>Yearly</Text>
                <Text style={styles.planPrice}>
                  ₹499 <Text style={styles.planDuration}>/ year</Text>
                </Text>
              </View>
              <View style={styles.planFeatures}>
                <View style={styles.planFeature}>
                  <Icon name="check" size={18} color={colors.primary} />
                  <Text style={styles.planFeatureText}>Full Pro Suite</Text>
                </View>
                <View style={styles.planFeature}>
                  <Icon name="check" size={18} color={colors.primary} />
                  <Text style={styles.planFeatureText}>
                    Priority Status Support
                  </Text>
                </View>
                <View style={styles.planFeatureSave}>
                  <Icon name="savings" size={18} color={colors.primary} />
                  <Text style={styles.planSaveText}>Save 58% Yearly</Text>
                </View>
              </View>
            </View>
          </View>
        </View>

        {/* CTA */}
        <View style={styles.ctaSection}>
          <TouchableOpacity onPress={handleUpgrade}>
            <LinearGradient
              colors={['#D4AF37', colors.primary]}
              start={{x: 0, y: 0}}
              end={{x: 1, y: 1}}
              style={styles.ctaButton}>
              <Text style={styles.ctaText}>Upgrade to Pro</Text>
            </LinearGradient>
          </TouchableOpacity>
          <Text style={styles.ctaDisclaimer}>
            By subscribing, you agree to our Terms of Service and Privacy
            Policy. Subscriptions renew automatically unless cancelled.
          </Text>
        </View>

        {/* Footer */}
        <TouchableOpacity style={styles.footerButton} onPress={handleRestore}>
          <Text style={styles.footerButtonText}>Restore Purchase</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f6f8f6',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#fff',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#111813',
  },
  scrollContent: {
    paddingBottom: 40,
  },
  hero: {
    alignItems: 'center',
    paddingVertical: 24,
  },
  heroIconWrapper: {
    backgroundColor: colors.primaryLight,
    padding: 16,
    borderRadius: 50,
    marginBottom: 12,
  },
  heroTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#111813',
  },
  heroSubtitle: {
    fontSize: 14,
    marginTop: 4,
    color: '#61896f',
  },
  features: {
    paddingHorizontal: 16,
  },
  featureCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 16,
    marginBottom: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#dbe6df',
  },
  featureIcon: {
    width: 48,
    height: 48,
    borderRadius: 12,
    backgroundColor: colors.primaryLight,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  featureTitle: {fontWeight: 'bold', fontSize: 16, color: '#111813'},
  featureDesc: {fontSize: 13, color: '#61896f', marginTop: 2},
  pricingSection: {
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  pricingTitle: {
    fontSize: 12,
    fontWeight: 'bold',
    textTransform: 'uppercase',
    marginBottom: 12,
    color: '#111813',
  },
  pricingWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    gap: 12,
  },
  planCard: {
    flex: 1,
    minWidth: '48%',
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#dbe6df',
    marginBottom: 12,
    position: 'relative',
  },
  bestPlan: {
    borderWidth: 2,
    borderColor: colors.primary,
    shadowColor: colors.primary,
    shadowOpacity: 0.1,
    shadowOffset: {width: 0, height: 4},
    shadowRadius: 6,
  },
  bestBadge: {
    position: 'absolute',
    top: -8,
    right: 12,
    backgroundColor: colors.primary,
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 50,
  },
  bestBadgeText: {
    fontSize: 10,
    fontWeight: 'bold',
    color: colors.white,
  },
  planHeader: {
    marginBottom: 12,
  },
  planName: {fontSize: 14, fontWeight: 'bold', color: '#111813'},
  planPrice: {fontSize: 24, fontWeight: '900', color: '#111813'},
  planDuration: {fontSize: 12, fontWeight: 'bold', opacity: 0.7},
  planFeatures: {},
  planFeature: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  planFeatureText: {marginLeft: 6, fontSize: 13, color: '#111813'},
  planFeatureSave: {flexDirection: 'row', alignItems: 'center', marginTop: 4},
  planSaveText: {
    marginLeft: 6,
    fontSize: 13,
    fontWeight: 'bold',
    color: colors.primary,
  },
  ctaSection: {paddingHorizontal: 16, paddingTop: 24},
  ctaButton: {
    height: 56,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  ctaText: {fontWeight: '900', fontSize: 18, color: '#111813'},
  ctaDisclaimer: {
    textAlign: 'center',
    fontSize: 11,
    color: '#61896f',
    marginTop: 8,
  },
  footerButton: {alignItems: 'center', marginTop: 24},
  footerButtonText: {
    fontSize: 14,
    fontWeight: 'bold',
    textDecorationLine: 'underline',
    color: '#111813',
  },
});
