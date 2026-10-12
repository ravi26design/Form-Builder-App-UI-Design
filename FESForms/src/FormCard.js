import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, categoryMeta } from './theme';
import { Card, Muted, StatusBadge, Btn, IconPill } from './components';

// A single form card. In field-user mode it shows a Fill/Edit CTA;
// in admin mode it shows quick actions (view / edit / analytics).
export default function FormCard({ form, isFieldUser, onOpen, onStar, onView, onEdit, onAnalytics, onFill }) {
  const cat = categoryMeta[form.cat] || categoryMeta.water;
  const fieldStatus = form.s === 'active' ? 'submitted' : 'pending';

  return (
    <Card pad style={styles.wrap} onPress={onOpen}>
      <View style={{ flexDirection: 'row', alignItems: 'flex-start' }}>
        <View style={{ flex: 1, minWidth: 0 }}>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 6 }}>
            <TouchableOpacity onPress={onStar} hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}>
              <Ionicons name={form.star ? 'bookmark' : 'bookmark-outline'} size={18} color={form.star ? colors.pending : colors.metricMuted} />
            </TouchableOpacity>
            <Text numberOfLines={2} style={styles.title}>
              {form.n}
            </Text>
          </View>
          <StatusBadge status={isFieldUser ? fieldStatus : form.s} />
          <Muted numberOfLines={2} style={{ marginTop: 8, color: colors.textStrong }}>
            {form.d}
          </Muted>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6, marginTop: 8 }}>
            <Ionicons name={cat.icon} size={13} color={cat.color} />
            <Muted style={{ fontSize: 12 }} numberOfLines={1}>
              {cat.label} · {form.r} responses · {form.mod}
            </Muted>
          </View>
        </View>
      </View>

      {isFieldUser ? (
        <Btn
          title={form.s === 'active' ? 'View Response' : 'Fill Form'}
          icon={form.s === 'active' ? 'eye' : 'document-text'}
          variant={form.s === 'active' ? 'outline' : 'primary'}
          size="sm"
          full
          style={{ marginTop: 14 }}
          onPress={onFill}
        />
      ) : (
        <View style={styles.actions}>
          <IconPill icon="eye-outline" onPress={onView} />
          <IconPill icon="create-outline" onPress={onEdit} />
          <IconPill icon="bar-chart-outline" onPress={onAnalytics} />
          <IconPill icon="copy-outline" onPress={() => {}} />
          <IconPill icon="trash-outline" color={colors.error} onPress={() => {}} />
        </View>
      )}
    </Card>
  );
}

const styles = StyleSheet.create({
  wrap: { marginBottom: 12 },
  title: { flex: 1, fontSize: 15, fontWeight: '700', color: colors.textHeading },
  actions: { flexDirection: 'row', gap: 10, marginTop: 14, flexWrap: 'wrap' },
});
