import React, { useState, useMemo } from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { colors } from '../theme';
import { SafeTop } from '../Header';
import { H1, Muted, Chip, Card, StatusBadge, EmptyState } from '../components';
import { SUBMISSIONS } from '../data';

const FILTERS = ['All', 'Submitted', 'Draft'];

export default function SubmissionsScreen({ navigation }) {
  const [filter, setFilter] = useState('All');

  const filtered = useMemo(() => {
    if (filter === 'All') return SUBMISSIONS;
    return SUBMISSIONS.filter((s) => s.status === filter.toLowerCase());
  }, [filter]);

  return (
    <View style={{ flex: 1, backgroundColor: colors.canvas }}>
      <SafeTop background="#fff" />
      <View style={styles.head}>
        <H1>Submissions</H1>
        <Muted style={{ marginTop: 4 }}>Field responses across all forms</Muted>
      </View>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={{ flexGrow: 0 }}
        contentContainerStyle={{ gap: 8, paddingHorizontal: 14, paddingVertical: 12 }}
      >
        {FILTERS.map((f) => (
          <Chip key={f} label={f} selected={filter === f} green={false} onPress={() => setFilter(f)} />
        ))}
      </ScrollView>

      <ScrollView contentContainerStyle={{ paddingHorizontal: 14, paddingBottom: 30 }}>
        {filtered.length === 0 ? (
          <EmptyState
            icon="file-tray"
            title="No submissions"
            subtitle="Nothing matches this filter yet."
          />
        ) : (
          filtered.map((s) => (
            <Card
              key={s.id}
              pad
              onPress={() => navigation.navigate('SubmissionDetail', { submission: s })}
              style={{ marginBottom: 12 }}
            >
              <View style={{ flexDirection: 'row', alignItems: 'flex-start' }}>
                <View style={{ flex: 1, marginRight: 10 }}>
                  <Text style={styles.formName} numberOfLines={1}>{s.form}</Text>
                  <Muted numberOfLines={1} style={{ marginTop: 2 }}>{s.program}</Muted>
                </View>
                <StatusBadge status={s.status} />
              </View>

              <View style={styles.metaRow}>
                <View style={styles.metaItem}>
                  <Ionicons name="person-outline" size={13} color={colors.textMuted} />
                  <Text style={styles.metaText} numberOfLines={1}>{s.by}</Text>
                </View>
                <View style={styles.metaItem}>
                  <Ionicons name="time-outline" size={13} color={colors.textMuted} />
                  <Text style={styles.metaText} numberOfLines={1}>{s.at}</Text>
                </View>
              </View>

              <View style={[styles.metaItem, { marginTop: 6 }]}>
                <Ionicons name="location-outline" size={13} color={colors.textMuted} />
                <Text style={styles.metaText} numberOfLines={1}>{s.location}</Text>
              </View>
            </Card>
          ))
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  head: {
    backgroundColor: '#fff',
    paddingHorizontal: 14,
    paddingTop: 8,
    paddingBottom: 14,
    borderBottomWidth: 1,
    borderBottomColor: colors.borderSubtle,
  },
  formName: { fontSize: 15, fontWeight: '700', color: colors.textHeading },
  metaRow: { flexDirection: 'row', marginTop: 12, gap: 16 },
  metaItem: { flexDirection: 'row', alignItems: 'center', gap: 5, flexShrink: 1 },
  metaText: { fontSize: 12, color: colors.textMuted, flexShrink: 1 },
});
