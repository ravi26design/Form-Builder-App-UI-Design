import React from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { colors } from '../theme';
import { FIELD_USER, ACTIVITY } from '../data';
import { useApp } from '../AppContext';
import { GradientHeader } from '../Header';
import { Card, Muted, StatusBadge } from '../components';

export default function HomeScreen({ navigation }) {
  const { forms } = useApp();
  const pending = FIELD_USER.stats.pending;
  const submitted = FIELD_USER.stats.submitted;

  return (
    <View style={{ flex: 1, backgroundColor: colors.canvas }}>
      <GradientHeader>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
          <View>
            <Text style={styles.hello}>Welcome back,</Text>
            <Text style={styles.name}>{FIELD_USER.name}</Text>
          </View>
          <View style={{ flexDirection: 'row', gap: 16 }}>
            <Ionicons name="notifications-outline" size={22} color="#fff" />
            <Ionicons name="menu" size={22} color="#fff" />
          </View>
        </View>
        <View style={{ flexDirection: 'row', gap: 12, marginTop: 16 }}>
          <View style={styles.miniStat}>
            <Text style={styles.miniLabel}>⏱ Pending</Text>
            <Text style={styles.miniValue}>{pending}</Text>
          </View>
          <View style={styles.miniStat}>
            <Text style={styles.miniLabel}>✔ Submitted</Text>
            <Text style={styles.miniValue}>{submitted}</Text>
          </View>
        </View>
      </GradientHeader>

      <ScrollView contentContainerStyle={{ padding: 14, paddingBottom: 30 }}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
          <Text style={styles.h}>Recent Activity</Text>
          <TouchableOpacity onPress={() => navigation.navigate('Forms')}>
            <Text style={styles.link}>View All</Text>
          </TouchableOpacity>
        </View>

        {ACTIVITY.map((a, i) => (
          <Card
            key={i}
            pad
            style={styles.actCard}
            onPress={() => navigation.navigate('FormDetail', { form: forms[i] })}
          >
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <View style={{ flex: 1, paddingRight: 10 }}>
                <Text style={styles.actTitle}>{a.title}</Text>
                <Muted style={{ marginTop: 2 }}>{a.program}</Muted>
                <Text style={[styles.actMeta, a.status === 'pending' && { color: colors.pending }]}>
                  {a.status === 'pending' ? '⏱ ' : '📅 '}
                  {a.meta}
                </Text>
              </View>
              <StatusBadge status={a.status} />
            </View>
          </Card>
        ))}

        {/* Quick actions */}
        <View style={{ flexDirection: 'row', gap: 12, marginTop: 4 }}>
          <Card pad style={styles.quick} onPress={() => navigation.navigate('Sync')}>
            <View style={[styles.quickIcon, { backgroundColor: colors.blueTint }]}>
              <Ionicons name="cloud-upload" size={20} color={colors.brandBlue} />
            </View>
            <Text style={styles.quickTitle}>Offline Sync</Text>
            <Muted style={{ fontSize: 12 }}>Upload pending data</Muted>
          </Card>
          <Card pad style={styles.quick}>
            <View style={[styles.quickIcon, { backgroundColor: colors.successTint }]}>
              <Ionicons name="location" size={20} color={colors.brandGreen} />
            </View>
            <Text style={styles.quickTitle}>My Location</Text>
            <Muted style={{ fontSize: 12 }}>Check GPS status</Muted>
          </Card>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  hello: { color: '#D5E0FA', fontSize: 12 },
  name: { color: '#fff', fontSize: 20, fontWeight: '700' },
  miniStat: { flex: 1, backgroundColor: 'rgba(255,255,255,0.16)', borderRadius: 12, padding: 12 },
  miniLabel: { color: '#EAF0FF', fontSize: 12 },
  miniValue: { color: '#fff', fontSize: 26, fontWeight: '700', marginTop: 2 },

  h: { fontSize: 16, fontWeight: '700', color: colors.textHeading },
  link: { color: colors.brandBlue, fontWeight: '700', fontSize: 13 },

  actCard: { marginBottom: 12 },
  actTitle: { fontSize: 15, fontWeight: '700', color: colors.textHeading },
  actMeta: { fontSize: 12, color: colors.textMuted, marginTop: 8 },

  quick: { flex: 1, alignItems: 'flex-start' },
  quickIcon: { width: 40, height: 40, borderRadius: 11, alignItems: 'center', justifyContent: 'center', marginBottom: 10 },
  quickTitle: { fontSize: 14, fontWeight: '700', color: colors.textHeading },
});
