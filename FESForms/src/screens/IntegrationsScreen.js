import React, { useState } from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { colors, radius } from '../theme';
import { Card, Muted, Badge, Btn } from '../components';
import { StackHeader } from '../Header';
import { INTEGRATIONS } from '../data';

export default function IntegrationsScreen({ navigation }) {
  const [items, setItems] = useState(INTEGRATIONS);

  const connect = (name) => {
    setItems((prev) =>
      prev.map((it) => (it.name === name ? { ...it, connected: true } : it))
    );
  };

  return (
    <View style={{ flex: 1, backgroundColor: colors.canvas }}>
      <StackHeader title="Integrations" navigation={navigation} />

      <ScrollView contentContainerStyle={{ padding: 14, paddingBottom: 30 }}>
        {items.map((it) => (
          <Card key={it.name} pad style={{ marginBottom: 12 }}>
            <View style={styles.row}>
              <View style={styles.iconBox}>
                <Ionicons name={it.icon} size={20} color={colors.brandBlue} />
              </View>

              <View style={{ flex: 1, marginLeft: 12 }}>
                <Text style={styles.name}>{it.name}</Text>
                <Muted style={{ fontSize: 12, marginTop: 2 }} numberOfLines={2}>{it.desc}</Muted>
              </View>
            </View>

            <View style={styles.actions}>
              {it.connected ? (
                <>
                  <Badge
                    label="Connected"
                    bg={colors.successTint}
                    fg={colors.brandGreen}
                    icon="checkmark-circle"
                  />
                  <Btn title="Manage" size="sm" variant="ghost" />
                </>
              ) : (
                <Btn title="Connect" size="sm" variant="primary" onPress={() => connect(it.name)} />
              )}
            </View>
          </Card>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row', alignItems: 'flex-start' },
  iconBox: {
    width: 44, height: 44, borderRadius: radius.chip,
    backgroundColor: colors.blueTint,
    alignItems: 'center', justifyContent: 'center',
  },
  name: { fontSize: 15, fontWeight: '700', color: colors.textHeading },
  actions: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    gap: 10,
    marginTop: 14,
  },
});
