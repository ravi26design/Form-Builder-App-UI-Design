import React, { useState, useMemo } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { colors, radius, shadow } from '../theme';
import { DASH_STATS, ADMIN_USER } from '../data';
import { useApp } from '../AppContext';
import { GradientHeader } from '../Header';
import { Card, Muted, SectionTitle, Chip, Input, Btn, Avatar } from '../components';
import FormCard from '../FormCard';

const TABS = ['All', 'Active', 'Draft'];

export default function DashboardScreen({ navigation }) {
  const { forms, toggleStar } = useApp();
  const [tab, setTab] = useState('All');
  const [q, setQ] = useState('');

  const filtered = useMemo(() => {
    const list = forms.filter((f) => {
      const okTab = tab === 'All' || f.s === tab.toLowerCase();
      const okQ = !q || f.n.toLowerCase().includes(q.toLowerCase());
      return okTab && okQ;
    });
    // starred float to top
    return [...list].sort((a, b) => (b.star || 0) - (a.star || 0));
  }, [forms, tab, q]);

  return (
    <View style={{ flex: 1, backgroundColor: colors.canvas }}>
      <GradientHeader>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
          <View>
            <Text style={styles.hello}>Welcome back,</Text>
            <Text style={styles.name}>Arun 👋</Text>
          </View>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 14 }}>
            <Ionicons name="notifications-outline" size={22} color="#fff" />
            <Avatar initials={ADMIN_USER.initials} size={38} style={{ backgroundColor: 'rgba(255,255,255,0.2)' }} />
          </View>
        </View>
        <Muted style={{ color: '#D5E0FA', marginTop: 4 }}>Here's what's happening with your data collection.</Muted>
      </GradientHeader>

      <ScrollView contentContainerStyle={{ padding: 14, paddingBottom: 30 }}>
        {/* Stat cards */}
        <View style={styles.statGrid}>
          {DASH_STATS.map((st) => (
            <Card key={st.label} pad style={styles.statCard}>
              <View style={styles.statIcon}>
                <Ionicons name={st.icon} size={22} color={colors.brandBlue} />
              </View>
              <Text style={styles.statValue}>{st.value}</Text>
              <Muted style={{ fontSize: 12 }}>{st.label}</Muted>
              <Text style={[styles.statDelta, { color: st.up ? colors.brandGreen : colors.error }]}>{st.delta}</Text>
            </Card>
          ))}
        </View>

        {/* Forms toolbar */}
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 6, marginBottom: 12 }}>
          <SectionTitle>Your Forms</SectionTitle>
          <Btn title="Add Form" icon="add" size="sm" onPress={() => navigation.navigate('Builder', { mode: 'new' })} />
        </View>

        <Input icon="search" placeholder="Search forms..." value={q} onChangeText={setQ} style={{ marginBottom: 12, backgroundColor: '#fff' }} />

        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ gap: 8, marginBottom: 14 }}>
          {TABS.map((t) => (
            <Chip key={t} label={t} selected={tab === t} green onPress={() => setTab(t)} />
          ))}
        </ScrollView>

        {filtered.length === 0 ? (
          <Card pad style={{ alignItems: 'center', paddingVertical: 40 }}>
            <Ionicons name="search" size={32} color={colors.metricMuted} />
            <SectionTitle style={{ marginTop: 12 }}>No forms found</SectionTitle>
            <Muted style={{ marginTop: 6 }}>Try a different search or filter.</Muted>
          </Card>
        ) : (
          filtered.map((f) => (
            <FormCard
              key={f.id}
              form={f}
              isFieldUser={false}
              onStar={() => toggleStar(f.id)}
              onOpen={() => navigation.navigate('Preview', { form: f })}
              onView={() => navigation.navigate('Preview', { form: f })}
              onEdit={() => navigation.navigate('Builder', { mode: 'edit', form: f })}
              onAnalytics={() => navigation.navigate('Analytics', { form: f })}
            />
          ))
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  hello: { color: '#D5E0FA', fontSize: 13 },
  name: { color: '#fff', fontSize: 22, fontWeight: '700' },

  statGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 12, marginBottom: 4 },
  statCard: { width: '47%', flexGrow: 1, paddingVertical: 16 },
  statIcon: {
    width: 42, height: 42, borderRadius: 12, backgroundColor: colors.blueTint,
    alignItems: 'center', justifyContent: 'center', marginBottom: 10,
  },
  statValue: { fontSize: 26, fontWeight: '700', color: colors.metricValue },
  statDelta: { fontSize: 11, fontWeight: '600', marginTop: 6 },
});
