import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { colors, radius } from '../theme';
import { FIELD_USER, ADMIN_USER } from '../data';
import { useApp } from '../AppContext';
import { GradientHeader } from '../Header';
import { Card, SectionTitle, Avatar, Badge, StatTile, Btn } from '../components';

export default function ProfileScreen({ navigation }) {
  const { isFieldUser, logout } = useApp();
  const user = isFieldUser ? FIELD_USER : ADMIN_USER;

  const stats = FIELD_USER.stats;
  const statTiles = [
    { value: stats.submitted, label: 'Forms Submitted', color: colors.brandBlue },
    { value: stats.pending, label: 'Pending Forms', color: colors.pending },
    { value: stats.responses, label: 'Total Responses', color: colors.brandGreen },
    { value: stats.programs, label: 'Programs', color: colors.purple },
  ];

  const settings = [
    { icon: 'settings-outline', label: 'Account Settings', onPress: () => navigation.navigate('Account') },
    isFieldUser && {
      icon: 'cloud-offline-outline',
      label: 'Offline Data',
      badge: '3 pending',
      onPress: () => navigation.navigate('Sync'),
    },
    { icon: 'notifications-outline', label: 'Notifications' },
    { icon: 'help-circle-outline', label: 'Help & Support', onPress: () => navigation.navigate('Help') },
  ].filter(Boolean);

  return (
    <View style={{ flex: 1, backgroundColor: colors.canvas }}>
      <GradientHeader>
        <View style={{ alignItems: 'center', paddingVertical: 6 }}>
          <Avatar initials={user.initials} size={76} style={styles.avatar} />
          <Text style={styles.name}>{user.name}</Text>
          <Text style={styles.role}>{user.role}</Text>
          {isFieldUser ? (
            <Badge
              label="📍 Karnataka District"
              bg="rgba(255,255,255,0.18)"
              fg="#fff"
              style={{ marginTop: 10 }}
            />
          ) : null}
        </View>
      </GradientHeader>

      <ScrollView contentContainerStyle={{ padding: 14, paddingBottom: 30 }}>
        {/* Statistics (field user only) */}
        {isFieldUser ? (
          <Card pad>
            <SectionTitle style={{ marginBottom: 14 }}>My Statistics</SectionTitle>
            <View style={styles.statWrap}>
              {statTiles.map((t) => (
                <View key={t.label} style={styles.statCell}>
                  <StatTile value={t.value} label={t.label} color={t.color} />
                </View>
              ))}
            </View>
          </Card>
        ) : null}

        {/* Settings list */}
        <Card style={{ marginTop: 14, overflow: 'hidden' }}>
          {settings.map((row, i) => (
            <TouchableOpacity
              key={row.label}
              activeOpacity={0.7}
              onPress={row.onPress}
              style={[styles.settingRow, i !== 0 && styles.settingDivider]}
            >
              <View style={styles.settingIcon}>
                <Ionicons name={row.icon} size={19} color={colors.brandBlue} />
              </View>
              <Text style={styles.settingLabel}>{row.label}</Text>
              {row.badge ? (
                <Badge label={row.badge} bg={colors.pendingTint} fg={colors.pending} style={{ marginRight: 8 }} />
              ) : null}
              <Ionicons name="chevron-forward" size={18} color={colors.textMuted} />
            </TouchableOpacity>
          ))}
        </Card>

        {/* Logout */}
        <View style={{ marginTop: 20 }}>
          <Btn title="Logout" icon="log-out-outline" variant="dangerGhost" full onPress={logout} />
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  avatar: { backgroundColor: 'rgba(255,255,255,0.2)', borderWidth: 2, borderColor: 'rgba(255,255,255,0.35)' },
  name: { color: '#fff', fontSize: 20, fontWeight: '700', marginTop: 12 },
  role: { color: '#D5E0FA', fontSize: 13, marginTop: 2 },

  statWrap: { flexDirection: 'row', flexWrap: 'wrap', rowGap: 18 },
  statCell: { width: '50%' },

  settingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    paddingHorizontal: 16,
  },
  settingDivider: { borderTopWidth: 1, borderTopColor: colors.borderSubtle },
  settingIcon: {
    width: 34,
    height: 34,
    borderRadius: radius.chip,
    backgroundColor: colors.blueTint,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  settingLabel: { flex: 1, fontSize: 15, fontWeight: '600', color: colors.textHeading },
});
