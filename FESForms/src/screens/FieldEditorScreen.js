import React, { useState } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { colors, radius } from '../theme';
import { CHOICE_TYPES } from '../data';
import { useApp } from '../AppContext';
import { StackHeader } from '../Header';
import { Field, Input, Label, Muted, Toggle, Btn, Card } from '../components';

const SOURCES = ['Manual', 'From API', 'From Location Hierarchy'];

export default function FieldEditorScreen({ navigation, route }) {
  const { draft, updateField, removeField } = useApp();
  const field = draft?.fields.find((f) => f.id === route.params.fieldId);
  const [source, setSource] = useState(field?.source || 'Manual');

  if (!field) {
    return (
      <View style={{ flex: 1, backgroundColor: colors.canvas }}>
        <StackHeader title="Field" navigation={navigation} />
      </View>
    );
  }

  const isChoice = CHOICE_TYPES.includes(field.type);
  const opts = field.opts || [];

  const setOpt = (i, v) => {
    const next = [...opts];
    next[i] = v;
    updateField(field.id, { opts: next });
  };
  const addOpt = () => updateField(field.id, { opts: [...opts, 'Option ' + (opts.length + 1)] });
  const delOpt = (i) => updateField(field.id, { opts: opts.filter((_, idx) => idx !== i) });

  return (
    <View style={{ flex: 1, backgroundColor: colors.canvas }}>
      <StackHeader
        title="Edit Question"
        subtitle={field.type}
        navigation={navigation}
        right={<Btn title="Done" size="sm" onPress={() => navigation.goBack()} />}
      />
      <ScrollView contentContainerStyle={{ padding: 14, paddingBottom: 40 }}>
        <Card pad>
          <Field label="Question Text">
            <Input value={field.label} onChangeText={(t) => updateField(field.id, { label: t })} placeholder="Question text" />
          </Field>

          <Field label="Field Type">
            <View style={styles.readonly}>
              <Text style={{ color: colors.textStrong, fontWeight: '600' }}>{field.type}</Text>
            </View>
          </Field>

          {!field.isSection && (
            <>
              <Field label="Placeholder">
                <Input value={field.ph} onChangeText={(t) => updateField(field.id, { ph: t })} placeholder="Placeholder text" />
              </Field>

              <Field label="Help Text">
                <Input value={field.help} onChangeText={(t) => updateField(field.id, { help: t })} placeholder="Add help text..." multiline />
              </Field>

              <View style={styles.reqRow}>
                <View>
                  <Label>Required field</Label>
                  <Muted style={{ fontSize: 12, marginTop: 2 }}>Respondents must answer this</Muted>
                </View>
                <Toggle on={!!field.required} onPress={() => updateField(field.id, { required: !field.required })} />
              </View>
            </>
          )}

          {isChoice && (
            <>
              <Field label="Options Source">
                <View style={{ gap: 8 }}>
                  {SOURCES.map((s) => (
                    <TouchableOpacity
                      key={s}
                      style={styles.radioRow}
                      onPress={() => {
                        setSource(s);
                        updateField(field.id, { source: s });
                      }}
                    >
                      <Ionicons name={source === s ? 'radio-button-on' : 'radio-button-off'} size={20} color={source === s ? colors.brandBlue : colors.textMuted} />
                      <Text style={styles.radioText}>{s}</Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </Field>

              {source === 'Manual' && (
                <Field label="Options">
                  <View style={{ gap: 8 }}>
                    {opts.map((o, i) => (
                      <View key={i} style={styles.optRow}>
                        <Ionicons name="reorder-two" size={18} color={colors.metricMuted} />
                        <TextInput value={o} onChangeText={(v) => setOpt(i, v)} style={styles.optInput} placeholderTextColor={colors.textPlaceholder} />
                        <TouchableOpacity onPress={() => delOpt(i)}>
                          <Ionicons name="close-circle" size={20} color={colors.error} />
                        </TouchableOpacity>
                      </View>
                    ))}
                  </View>
                  <Btn title="Add Option" icon="add" variant="ghost" size="sm" full style={{ marginTop: 10, borderStyle: 'dashed' }} onPress={addOpt} />
                </Field>
              )}

              {source === 'From API' && (
                <Card pad style={styles.apiBox}>
                  <Text style={styles.apiTitle}>API Configuration</Text>
                  <Field label="API URL"><Input placeholder="https://api.example.com/options" /></Field>
                  <Field label="Method"><Input value="GET" editable={false} /></Field>
                  <Field label="Execution"><Input value="Server" editable={false} /></Field>
                </Card>
              )}

              {source === 'From Location Hierarchy' && (
                <Card pad style={styles.apiBox}>
                  <Text style={styles.apiTitle}>Location Levels</Text>
                  {['State', 'District', 'Sub-district', 'Block', 'Village'].map((lvl) => (
                    <View key={lvl} style={styles.lvlRow}>
                      <Ionicons name="checkbox-outline" size={20} color={colors.textMuted} />
                      <Text style={styles.radioText}>{lvl}</Text>
                    </View>
                  ))}
                </Card>
              )}
            </>
          )}
        </Card>

        <Btn
          title="Delete Field"
          icon="trash-outline"
          variant="dangerGhost"
          full
          style={{ marginTop: 16 }}
          onPress={() => {
            removeField(field.id);
            navigation.goBack();
          }}
        />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  readonly: {
    height: 46, borderRadius: radius.control, borderWidth: 1, borderColor: colors.borderSubtle,
    backgroundColor: '#F5F6F8', paddingHorizontal: 12, justifyContent: 'center',
  },
  reqRow: {
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
    paddingVertical: 12, borderTopWidth: 1, borderTopColor: colors.borderSubtle, marginTop: 4,
  },
  radioRow: { flexDirection: 'row', alignItems: 'center', gap: 10, paddingVertical: 4 },
  radioText: { fontSize: 14, color: colors.textStrong },
  optRow: {
    flexDirection: 'row', alignItems: 'center', gap: 8,
    borderWidth: 1, borderColor: colors.inputBorder, borderRadius: radius.control,
    backgroundColor: colors.inputSurface, paddingHorizontal: 10, height: 46,
  },
  optInput: { flex: 1, fontSize: 14, color: colors.textStrong },
  apiBox: { marginTop: 10, backgroundColor: '#FAFBFF' },
  apiTitle: { fontSize: 15, fontWeight: '700', color: colors.textHeading, marginBottom: 12 },
  lvlRow: { flexDirection: 'row', alignItems: 'center', gap: 10, paddingVertical: 8 },
});
