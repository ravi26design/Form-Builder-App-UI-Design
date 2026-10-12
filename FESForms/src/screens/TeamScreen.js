import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { colors } from '../theme';
import { Card, Muted, Badge, Btn, Avatar } from '../components';
import { StackHeader } from '../Header';
import { TEAM } from '../data';

function roleStyle(role) {
  if (role === 'Org Admin') return { bg: colors.blueTint, fg: colors.brandBlue };
  if (role === 'Field User') return { bg: colors.successTint, fg: colors.brandGreen };
  return { bg: colors.purpleTint, fg: colors.purple };
}

export default function TeamScreen({ navigation }) {
  return (
    <View style={{ flex: 1, backgroundColor: colors.canvas }}>
      <StackHeader
        title="Team"
        subtitle="Members & roles"
        navigation={navigation}
        right={<Btn title="Invite" size="sm" icon="person-add" />}
      />

      <ScrollView contentContainerStyle={{ padding: 14, paddingBottom: 30 }}>
        <Muted style={{ marginBottom: 12, fontWeight: '700' }}>{TEAM.length} members</Muted>

        {TEAM.map((m) => {
          const rs = roleStyle(m.role);
          return (
            <Card key={m.email} pad style={{ marginBottom: 12 }}>
              <View style={styles.row}>
                <View>
                  <Avatar initials={m.initials} size={48} />
                  {m.online ? <View style={styles.onlineDot} /> : null}
                </View>

                <View style={{ flex: 1, marginLeft: 12 }}>
                  <Text style={styles.name}>{m.name}</Text>
                  <Muted style={{ fontSize: 12, marginTop: 2 }} numberOfLines={1}>{m.email}</Muted>
                  <Badge label={m.role} bg={rs.bg} fg={rs.fg} style={{ marginTop: 8 }} />
                </View>

                <TouchableOpacity hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}>
                  <Ionicons name="ellipsis-vertical" size={20} color={colors.textMuted} />
                </TouchableOpacity>
              </View>
            </Card>
          );
        })}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row', alignItems: 'center' },
  name: { fontSize: 15, fontWeight: '700', color: colors.textHeading },
  onlineDot: {
    position: 'absolute',
    right: 0,
    bottom: 0,
    width: 14,
    height: 14,
    borderRadius: 7,
    backgroundColor: colors.brandGreen,
    borderWidth: 2,
    borderColor: '#fff',
  },
});
