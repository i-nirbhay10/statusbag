import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Switch,
  ScrollView,
  SafeAreaView,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

export default function SettingsScreen({navigation}) {
  const [autoSave, setAutoSave] = useState(true);
  const [notifications, setNotifications] = useState(true);

  return (
    <SafeAreaView style={styles.safe}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="arrow-back-ios" size={22} color="#111813" />
        </TouchableOpacity>

        <Text style={styles.headerTitle}>App Settings</Text>

        <Icon name="search" size={22} color="#111813" />
      </View>

      <ScrollView contentContainerStyle={styles.container}>
        {/* ACCOUNT */}
        <Section title="Account" />

        <TouchableOpacity
          style={styles.row}
          onPress={() => navigation.navigate('Pricing')}>
          <View style={styles.rowLeft}>
            <View style={[styles.iconBox, styles.proIcon]}>
              <Icon name="workspace-premium" size={22} color="#13ec5b" />
            </View>
            <View>
              <Text style={styles.rowTitle}>Upgrade to Pro</Text>
              <Text style={styles.rowSub}>
                Remove ads and support development
              </Text>
            </View>
          </View>
          <Icon name="chevron-right" size={24} color="#9ca3af" />
        </TouchableOpacity>

        <Divider />

        {/* GENERAL */}
        <Section title="General" />

        <View style={styles.row}>
          <View style={styles.rowLeft}>
            <View style={styles.iconBox}>
              <Icon name="download-done" size={22} color="#6b7280" />
            </View>
            <Text style={styles.rowTitle}>Auto-save Statuses</Text>
          </View>
          <Switch
            value={autoSave}
            onValueChange={setAutoSave}
            trackColor={{false: '#e5e7eb', true: '#13ec5b'}}
            thumbColor="#ffffff"
          />
        </View>

        <Divider />

        <View style={styles.row}>
          <View style={styles.rowLeft}>
            <View style={styles.iconBox}>
              <Icon name="notifications-active" size={22} color="#6b7280" />
            </View>
            <Text style={styles.rowTitle}>Push Notifications</Text>
          </View>
          <Switch
            value={notifications}
            onValueChange={setNotifications}
            trackColor={{false: '#e5e7eb', true: '#13ec5b'}}
            thumbColor="#ffffff"
          />
        </View>

        <Divider />

        <TouchableOpacity style={styles.row}>
          <View style={styles.rowLeft}>
            <View style={styles.iconBox}>
              <Icon name="folder-open" size={22} color="#6b7280" />
            </View>
            <Text style={styles.rowTitle}>Storage Path</Text>
          </View>
          <View style={styles.rowRight}>
            <Text style={styles.pathText}>/Internal/Status</Text>
            <Icon name="chevron-right" size={24} color="#9ca3af" />
          </View>
        </TouchableOpacity>

        {/* SUPPORT */}
        <Section title="Support" />

        <SettingsLink icon="star" label="Rate Us" />
        <Divider />
        <SettingsLink icon="share" label="Share App" />
        <Divider />
        <SettingsLink icon="verified-user" label="Privacy Policy" />

        {/* FOOTER */}
        <View style={styles.footer}>
          <Text style={styles.version}>Status Saver v2.4.0</Text>
          <Text style={styles.made}>Made with ❤️ for Indian Users</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

/* ---------------- COMPONENTS ---------------- */

function Section({title}) {
  return <Text style={styles.section}>{title}</Text>;
}

function Divider() {
  return <View style={styles.divider} />;
}

function SettingsLink({icon, label}) {
  return (
    <TouchableOpacity style={styles.row}>
      <View style={styles.rowLeft}>
        <View style={styles.iconBox}>
          <Icon name={icon} size={22} color="#6b7280" />
        </View>
        <Text style={styles.rowTitle}>{label}</Text>
      </View>
      <Icon name="chevron-right" size={24} color="#9ca3af" />
    </TouchableOpacity>
  );
}

/* ---------------- STYLES ---------------- */

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: '#ffffff',
  },

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderColor: '#e5e7eb',
    justifyContent: 'space-between',
  },

  headerTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#111813',
  },

  container: {
    paddingBottom: 40,
  },

  section: {
    fontSize: 12,
    fontWeight: '700',
    color: '#6b7280',
    letterSpacing: 1.5,
    marginTop: 24,
    marginBottom: 8,
    paddingHorizontal: 16,
    textTransform: 'uppercase',
  },

  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 14,
    justifyContent: 'space-between',
    backgroundColor: '#ffffff',
  },

  rowLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    flex: 1,
  },

  rowRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },

  rowTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#111813',
  },

  rowSub: {
    fontSize: 13,
    color: '#6b7280',
    marginTop: 2,
  },

  iconBox: {
    width: 40,
    height: 40,
    borderRadius: 10,
    backgroundColor: '#f6f8f6',
    alignItems: 'center',
    justifyContent: 'center',
  },

  proIcon: {
    backgroundColor: 'rgba(19,236,91,0.15)',
  },

  divider: {
    height: 1,
    backgroundColor: '#e5e7eb',
    marginHorizontal: 16,
  },

  pathText: {
    fontSize: 13,
    color: '#9ca3af',
  },

  footer: {
    alignItems: 'center',
    marginTop: 40,
    gap: 6,
  },

  version: {
    fontSize: 11,
    color: '#9ca3af',
    fontWeight: '600',
    letterSpacing: 1,
    textTransform: 'uppercase',
  },

  made: {
    fontSize: 12,
    color: '#9ca3af',
  },
});
