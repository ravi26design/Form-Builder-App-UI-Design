import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, Modal, TextInput } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { colors, radius, shadow, categoryMeta } from '../theme';
import { FIELD_PALETTE, CHOICE_TYPES } from '../data';
import { useApp } from '../AppContext';
import { StackHeader } from '../Header';
import { Card, Muted, Btn, Badge } from '../components';

const FIELD_ICON = {};
FIELD_PALETTE.forEach((g) => g.items.forEach((it) => (FIELD_ICON[it.type] = it.icon)));

export default function BuilderScreen({ navigation, route }) {
  const { draft, newDraft, editDraft, addField, removeField, moveField, patchDraft, publishDraft } = useApp();
  const [paletteOpen, setPaletteOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const mode = route.params?.mode || 'new';

  useEffect(() => {
    if (mode === 'edit' && route.params?.form) editDraft(route.params.form);
    else newDraft();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!draft) {
    return (
      <View style={{ flex: 1, backgroundColor: colors.canvas }}>
        <StackHeader title="Loading…" navigation={navigation} />
      </View>
    );
  }

  const cat = categoryMeta[draft.cat] || categoryMeta.water;
  const fieldCount = draft.fields.filter((f) => !f.isSection).length;

  const onPublish = () => {
    publishDraft();
    navigation.goBack();
  };

  return (
    <View style={{ flex: 1, backgroundColor: colors.canvas }}>
      <StackHeader
        title={draft.n || 'Untitled Form'}
        subtitle={`${fieldCount} field${fieldCount === 1 ? '' : 's'} · ${mode === 'edit' ? 'Editing' : 'New form'}`}
        navigation={navigation}
        right={
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}>
            <Btn title="Publish" icon="send" size="sm" onPress={onPublish} />
            <TouchableOpacity onPress={() => setMenuOpen((v) => !v)} style={{ padding: 6 }}>
              <Ionicons name="ellipsis-vertical" size={20} color={colors.textStrong} />
            </TouchableOpacity>
          </View>
        }
      />

      {menuOpen ? (
        <View style={styles.menu}>
          {[
            { icon: 'eye', label: 'Preview', act: () => navigation.navigate('Preview', { form: { ...draft } }) },
            { icon: 'trending-up', label: `Indicators (${(draft.ind && draft.ind.length) || 3})`, act: () => {} },
            { icon: 'save', label: 'Save as Template', act: () => {} },
          ].map((m) => (
            <TouchableOpacity
              key={m.label}
              style={styles.menuItem}
              onPress={() => {
                setMenuOpen(false);
                m.act();
              }}
            >
              <Ionicons name={m.icon} size={16} color={colors.textStrong} />
              <Text style={styles.menuText}>{m.label}</Text>
            </TouchableOpacity>
          ))}
        </View>
      ) : null}

      <ScrollView contentContainerStyle={{ padding: 14, paddingBottom: 120 }}>
        {/* Form header card */}
        <Card pad style={{ marginBottom: 14 }}>
          {draft.prog ? (
            <Badge label={`PROGRAM · ${draft.prog}`} bg={colors.blueTint} fg={colors.brandBlue} icon="pricetag" />
          ) : (
            <TouchableOpacity style={styles.progWarn}>
              <Ionicons name="pricetag" size={14} color="#C62828" />
              <Text style={styles.progWarnText}>Program Required — tap to select</Text>
              <Ionicons name="chevron-forward" size={16} color="#C62828" />
            </TouchableOpacity>
          )}
          <TextInput
            value={draft.n}
            onChangeText={(t) => patchDraft({ n: t })}
            placeholder="Form title"
            placeholderTextColor={colors.textPlaceholder}
            style={styles.titleInput}
          />
          <TextInput
            value={draft.d}
            onChangeText={(t) => patchDraft({ d: t })}
            placeholder="Form description"
            placeholderTextColor={colors.textPlaceholder}
            multiline
            style={styles.descInput}
          />
        </Card>

        {/* Fields */}
        {draft.fields.length === 0 ? (
          <Card pad style={styles.empty}>
            <Ionicons name="document-text-outline" size={40} color={colors.metricMuted} />
            <Text style={styles.emptyTitle}>Start building your form</Text>
            <Muted style={{ marginTop: 6, textAlign: 'center' }}>Tap “Add Field” to place questions and sections.</Muted>
          </Card>
        ) : (
          draft.fields.map((f, i) =>
            f.isSection ? (
              <View key={f.id} style={styles.sectionRow}>
                <View style={{ flex: 1 }}>
                  <Text style={styles.sectionLabel}>SECTION</Text>
                  <Text style={styles.sectionTitle}>{f.label}</Text>
                </View>
                <FieldControls i={i} last={draft.fields.length - 1} onUp={() => moveField(f.id, -1)} onDown={() => moveField(f.id, 1)} onDelete={() => removeField(f.id)} onEdit={() => navigation.navigate('FieldEditor', { fieldId: f.id })} />
              </View>
            ) : (
              <Card key={f.id} pad style={styles.fieldCard} onPress={() => navigation.navigate('FieldEditor', { fieldId: f.id })}>
                <View style={{ flexDirection: 'row', alignItems: 'flex-start' }}>
                  <View style={styles.fieldIcon}>
                    <Ionicons name={FIELD_ICON[f.type] || 'ellipse'} size={18} color={colors.brandBlue} />
                  </View>
                  <View style={{ flex: 1 }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6, flexWrap: 'wrap' }}>
                      <Text style={styles.fieldLabel}>{f.label}</Text>
                      {f.required ? <Text style={{ color: colors.error, fontWeight: '700' }}>*</Text> : null}
                    </View>
                    <Text style={styles.fieldType}>{f.type}</Text>
                    <FieldPreview field={f} />
                  </View>
                  <FieldControls i={i} last={draft.fields.length - 1} onUp={() => moveField(f.id, -1)} onDown={() => moveField(f.id, 1)} onDelete={() => removeField(f.id)} onEdit={() => navigation.navigate('FieldEditor', { fieldId: f.id })} />
                </View>
              </Card>
            )
          )
        )}

        <Btn title="Add Field" icon="add" variant="outline" full style={{ marginTop: 6, borderStyle: 'dashed' }} onPress={() => setPaletteOpen(true)} />
      </ScrollView>

      {/* Palette bottom sheet */}
      <Modal visible={paletteOpen} transparent animationType="slide" onRequestClose={() => setPaletteOpen(false)}>
        <TouchableOpacity style={styles.sheetBackdrop} activeOpacity={1} onPress={() => setPaletteOpen(false)} />
        <View style={styles.sheet}>
          <View style={styles.sheetHandle} />
          <Text style={styles.sheetTitle}>Add a field</Text>
          <ScrollView contentContainerStyle={{ paddingBottom: 30 }}>
            {FIELD_PALETTE.map((g) => (
              <View key={g.group}>
                <Text style={styles.paletteGroup}>{g.group}</Text>
                <View style={styles.paletteGrid}>
                  {g.items.map((it) => (
                    <TouchableOpacity
                      key={it.type}
                      style={styles.paletteTile}
                      onPress={() => {
                        addField(it.type);
                        setPaletteOpen(false);
                      }}
                    >
                      <View style={styles.paletteIcon}>
                        <Ionicons name={it.icon} size={17} color={colors.brandBlue} />
                      </View>
                      <Text style={styles.paletteText}>{it.type}</Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>
            ))}
          </ScrollView>
        </View>
      </Modal>
    </View>
  );
}

function FieldControls({ i, last, onUp, onDown, onDelete, onEdit }) {
  return (
    <View style={{ alignItems: 'center', gap: 2, marginLeft: 6 }}>
      <TouchableOpacity onPress={onUp} disabled={i === 0} style={styles.ctrl}>
        <Ionicons name="chevron-up" size={16} color={i === 0 ? colors.metricMuted : colors.textMuted} />
      </TouchableOpacity>
      <TouchableOpacity onPress={onDown} disabled={i === last} style={styles.ctrl}>
        <Ionicons name="chevron-down" size={16} color={i === last ? colors.metricMuted : colors.textMuted} />
      </TouchableOpacity>
      <TouchableOpacity onPress={onDelete} style={styles.ctrl}>
        <Ionicons name="trash-outline" size={15} color={colors.error} />
      </TouchableOpacity>
    </View>
  );
}

function FieldPreview({ field }) {
  const { type } = field;
  if (CHOICE_TYPES.includes(type) && field.opts) {
    return (
      <View style={{ marginTop: 8, gap: 6 }}>
        {field.opts.slice(0, 3).map((o, i) => (
          <View key={i} style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
            <Ionicons
              name={type === 'Checkboxes' ? 'square-outline' : type === 'Dropdown' ? 'remove-outline' : 'ellipse-outline'}
              size={15}
              color={colors.textMuted}
            />
            <Text style={{ fontSize: 13, color: colors.textStrong }}>{o}</Text>
          </View>
        ))}
      </View>
    );
  }
  if (type === 'Rating') {
    return (
      <View style={{ flexDirection: 'row', marginTop: 8, gap: 3 }}>
        {[1, 2, 3, 4, 5].map((n) => (
          <Ionicons key={n} name="star-outline" size={18} color={colors.pending} />
        ))}
      </View>
    );
  }
  if (type === 'Photo Upload' || type === 'File Upload' || type === 'Signature') {
    return (
      <View style={styles.mediaBox}>
        <Ionicons name={type === 'Signature' ? 'create-outline' : 'cloud-upload-outline'} size={20} color={colors.textMuted} />
        <Text style={{ fontSize: 12, color: colors.textMuted, marginTop: 4 }}>{type === 'Signature' ? 'Sign here' : 'Upload / capture'}</Text>
      </View>
    );
  }
  return (
    <View style={styles.previewInput}>
      <Text style={{ color: colors.textPlaceholder, fontSize: 13 }}>{field.ph || 'Enter value'}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  menu: {
    position: 'absolute',
    top: 96,
    right: 14,
    zIndex: 50,
    backgroundColor: '#fff',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.borderSubtle,
    paddingVertical: 6,
    minWidth: 200,
    ...shadow.float,
  },
  menuItem: { flexDirection: 'row', alignItems: 'center', gap: 10, paddingHorizontal: 14, paddingVertical: 11 },
  menuText: { fontSize: 14, fontWeight: '700', color: colors.textStrong },

  progWarn: {
    flexDirection: 'row', alignItems: 'center', gap: 8,
    backgroundColor: colors.errorTint, borderColor: '#f3c2c2', borderWidth: 1,
    borderRadius: 10, paddingHorizontal: 12, paddingVertical: 10, marginBottom: 12,
  },
  progWarnText: { flex: 1, color: '#C62828', fontWeight: '700', fontSize: 12 },
  titleInput: { fontSize: 22, fontWeight: '700', color: colors.textHeading, marginTop: 12, padding: 0 },
  descInput: { fontSize: 14, color: colors.textStrong, marginTop: 8, minHeight: 40, padding: 0 },

  empty: { alignItems: 'center', paddingVertical: 44, borderStyle: 'dashed', borderColor: colors.divider },
  emptyTitle: { fontSize: 18, fontWeight: '700', color: colors.textHeading, marginTop: 12 },

  sectionRow: {
    flexDirection: 'row', alignItems: 'center',
    backgroundColor: colors.blueTint, borderRadius: 12, padding: 14, marginBottom: 12,
  },
  sectionLabel: { fontSize: 10, fontWeight: '700', letterSpacing: 0.6, color: colors.brandBlue },
  sectionTitle: { fontSize: 16, fontWeight: '700', color: colors.textHeading, marginTop: 2 },

  fieldCard: { marginBottom: 12 },
  fieldIcon: {
    width: 34, height: 34, borderRadius: 9, backgroundColor: colors.blueTint,
    alignItems: 'center', justifyContent: 'center', marginRight: 10,
  },
  fieldLabel: { fontSize: 15, fontWeight: '700', color: colors.textHeading },
  fieldType: { fontSize: 12, color: colors.textMuted, marginTop: 2 },
  previewInput: {
    marginTop: 8, height: 38, borderRadius: 10, borderWidth: 1, borderColor: colors.inputBorder,
    backgroundColor: colors.inputSurface, paddingHorizontal: 10, justifyContent: 'center',
  },
  mediaBox: {
    marginTop: 8, minHeight: 60, borderRadius: 10, borderWidth: 1, borderStyle: 'dashed',
    borderColor: colors.divider, alignItems: 'center', justifyContent: 'center', paddingVertical: 10,
  },
  ctrl: { padding: 3 },

  sheetBackdrop: { flex: 1, backgroundColor: 'rgba(16,24,40,0.4)' },
  sheet: {
    backgroundColor: '#fff', borderTopLeftRadius: 22, borderTopRightRadius: 22,
    paddingHorizontal: 18, paddingTop: 10, maxHeight: '78%',
  },
  sheetHandle: { alignSelf: 'center', width: 40, height: 4, borderRadius: 2, backgroundColor: colors.divider, marginBottom: 12 },
  sheetTitle: { fontSize: 18, fontWeight: '700', color: colors.textHeading, marginBottom: 6 },
  paletteGroup: { fontSize: 11, fontWeight: '700', letterSpacing: 0.6, color: colors.textMuted, textTransform: 'uppercase', marginTop: 16, marginBottom: 8 },
  paletteGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 10 },
  paletteTile: {
    width: '47%', flexGrow: 1, flexDirection: 'row', alignItems: 'center', gap: 10,
    borderWidth: 1, borderColor: colors.borderSubtle, borderRadius: 12, padding: 12,
  },
  paletteIcon: { width: 30, height: 30, borderRadius: 8, backgroundColor: colors.blueTint, alignItems: 'center', justifyContent: 'center' },
  paletteText: { fontSize: 13, fontWeight: '600', color: colors.textStrong, flexShrink: 1 },
});
