import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { colors, radius, categoryMeta } from '../theme';
import { Card, SectionTitle, Muted, Btn } from '../components';
import { StackHeader } from '../Header';

export default function FormDetailScreen({ navigation, route }) {
  const form = route.params?.form;
  const cat = form?.cat && categoryMeta[form.cat] ? categoryMeta[form.cat] : null;
  const title = form?.n || 'Form Details';
  const subtitle = cat ? cat.label : 'Form';
  const isPending = form ? form.s !== 'active' : true;

  const details = [
    { label: 'Program', value: form?.prog || '—', icon: 'briefcase-outline' },
    { label: 'Category', value: cat ? cat.label : '—', icon: cat ? cat.icon : 'pricetag-outline' },
    { label: 'Total Fields', value: '15 questions', icon: 'list-outline' },
    { label: 'Version', value: form?.v || 'v1.0', icon: 'git-branch-outline' },
    { label: 'Created by', value: form?.by || '—', icon: 'person-outline' },
  ];

  const indicators = Array.isArray(form?.ind) ? form.ind : [];

  return (
    <View style={{ flex: 1, backgroundColor: colors.canvas }}>
      <StackHeader title={title} subtitle={subtitle} navigation={navigation} />

      <ScrollView contentContainerStyle={{ padding: 14, paddingBottom: 30 }}>
        {/* Status banner */}
        {isPending ? (
          <Card pad style={[styles.banner, { backgroundColor: colors.pendingTint }]}>
            <Text style={[styles.bannerTitle, { color: colors.pending }]}>⏱ Pending Submission</Text>
            <Text style={[styles.bannerSub, { color: colors.pending }]}>
              Due date: {form?.due || '2026-03-25'}
            </Text>
          </Card>
        ) : (
          <Card pad style={[styles.banner, { backgroundColor: colors.successTint }]}>
            <Text style={[styles.bannerTitle, { color: colors.brandGreen }]}>✔ Submitted</Text>
            <Text style={[styles.bannerSub, { color: colors.brandGreen }]}>
              This form has been submitted.
            </Text>
          </Card>
        )}

        {/* Form Details */}
        <Card pad style={{ marginTop: 14 }}>
          <SectionTitle style={{ marginBottom: 4 }}>Form Details</SectionTitle>
          {details.map((row, i) => (
            <View
              key={row.label}
              style={[styles.detailRow, i === details.length - 1 && { borderBottomWidth: 0 }]}
            >
              <View style={styles.detailLabel}>
                <Ionicons name={row.icon} size={15} color={colors.textMuted} style={{ marginRight: 8 }} />
                <Muted style={{ fontSize: 13 }}>{row.label}</Muted>
              </View>
              <Text style={styles.detailValue} numberOfLines={1}>
                {row.value}
              </Text>
            </View>
          ))}
        </Card>

        {/* Indicators */}
        <Card pad style={{ marginTop: 14 }}>
          <SectionTitle style={{ marginBottom: 10 }}>Indicators</SectionTitle>
          {indicators.length === 0 ? (
            <Muted>No indicators</Muted>
          ) : (
            indicators.map((ind, i) => (
              <View key={i} style={styles.indRow}>
                <View style={styles.indIcon}>
                  <Ionicons name="trending-up" size={15} color={colors.brandGreen} />
                </View>
                <Text style={styles.indText}>{ind}</Text>
              </View>
            ))
          )}
        </Card>

        {/* Bottom action */}
        <View style={{ marginTop: 20 }}>
          {isPending ? (
            <Btn
              title="Fill Form"
              icon="document-text"
              variant="primary"
              full
              onPress={() => navigation.navigate('FillForm', { form })}
            />
          ) : (
            <Btn
              title="View Response"
              icon="eye-outline"
              variant="outline"
              full
              onPress={() => navigation.navigate('Preview', { form })}
            />
          )}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  banner: { borderWidth: 0 },
  bannerTitle: { fontSize: 16, fontWeight: '700' },
  bannerSub: { fontSize: 13, fontWeight: '600', marginTop: 6 },

  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: colors.borderSubtle,
  },
  detailLabel: { flexDirection: 'row', alignItems: 'center', flex: 1, paddingRight: 10 },
  detailValue: { fontSize: 14, fontWeight: '700', color: colors.textHeading, flexShrink: 1, textAlign: 'right' },

  indRow: { flexDirection: 'row', alignItems: 'center', paddingVertical: 8 },
  indIcon: {
    width: 30,
    height: 30,
    borderRadius: radius.chip,
    backgroundColor: colors.successTint,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  indText: { fontSize: 14, color: colors.textStrong, flex: 1, fontWeight: '600' },
});
