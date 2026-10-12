import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';

import { colors } from '../theme';
import { StackHeader } from '../Header';
import { Card, StatusBadge, InfoRow, IconPill, Btn } from '../components';
import { SUBMISSIONS, SUBMISSION_DETAIL_FIELDS } from '../data';

export default function SubmissionDetailScreen({ navigation, route }) {
  const sub = route.params?.submission || SUBMISSIONS[0];

  return (
    <View style={{ flex: 1, backgroundColor: colors.canvas }}>
      <StackHeader
        title={sub.form}
        subtitle={sub.program}
        navigation={navigation}
        right={<IconPill icon="share-outline" />}
      />

      <ScrollView contentContainerStyle={{ padding: 14, paddingBottom: 40 }}>
        <Card pad>
          <StatusBadge status={sub.status} />
          <View style={{ marginTop: 8 }}>
            <InfoRow label="Submitted by" value={sub.by} icon="person" />
            <InfoRow label="Submitted at" value={sub.at} icon="time" />
            <InfoRow label="Location" value={sub.location} icon="location" />
            <InfoRow label="GPS" value={sub.gps} icon="navigate" />
          </View>
        </Card>

        {SUBMISSION_DETAIL_FIELDS.map((sec) => (
          <View key={sec.section}>
            <Text style={styles.secLabel}>{sec.section}</Text>
            <Card pad style={{ marginTop: 10 }}>
              {sec.rows.map((row, i) => (
                <View
                  key={row.label}
                  style={[styles.row, i === sec.rows.length - 1 && styles.rowLast]}
                >
                  <Text style={styles.rowLabel}>{row.label}</Text>
                  <Text style={styles.rowValue}>{row.value}</Text>
                </View>
              ))}
            </Card>
          </View>
        ))}

        <View style={styles.actions}>
          <Btn title="Export PDF" variant="outline" icon="download-outline" full />
          <Btn title="Edit Response" variant="primary" icon="create-outline" full />
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  secLabel: {
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 0.5,
    color: colors.brandBlue,
    textTransform: 'uppercase',
    marginTop: 20,
  },
  row: {
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: colors.borderSubtle,
  },
  rowLast: { borderBottomWidth: 0 },
  rowLabel: { fontSize: 13, color: colors.textMuted, lineHeight: 19 },
  rowValue: { fontSize: 15, fontWeight: '700', color: colors.textHeading, marginTop: 4 },
  actions: { flexDirection: 'row', gap: 10, marginTop: 24 },
});
