import React, { useState } from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { colors, radius, categoryMeta } from '../theme';
import { Card, Muted, Btn, Input, EmptyState } from '../components';
import { StackHeader } from '../Header';
import { TEMPLATES } from '../data';

export default function TemplatesScreen({ navigation }) {
  const [query, setQuery] = useState('');

  const filtered = TEMPLATES.filter((t) =>
    t.name.toLowerCase().includes(query.trim().toLowerCase())
  );

  return (
    <View style={{ flex: 1, backgroundColor: colors.canvas }}>
      <StackHeader
        title="Templates"
        navigation={navigation}
        right={
          <Btn
            title="New"
            size="sm"
            icon="add"
            onPress={() => navigation.navigate('Builder', { mode: 'new' })}
          />
        }
      />

      <ScrollView contentContainerStyle={{ padding: 14, paddingBottom: 30 }}>
        <Input
          value={query}
          onChangeText={setQuery}
          placeholder="Search templates"
          icon="search"
          style={{ marginBottom: 14 }}
        />

        {filtered.length === 0 ? (
          <EmptyState
            icon="documents-outline"
            title="No templates found"
            subtitle="Try a different search term."
          />
        ) : (
          filtered.map((t) => {
            const cat = categoryMeta[t.cat] || categoryMeta.water;
            return (
              <Card key={t.id} pad style={{ marginBottom: 12 }}>
                <View style={styles.topRow}>
                  <View style={[styles.catIcon, { backgroundColor: cat.color + '1A' }]}>
                    <Ionicons name={cat.icon} size={20} color={cat.color} />
                  </View>
                  <View style={{ flex: 1, marginLeft: 12 }}>
                    <Text style={styles.name}>{t.name}</Text>
                    <Muted style={{ marginTop: 4 }} numberOfLines={2}>{t.desc}</Muted>
                  </View>
                </View>

                <View style={styles.footer}>
                  <Muted style={{ fontSize: 12 }}>
                    {t.fields} fields · used {t.uses} times
                  </Muted>
                  <Btn
                    title="Use Template"
                    size="sm"
                    variant="outline"
                    onPress={() => navigation.navigate('Builder', { mode: 'new' })}
                  />
                </View>
              </Card>
            );
          })
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  topRow: { flexDirection: 'row', alignItems: 'flex-start' },
  catIcon: {
    width: 44, height: 44, borderRadius: radius.chip,
    alignItems: 'center', justifyContent: 'center',
  },
  name: { fontSize: 15, fontWeight: '700', color: colors.textHeading },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 14,
    paddingTop: 14,
    borderTopWidth: 1,
    borderTopColor: colors.borderSubtle,
  },
});
