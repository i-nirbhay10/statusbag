import React from 'react';
import { View, Text, ScrollView, StyleSheet, StatusBar } from 'react-native';
import Header from '../components/Header';
import colors from '../theme/colors';

export default function PrivacyPolicyScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={colors.white} />
      <Header 
        title="Privacy Policy"
        leftIcon="arrow-back-ios"
        onLeftPress={() => navigation.goBack()}
      />
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.heading}>Privacy Policy</Text>
        <Text style={styles.paragraph}>
          Last updated: [Date]
        </Text>
        <Text style={styles.paragraph}>
          Welcome to StatusBag. We value your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our mobile application. Please read this privacy policy carefully. If you do not agree with the terms of this privacy policy, please do not access the application.
        </Text>
        <Text style={styles.heading}>1. Information We Collect</Text>
        <Text style={styles.paragraph}>
          The application may collect certain information automatically, including, but not limited to, the type of mobile device you use, your mobile devices unique device ID, the IP address of your mobile device, your mobile operating system, the type of mobile Internet browsers you use, and information about the way you use the Application.
        </Text>
        <Text style={styles.heading}>2. Use of Your Information</Text>
        <Text style={styles.paragraph}>
          Having accurate information about you permits us to provide you with a smooth, efficient, and customized experience. Specifically, we may use information collected about you via the Application to:
          {'\n'}• Compile anonymous statistical data and analysis for use internally or with third parties.
          {'\n'}• Improve the efficiency and operation of the Application.
          {'\n'}• Monitor and analyze usage and trends to improve your experience with the Application.
        </Text>
        <Text style={styles.heading}>3. Contact Us</Text>
        <Text style={styles.paragraph}>
          If you have questions or comments about this Privacy Policy, please contact us at support@statusbag.com.
        </Text>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.backgroundLight,
  },
  content: {
    padding: 16,
    paddingBottom: 40,
  },
  heading: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.textLight,
    marginTop: 16,
    marginBottom: 8,
  },
  paragraph: {
    fontSize: 14,
    color: colors.textLight,
    lineHeight: 22,
    marginBottom: 12,
  },
});
