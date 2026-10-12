import React, { useState, useMemo } from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { colors, radius, categoryMeta } from '../theme';
import { SafeTop } from '../Header';
import { H1, Muted, Input, Card } from '../components';
import { PROGRAMS } from '../data';

export default function ProgramsScreen({ navigation }) {
  const [q, setQ] = useState('');

  const filtered = useMemo(() => {
    if (!q) return PROGRAMS;
    return PROGRAMS.filter((p) => p.name.toLowerCase().includes(q.toLowerCase()));
  }, [q]);

  return (
    <View style={{ flex: 1, backgroundColor: colors.canvas }}>
      <SafeTop background="#fff" />
      <View style={styles.head}>
        <H1>Programs</H1>
        <Muted style={{ marginTop: 4 }}>Conservation programs & their forms</Muted>
        <Input
          icon="search"
          placeholder="Search programs..."
          value={q}
          onChangeText={setQ}
          style={{ marginTop: 12, backgroundColor: '#fff' }}
        />
      </View>

      <ScrollView contentContainerStyle={{ padding: 14, paddingBottom: 30 }}>
        {filtered.map((p) => {
          const meta = categoryMeta[p.cat] || categoryMeta.water;
          return (
            <Card
              key={p.id}
              pad
              onPress={() => navigation.navigate('ProgramDetail', { program: p })}
              style={{ marginBottom: 12 }}
            >
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <View style={[styles.iconSquare, { backgroundColor: meta.color + '1A' }]}>
                  <Ionicons name={meta.icon} size={22} color={meta.color} />
                </View>
                <View style={{ flex: 1, marginLeft: 12 }}>
                  <Text style={styles.name} numberOfLines={1}>{p.name}</Text>
                  <Muted numberOfLines={1}>{p.org}</Muted>
                </View>
                <Ionicons name="chevron-forward" size={20} color={colors.metricMuted} />
              </View>

              <Muted numberOfLines={2} style={{ marginTop: 10 }}>{p.desc}</Muted>

              <View style={styles.footer}>
                <Text style={styles.metric}>
                  <Text style={styles.metricNum}>{p.forms}</Text> Forms
                </Text>
                <Text style={styles.sep}>·</Text>
                <Text style={styles.metric}>
                  <Text style={styles.metricNum}>{p.responses}</Text> Responses
                </Text>
                <Text style={styles.sep}>·</Text>
                <Text style={styles.metric}>
                  <Text style={styles.metricNum}>{p.indicators}</Text> Indicators
                </Text>
              </View>
            </Card>
          );
        })}
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
  iconSquare: {
    width: 46,
    height: 46,
    borderRadius: radius.control,
    alignItems: 'center',
    justifyContent: 'center',
  },
  name: { fontSize: 15, fontWeight: '700', color: colors.textHeading },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 12,
    flexWrap: 'wrap',
  },
  metric: { fontSize: 12, color: colors.textMuted },
  metricNum: { fontWeight: '700', color: colors.textHeading },
  sep: { fontSize: 12, color: colors.metricMuted, marginHorizontal: 8 },
});
