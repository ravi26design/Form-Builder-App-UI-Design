import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { colors, radius } from '../theme';
import { Card, SectionTitle, Muted, Input } from '../components';
import { StackHeader } from '../Header';

const QUICK_ACTIONS = [
  { title: 'Contact Support', icon: 'chatbubble-ellipses-outline' },
  { title: 'User Guide', icon: 'book-outline' },
  { title: 'Report a Bug', icon: 'bug-outline' },
];

const FAQS = [
  {
    q: 'How do I create a form?',
    a: 'Tap the New button on the Forms screen to open the builder. Add fields from the palette, configure each one, then publish when ready.',
  },
  {
    q: 'How does offline sync work?',
    a: 'When Offline Mode is enabled, submissions are cached on your device and automatically synced to the server the next time you have a connection.',
  },
  {
    q: 'How do I add follow-up questions?',
    a: 'Open a field in the builder and enable conditional logic. Choose the trigger answer and the follow-up field will appear only when that condition is met.',
  },
  {
    q: 'How do I export responses?',
    a: 'From a form’s Analytics screen, or via the Google Sheets and Power BI integrations, you can export collected responses to spreadsheets or dashboards.',
  },
  {
    q: 'How do I invite team members?',
    a: 'Go to the Team screen and tap Invite. Enter the member’s email and assign a role — they will receive an invitation to join your organization.',
  },
];

export default function HelpScreen({ navigation }) {
  const [query, setQuery] = useState('');
  const [open, setOpen] = useState(null);

  return (
    <View style={{ flex: 1, backgroundColor: colors.canvas }}>
      <StackHeader title="Help & Support" navigation={navigation} />

      <ScrollView contentContainerStyle={{ padding: 14, paddingBottom: 30 }}>
        <Input
          value={query}
          onChangeText={setQuery}
          placeholder="Search help articles"
          icon="search"
          style={{ marginBottom: 16 }}
        />

        {/* Quick actions */}
        <SectionTitle style={{ marginBottom: 12 }}>Quick actions</SectionTitle>
        <View style={styles.quickRow}>
          {QUICK_ACTIONS.map((qa) => (
            <Card key={qa.title} pad onPress={() => {}} style={styles.quickCard}>
              <View style={styles.quickIcon}>
                <Ionicons name={qa.icon} size={20} color={colors.brandBlue} />
              </View>
              <Text style={styles.quickTitle} numberOfLines={2}>{qa.title}</Text>
            </Card>
          ))}
        </View>

        {/* FAQ */}
        <SectionTitle style={{ marginTop: 22, marginBottom: 12 }}>Frequently asked questions</SectionTitle>
        <Card>
          {FAQS.map((f, i) => {
            const isOpen = open === i;
            return (
              <View key={f.q}>
                <TouchableOpacity
                  activeOpacity={0.7}
                  onPress={() => setOpen(isOpen ? null : i)}
                  style={styles.faqHead}
                >
                  <Text style={styles.faqQ}>{f.q}</Text>
                  <Ionicons
                    name={isOpen ? 'chevron-up' : 'chevron-down'}
                    size={18}
                    color={colors.textMuted}
                  />
                </TouchableOpacity>
                {isOpen ? (
                  <View style={styles.faqBody}>
                    <Muted>{f.a}</Muted>
                  </View>
                ) : null}
                {i < FAQS.length - 1 ? <View style={styles.divider} /> : null}
              </View>
            );
          })}
        </Card>

        {/* Version / links */}
        <Card pad style={{ marginTop: 16, alignItems: 'center' }}>
          <View style={styles.appIcon}>
            <Ionicons name="leaf" size={22} color={colors.brandGreen} />
          </View>
          <Text style={styles.appName}>India Observatory Forms</Text>
          <Muted style={{ marginTop: 2 }}>Version v1.0.0</Muted>
          <View style={styles.linkRow}>
            <TouchableOpacity><Text style={styles.link}>Privacy Policy</Text></TouchableOpacity>
            <Text style={styles.linkSep}>·</Text>
            <TouchableOpacity><Text style={styles.link}>Terms of Service</Text></TouchableOpacity>
          </View>
        </Card>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  quickRow: { flexDirection: 'row', justifyContent: 'space-between', gap: 10 },
  quickCard: { flex: 1, alignItems: 'center', paddingVertical: 16 },
  quickIcon: {
    width: 40, height: 40, borderRadius: radius.chip,
    backgroundColor: colors.blueTint,
    alignItems: 'center', justifyContent: 'center', marginBottom: 10,
  },
  quickTitle: { fontSize: 12, fontWeight: '700', color: colors.textHeading, textAlign: 'center' },

  faqHead: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
  },
  faqQ: { fontSize: 14, fontWeight: '700', color: colors.textHeading, flex: 1, paddingRight: 10 },
  faqBody: { paddingHorizontal: 16, paddingBottom: 16, marginTop: -4 },
  divider: { height: 1, backgroundColor: colors.borderSubtle },

  appIcon: {
    width: 48, height: 48, borderRadius: 24,
    backgroundColor: colors.successTint,
    alignItems: 'center', justifyContent: 'center', marginBottom: 10,
  },
  appName: { fontSize: 15, fontWeight: '700', color: colors.textHeading },
  linkRow: { flexDirection: 'row', alignItems: 'center', marginTop: 12 },
  link: { fontSize: 13, fontWeight: '700', color: colors.brandBlue },
  linkSep: { color: colors.textMuted, marginHorizontal: 8 },
});
