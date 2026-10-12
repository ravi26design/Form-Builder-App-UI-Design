import React, { useMemo } from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { colors, radius, categoryMeta } from '../theme';
import { StackHeader } from '../Header';
import { Muted, SectionTitle, Card, StatTile, StatusBadge, Btn } from '../components';
import { useApp } from '../AppContext';
import { PROGRAMS } from '../data';

export default function ProgramDetailScreen({ navigation, route }) {
  const program = route.params?.program || PROGRAMS[0];
  const { forms } = useApp();
  const meta = categoryMeta[program.cat] || categoryMeta.water;

  const filteredForms = useMemo(() => {
    const match = forms.filter((f) => f.prog === program.name);
    return match.length ? match : forms.slice(0, 4);
  }, [forms, program.name]);

  const analyticsForm = filteredForms[0] || forms[0];

  return (
    <View style={{ flex: 1, backgroundColor: colors.canvas }}>
      <StackHeader title={program.name} subtitle={program.org} navigation={navigation} />

      <ScrollView contentContainerStyle={{ padding: 14, paddingBottom: 40 }}>
        <Card pad>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <View style={[styles.iconSquare, { backgroundColor: meta.color + '1A' }]}>
              <Ionicons name={meta.icon} size={24} color={meta.color} />
            </View>
            <Text style={[styles.catLabel, { color: meta.color, marginLeft: 12 }]}>{meta.label}</Text>
          </View>

          <Muted style={{ marginTop: 12 }}>{program.desc}</Muted>

          <View style={styles.statRow}>
            <StatTile value={program.forms} label="Forms" />
            <StatTile value={program.responses} label="Responses" color={colors.brandGreen} />
            <StatTile value={program.indicators} label="Indicators" color={colors.purple} />
          </View>
        </Card>

        <SectionTitle style={{ marginTop: 22, marginBottom: 12 }}>Forms in this program</SectionTitle>

        {filteredForms.map((f) => (
          <Card
            key={f.id}
            pad
            onPress={() => navigation.navigate('Preview', { form: f })}
            style={{ marginBottom: 10 }}
          >
            <View style={{ flexDirection: 'row', alignItems: 'flex-start' }}>
              <View style={{ flex: 1, marginRight: 10 }}>
                <Text style={styles.formName} numberOfLines={1}>{f.n}</Text>
                <Muted style={{ marginTop: 4 }}>{f.r} responses · {f.mod}</Muted>
              </View>
              <StatusBadge status={f.s} />
            </View>
          </Card>
        ))}

        <Btn
          title="View Analytics"
          variant="outline"
          icon="bar-chart-outline"
          full
          style={{ marginTop: 12 }}
          onPress={() => navigation.navigate('Analytics', { form: analyticsForm })}
        />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  iconSquare: {
    width: 50,
    height: 50,
    borderRadius: radius.control,
    alignItems: 'center',
    justifyContent: 'center',
  },
  catLabel: { fontSize: 15, fontWeight: '700', flex: 1 },
  statRow: {
    flexDirection: 'row',
    marginTop: 18,
    borderTopWidth: 1,
    borderTopColor: colors.borderSubtle,
    paddingTop: 16,
  },
  formName: { fontSize: 15, fontWeight: '700', color: colors.textHeading },
});
