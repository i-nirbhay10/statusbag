import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Switch,
  ScrollView,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Header from '../components/Header';
import colors from '../theme/colors';

export default function SettingsScreen({navigation}) {
  const [autoSave, setAutoSave] = useState(true);
  const [notifications, setNotifications] = useState(true);

  return (
    <View style={styles.safe}>
      <Header 
        title="App Settings"
        leftIcon="arrow-back-ios"
        onLeftPress={() => navigation.goBack()}
        rightIcon="search"
      />

      <ScrollView contentContainerStyle={styles.container}>
        {/* ACCOUNT */}
        <Section title="Account" />

        <TouchableOpacity
          style={styles.row}
          onPress={() => navigation.navigate('Pricing')}>
          <View style={styles.rowLeft}>
            <View style={[styles.iconBox, styles.proIcon]}>
              <Icon name="workspace-premium" size={22} color={colors.primary} />
            </View>
            <View>
              <Text style={styles.rowTitle}>Upgrade to Pro</Text>
              <Text style={styles.rowSub}>
                Remove ads and support development
              </Text>
            </View>
          </View>
          <Icon name="chevron-right" size={24} color={colors.grayMedium} />
        </TouchableOpacity>

        <Divider />

        {/* GENERAL */}
        <Section title="General" />

        <View style={styles.row}>
          <View style={styles.rowLeft}>
            <View style={styles.iconBox}>
              <Icon name="download-done" size={22} color={colors.grayDark} />
            </View>
            <Text style={styles.rowTitle}>Auto-save Statuses</Text>
          </View>
          <Switch
            value={autoSave}
            onValueChange={setAutoSave}
            trackColor={{false: colors.grayLight, true: colors.primary}}
            thumbColor={colors.white}
          />
        </View>

        <Divider />

        <View style={styles.row}>
          <View style={styles.rowLeft}>
            <View style={styles.iconBox}>
              <Icon name="notifications-active" size={22} color={colors.grayDark} />
            </View>
            <Text style={styles.rowTitle}>Push Notifications</Text>
          </View>
          <Switch
            value={notifications}
            onValueChange={setNotifications}
            trackColor={{false: colors.grayLight, true: colors.primary}}
            thumbColor={colors.white}
          />
        </View>

        <Divider />

        <TouchableOpacity style={styles.row}>
          <View style={styles.rowLeft}>
            <View style={styles.iconBox}>
              <Icon name="folder-open" size={22} color={colors.grayDark} />
            </View>
            <Text style={styles.rowTitle}>Storage Path</Text>
          </View>
          <View style={styles.rowRight}>
            <Text style={styles.pathText}>/Internal/Status</Text>
            <Icon name="chevron-right" size={24} color={colors.grayMedium} />
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
          <Text style={styles.version}>StatusBag v2.4.0</Text>
          <Text style={styles.made}>Made with ❤️ for Indian Users</Text>
        </View>
      </ScrollView>
    </View>
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
          <Icon name={icon} size={22} color={colors.grayDark} />
        </View>
        <Text style={styles.rowTitle}>{label}</Text>
      </View>
      <Icon name="chevron-right" size={24} color={colors.grayMedium} />
    </TouchableOpacity>
  );
}

/* ---------------- STYLES ---------------- */

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: colors.backgroundLight,
  },

  container: {
    paddingBottom: 40,
  },

  section: {
    fontSize: 12,
    fontWeight: '700',
    color: colors.grayDark,
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
    backgroundColor: colors.white,
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
    color: colors.textLight,
  },

  rowSub: {
    fontSize: 13,
    color: colors.grayDark,
    marginTop: 2,
  },

  iconBox: {
    width: 40,
    height: 40,
    borderRadius: 10,
    backgroundColor: colors.backgroundLight,
    alignItems: 'center',
    justifyContent: 'center',
  },

  proIcon: {
    backgroundColor: colors.primaryLight,
  },

  divider: {
    height: 1,
    backgroundColor: colors.grayLight,
    marginHorizontal: 16,
  },

  pathText: {
    fontSize: 13,
    color: colors.grayMedium,
  },

  footer: {
    alignItems: 'center',
    marginTop: 40,
    gap: 6,
  },

  version: {
    fontSize: 11,
    color: colors.grayMedium,
    fontWeight: '600',
    letterSpacing: 1,
    textTransform: 'uppercase',
  },

  made: {
    fontSize: 12,
    color: colors.grayMedium,
  },
});
