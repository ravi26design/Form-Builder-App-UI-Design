import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { colors, radius } from '../theme';
import { Card, SectionTitle, Muted, ProgressBar } from '../components';
import { StackHeader } from '../Header';

const METRICS = [
  { label: 'Total Responses', value: '1,284', icon: 'people', color: colors.brandBlue },
  { label: 'Completion', value: '87%', icon: 'checkmark-done-circle', color: colors.brandGreen },
  { label: 'Avg Time', value: '4.2m', icon: 'time', color: colors.purple },
  { label: 'This Week', value: '+156', icon: 'trending-up', color: colors.pending },
];

const BARS = [
  { d: 'Mon', h: 46 },
  { d: 'Tue', h: 72 },
  { d: 'Wed', h: 58 },
  { d: 'Thu', h: 90 },
  { d: 'Fri', h: 66 },
  { d: 'Sat', h: 38 },
  { d: 'Sun', h: 54 },
];

const INDICATORS = [
  { label: 'Water Quality Index', pct: 88 },
  { label: 'Rainfall Measurement', pct: 74 },
  { label: 'Soil Moisture', pct: 61 },
  { label: 'Community Participation', pct: 47 },
];

const REGIONS = [
  { label: 'North Zone', pct: 82 },
  { label: 'South Zone', pct: 64 },
  { label: 'East Zone', pct: 71 },
  { label: 'West Zone', pct: 48 },
  { label: 'Central Zone', pct: 35 },
];

export default function AnalyticsScreen({ navigation, route }) {
  const form = route.params?.form;
  const title = form?.n || 'Analytics';

  const maxBar = Math.max(...BARS.map((b) => b.h));

  return (
    <View style={{ flex: 1, backgroundColor: colors.canvas }}>
      <StackHeader title={title} subtitle="Form performance" navigation={navigation} />

      <ScrollView contentContainerStyle={{ padding: 14, paddingBottom: 30 }}>
        {/* Metric grid */}
        <View style={styles.grid}>
          {METRICS.map((m) => (
            <Card key={m.label} pad style={styles.metricCard}>
              <View style={[styles.metricIcon, { backgroundColor: colors.blueTint }]}>
                <Ionicons name={m.icon} size={18} color={m.color} />
              </View>
              <Text style={[styles.metricValue, { color: colors.metricValue }]}>{m.value}</Text>
              <Muted style={{ fontSize: 12 }} numberOfLines={1}>{m.label}</Muted>
            </Card>
          ))}
        </View>

        {/* Responses over time */}
        <Card pad style={{ marginTop: 14 }}>
          <SectionTitle style={{ marginBottom: 4 }}>Responses over time</SectionTitle>
          <Muted style={{ marginBottom: 16 }}>Last 7 days</Muted>
          <View style={styles.chart}>
            {BARS.map((b) => (
              <View key={b.d} style={styles.barCol}>
                <View style={styles.barTrack}>
                  <View
                    style={[
                      styles.barFill,
                      { height: `${Math.round((b.h / maxBar) * 100)}%` },
                    ]}
                  />
                </View>
                <Text style={styles.barLabel}>{b.d}</Text>
              </View>
            ))}
          </View>
        </Card>

        {/* Top indicators */}
        <Card pad style={{ marginTop: 14 }}>
          <SectionTitle style={{ marginBottom: 14 }}>Top Indicators</SectionTitle>
          {INDICATORS.map((ind, i) => (
            <View key={ind.label} style={{ marginBottom: i === INDICATORS.length - 1 ? 0 : 16 }}>
              <View style={styles.rowBetween}>
                <Text style={styles.rowLabel} numberOfLines={1}>{ind.label}</Text>
                <Text style={styles.rowPct}>{ind.pct}%</Text>
              </View>
              <View style={{ marginTop: 8 }}>
                <ProgressBar pct={ind.pct} />
              </View>
            </View>
          ))}
        </Card>

        {/* Responses by region */}
        <Card pad style={{ marginTop: 14 }}>
          <SectionTitle style={{ marginBottom: 14 }}>Responses by region</SectionTitle>
          {REGIONS.map((r, i) => (
            <View key={r.label} style={{ marginBottom: i === REGIONS.length - 1 ? 0 : 14 }}>
              <View style={styles.rowBetween}>
                <Text style={styles.rowLabel} numberOfLines={1}>{r.label}</Text>
                <Text style={styles.rowPct}>{r.pct}%</Text>
              </View>
              <View style={styles.regionTrack}>
                <View style={[styles.regionFill, { width: `${r.pct}%` }]} />
              </View>
            </View>
          ))}
        </Card>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  grid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' },
  metricCard: { width: '48.5%', marginBottom: 12, paddingVertical: 16 },
  metricIcon: {
    width: 36, height: 36, borderRadius: radius.chip,
    alignItems: 'center', justifyContent: 'center', marginBottom: 12,
  },
  metricValue: { fontSize: 24, fontWeight: '700' },

  chart: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    height: 150,
  },
  barCol: { flex: 1, alignItems: 'center' },
  barTrack: { width: 20, height: 120, justifyContent: 'flex-end' },
  barFill: { width: '100%', backgroundColor: colors.brandBlue, borderRadius: 6 },
  barLabel: { fontSize: 11, color: colors.textMuted, marginTop: 8 },

  rowBetween: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  rowLabel: { fontSize: 14, color: colors.textStrong, fontWeight: '600', flex: 1, paddingRight: 10 },
  rowPct: { fontSize: 13, fontWeight: '700', color: colors.metricValue },

  regionTrack: {
    height: 10, backgroundColor: '#E6ECF6', borderRadius: 9, overflow: 'hidden', marginTop: 8,
  },
  regionFill: { height: '100%', backgroundColor: colors.brandGreen, borderRadius: 9 },
});
