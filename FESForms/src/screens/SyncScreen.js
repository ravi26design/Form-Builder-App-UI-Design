import React, { useState } from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { colors, radius } from '../theme';
import { Card, H1, Muted, Btn, StatusBadge, Toggle } from '../components';
import { SafeTop } from '../Header';

const PENDING_ITEMS = [
  { id: 'p1', name: 'Watershed Assessment Survey', date: '2026-07-22' },
  { id: 'p2', name: 'Agricultural Practice Assessment', date: '2026-07-21' },
  { id: 'p3', name: 'Soil Erosion Log', date: '2026-07-20' },
];

export default function SyncScreen() {
  const [synced, setSynced] = useState(false);
  const [autoSync, setAutoSync] = useState(true);

  const pendingCount = synced ? 0 : PENDING_ITEMS.length;

  return (
    <View style={{ flex: 1, backgroundColor: colors.canvas }}>
      <SafeTop background="#fff" />

      <View style={styles.header}>
        <H1>Offline Sync</H1>
        <Muted style={{ marginTop: 4 }}>Manage pending uploads</Muted>
      </View>

      <ScrollView contentContainerStyle={{ padding: 14, paddingBottom: 30 }}>
        {/* Summary */}
        <Card pad style={styles.summary}>
          <View style={styles.summaryIcon}>
            <Ionicons name="cloud-upload" size={26} color={colors.brandBlue} />
          </View>
          <View style={{ flex: 1 }}>
            <Text style={styles.summaryNumber}>{pendingCount}</Text>
            <Muted>items waiting to sync</Muted>
          </View>
        </Card>

        {/* Auto-sync toggle */}
        <Card pad style={[styles.toggleRow, { marginTop: 14 }]}>
          <View style={{ flexDirection: 'row', alignItems: 'center', flex: 1 }}>
            <Ionicons name="wifi" size={19} color={colors.brandBlue} style={{ marginRight: 10 }} />
            <Text style={styles.toggleLabel}>Auto-sync on Wi-Fi</Text>
          </View>
          <Toggle on={autoSync} onPress={() => setAutoSync((v) => !v)} />
        </Card>

        {/* Pending list */}
        <Text style={styles.listHead}>Pending Submissions</Text>
        {PENDING_ITEMS.map((item) => (
          <Card key={item.id} pad style={{ marginBottom: 12 }}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <View style={{ flex: 1, paddingRight: 10 }}>
                <Text style={styles.itemName}>{item.name}</Text>
                <Muted style={{ marginTop: 3, fontSize: 12 }}>Saved offline · {item.date}</Muted>
              </View>
              <StatusBadge status={synced ? 'submitted' : 'pending'} />
            </View>
            <View style={{ marginTop: 12, alignSelf: 'flex-start' }}>
              <Btn
                title={synced ? 'Synced' : 'Sync now'}
                variant="outline"
                size="sm"
                icon={synced ? 'checkmark' : 'cloud-upload-outline'}
                disabled={synced}
              />
            </View>
          </Card>
        ))}

        {/* Success note */}
        {synced ? (
          <View style={styles.successNote}>
            <Ionicons name="checkmark-circle" size={18} color={colors.brandGreen} style={{ marginRight: 8 }} />
            <Text style={styles.successText}>All submissions synced successfully.</Text>
          </View>
        ) : null}

        {/* Sync all */}
        <View style={{ marginTop: 12 }}>
          <Btn
            title={synced ? 'All Synced' : `Sync All (${PENDING_ITEMS.length})`}
            variant="green"
            icon="cloud-upload"
            full
            disabled={synced}
            onPress={() => setSynced(true)}
          />
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#fff',
    paddingHorizontal: 14,
    paddingTop: 6,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.borderSubtle,
  },

  summary: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.blueTint,
    borderColor: colors.blueTint,
  },
  summaryIcon: {
    width: 52,
    height: 52,
    borderRadius: radius.container,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 14,
  },
  summaryNumber: { fontSize: 30, fontWeight: '700', color: colors.brandBlue },

  toggleRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  toggleLabel: { fontSize: 15, fontWeight: '600', color: colors.textHeading },

  listHead: { fontSize: 16, fontWeight: '700', color: colors.textHeading, marginTop: 20, marginBottom: 12 },
  itemName: { fontSize: 15, fontWeight: '700', color: colors.textHeading },

  successNote: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.successTint,
    borderRadius: radius.control,
    padding: 12,
    marginTop: 4,
  },
  successText: { color: colors.brandGreen, fontWeight: '700', fontSize: 13 },
});
