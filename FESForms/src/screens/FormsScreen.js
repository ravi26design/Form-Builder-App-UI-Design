import React, { useState, useMemo } from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';

import { colors } from '../theme';
import { useApp } from '../AppContext';
import { SafeTop } from '../Header';
import { H1, Muted, Chip, Input, Btn, SectionTitle, Card } from '../components';
import { Ionicons } from '@expo/vector-icons';
import FormCard from '../FormCard';

export default function FormsScreen({ navigation }) {
  const { forms, toggleStar, isFieldUser } = useApp();
  const [q, setQ] = useState('');
  const [tab, setTab] = useState('All');

  const tabs = isFieldUser ? ['All', 'Pending', 'Submitted'] : ['All', 'Active', 'Draft', 'Archived'];

  const filtered = useMemo(() => {
    return forms
      .filter((f) => {
        if (!q) return true;
        return f.n.toLowerCase().includes(q.toLowerCase());
      })
      .filter((f) => {
        if (tab === 'All') return true;
        if (isFieldUser) {
          const st = f.s === 'active' ? 'Submitted' : 'Pending';
          return st === tab;
        }
        return f.s === tab.toLowerCase();
      })
      .sort((a, b) => (b.star || 0) - (a.star || 0));
  }, [forms, q, tab, isFieldUser]);

  const counts = useMemo(() => {
    const c = { All: forms.length };
    tabs.forEach((t) => {
      if (t === 'All') return;
      c[t] = forms.filter((f) => {
        if (isFieldUser) return (f.s === 'active' ? 'Submitted' : 'Pending') === t;
        return f.s === t.toLowerCase();
      }).length;
    });
    return c;
  }, [forms, isFieldUser]);

  return (
    <View style={{ flex: 1, backgroundColor: colors.canvas }}>
      <SafeTop background="#fff" />
      <View style={styles.head}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
          <H1>{isFieldUser ? 'My Forms' : 'Forms'}</H1>
          {!isFieldUser ? (
            <Btn title="New" icon="add" size="sm" onPress={() => navigation.navigate('Builder', { mode: 'new' })} />
          ) : null}
        </View>
        <Input icon="search" placeholder="Search forms..." value={q} onChangeText={setQ} style={{ marginTop: 12, backgroundColor: '#fff' }} />
      </View>

      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ flexGrow: 0 }} contentContainerStyle={{ gap: 8, paddingHorizontal: 14, paddingVertical: 12 }}>
        {tabs.map((t) => (
          <Chip key={t} label={`${t} (${counts[t] ?? 0})`} selected={tab === t} green={isFieldUser} onPress={() => setTab(t)} />
        ))}
      </ScrollView>

      <ScrollView contentContainerStyle={{ paddingHorizontal: 14, paddingBottom: 30 }}>
        {filtered.length === 0 ? (
          <Card pad style={{ alignItems: 'center', paddingVertical: 40, marginTop: 8 }}>
            <Ionicons name="file-tray" size={32} color={colors.metricMuted} />
            <SectionTitle style={{ marginTop: 12 }}>No forms found</SectionTitle>
            <Muted style={{ marginTop: 6 }}>Nothing matches your filters.</Muted>
          </Card>
        ) : (
          filtered.map((f) => (
            <FormCard
              key={f.id}
              form={f}
              isFieldUser={isFieldUser}
              onStar={() => toggleStar(f.id)}
              onOpen={() =>
                isFieldUser ? navigation.navigate('FormDetail', { form: f }) : navigation.navigate('Preview', { form: f })
              }
              onView={() => navigation.navigate('Preview', { form: f })}
              onEdit={() => navigation.navigate('Builder', { mode: 'edit', form: f })}
              onAnalytics={() => navigation.navigate('Analytics', { form: f })}
              onFill={() =>
                f.s === 'active'
                  ? navigation.navigate('FormDetail', { form: f })
                  : navigation.navigate('FillForm', { form: f })
              }
            />
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
});
