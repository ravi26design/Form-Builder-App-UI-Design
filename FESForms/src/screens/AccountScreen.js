import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { colors, radius } from '../theme';
import { Card, SectionTitle, Muted, Btn, Avatar, Input, Field, Toggle } from '../components';
import { StackHeader } from '../Header';
import { useApp } from '../AppContext';
import { ADMIN_USER } from '../data';

export default function AccountScreen({ navigation }) {
  const { logout } = useApp();

  const [fullName, setFullName] = useState('Jay');
  const [email, setEmail] = useState('jay@indiaobs.org');
  const [phone, setPhone] = useState('+91 98765 43210');

  const [emailNotif, setEmailNotif] = useState(true);
  const [pushNotif, setPushNotif] = useState(true);
  const [offlineMode, setOfflineMode] = useState(false);

  const prefs = [
    { title: 'Email Notifications', desc: 'Receive updates via email', on: emailNotif, set: setEmailNotif },
    { title: 'Push Notifications', desc: 'Alerts on your device', on: pushNotif, set: setPushNotif },
    { title: 'Offline Mode', desc: 'Cache data for field use', on: offlineMode, set: setOfflineMode },
  ];

  const security = [
    { title: 'Change Password', icon: 'lock-closed-outline' },
    { title: 'Two-Factor Authentication', icon: 'shield-checkmark-outline' },
  ];

  return (
    <View style={{ flex: 1, backgroundColor: colors.canvas }}>
      <StackHeader title="Account Settings" navigation={navigation} />

      <ScrollView contentContainerStyle={{ padding: 14, paddingBottom: 30 }}>
        {/* Profile */}
        <Card pad style={{ alignItems: 'center' }}>
          <Avatar initials={ADMIN_USER.initials} size={64} />
          <Text style={styles.name}>{ADMIN_USER.name}</Text>
          <Muted style={{ marginTop: 2 }}>{ADMIN_USER.role}</Muted>
          <Btn
            title="Change Photo"
            size="sm"
            variant="outline"
            icon="camera-outline"
            style={{ marginTop: 14 }}
          />
        </Card>

        {/* Profile fields */}
        <Card pad style={{ marginTop: 14 }}>
          <SectionTitle style={{ marginBottom: 14 }}>Profile</SectionTitle>
          <Field label="Full Name">
            <Input value={fullName} onChangeText={setFullName} icon="person-outline" />
          </Field>
          <Field label="Email">
            <Input value={email} onChangeText={setEmail} icon="mail-outline" keyboardType="email-address" />
          </Field>
          <Field label="Phone">
            <Input value={phone} onChangeText={setPhone} icon="call-outline" keyboardType="phone-pad" />
          </Field>
          <Field label="Organization" style={{ marginBottom: 0 }}>
            <Input value="India Observatory" icon="business-outline" editable={false} />
          </Field>
        </Card>

        {/* Preferences */}
        <Card pad style={{ marginTop: 14 }}>
          <SectionTitle style={{ marginBottom: 6 }}>Preferences</SectionTitle>
          {prefs.map((p, i) => (
            <View
              key={p.title}
              style={[styles.prefRow, i === prefs.length - 1 && { borderBottomWidth: 0 }]}
            >
              <View style={{ flex: 1, paddingRight: 12 }}>
                <Text style={styles.prefTitle}>{p.title}</Text>
                <Muted style={{ fontSize: 12, marginTop: 2 }}>{p.desc}</Muted>
              </View>
              <Toggle on={p.on} onPress={() => p.set((v) => !v)} />
            </View>
          ))}
        </Card>

        {/* Security */}
        <Card pad style={{ marginTop: 14 }}>
          <SectionTitle style={{ marginBottom: 6 }}>Security</SectionTitle>
          {security.map((row, i) => (
            <TouchableOpacity
              key={row.title}
              activeOpacity={0.7}
              style={[styles.secRow, i === security.length - 1 && { borderBottomWidth: 0 }]}
            >
              <View style={styles.secLeft}>
                <Ionicons name={row.icon} size={18} color={colors.brandBlue} style={{ marginRight: 12 }} />
                <Text style={styles.prefTitle}>{row.title}</Text>
              </View>
              <Ionicons name="chevron-forward" size={18} color={colors.textMuted} />
            </TouchableOpacity>
          ))}
        </Card>

        {/* Actions */}
        <View style={{ marginTop: 20 }}>
          <Btn title="Save Changes" variant="primary" icon="save-outline" full />
          <Btn
            title="Log Out"
            variant="dangerGhost"
            icon="log-out-outline"
            full
            style={{ marginTop: 12 }}
            onPress={() => logout()}
          />
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  name: { fontSize: 18, fontWeight: '700', color: colors.textHeading, marginTop: 12 },

  prefRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: colors.borderSubtle,
  },
  prefTitle: { fontSize: 14, fontWeight: '700', color: colors.textHeading },

  secRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: colors.borderSubtle,
  },
  secLeft: { flexDirection: 'row', alignItems: 'center', flex: 1 },
});
