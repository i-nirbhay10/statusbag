import React from 'react';
import { View, Text, ScrollView, StyleSheet, StatusBar } from 'react-native';
import Header from '../components/Header';
import colors from '../theme/colors';

export default function TermsOfServiceScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={colors.white} />
      <Header 
        title="Terms of Service"
        leftIcon="arrow-back-ios"
        onLeftPress={() => navigation.goBack()}
      />
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.heading}>Terms of Service</Text>
        <Text style={styles.paragraph}>
          Last updated: [Date]
        </Text>
        <Text style={styles.paragraph}>
          These Terms of Service constitute a legally binding agreement made between you and StatusBag concerning your access to and use of our mobile application. You agree that by accessing the Application, you have read, understood, and agreed to be bound by all of these Terms of Service. If you do not agree with all of these Terms of Service, then you are expressly prohibited from using the Application and you must discontinue use immediately.
        </Text>
        <Text style={styles.heading}>1. User Representations</Text>
        <Text style={styles.paragraph}>
          By using the Application, you represent and warrant that:
          {'\n'}• All registration information you submit will be true, accurate, current, and complete.
          {'\n'}• You will maintain the accuracy of such information and promptly update such registration information as necessary.
          {'\n'}• You have the legal capacity and you agree to comply with these Terms of Service.
        </Text>
        <Text style={styles.heading}>2. Prohibited Activities</Text>
        <Text style={styles.paragraph}>
          You may not access or use the Application for any purpose other than that for which we make the Application available. The Application may not be used in connection with any commercial endeavors except those that are specifically endorsed or approved by us.
        </Text>
        <Text style={styles.heading}>3. Modifications and Interruptions</Text>
        <Text style={styles.paragraph}>
          We reserve the right to change, modify, or remove the contents of the Application at any time or for any reason at our sole discretion without notice. However, we have no obligation to update any information on our Application.
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
