import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

import { colors, radius, categoryMeta } from '../theme';
import { Card, Muted, Label, Badge, Btn } from '../components';

export default function PreviewScreen({ navigation, route }) {
  const insets = useSafeAreaInsets();
  const form = route.params?.form;
  const cat = form?.cat && categoryMeta[form.cat] ? categoryMeta[form.cat] : null;

  return (
    <View style={{ flex: 1, backgroundColor: colors.canvas }}>
      {/* Modal-style header */}
      <View style={[styles.header, { paddingTop: insets.top + 10 }]}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.closeBtn}
          hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
        >
          <Ionicons name="close" size={24} color={colors.textHeading} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Preview</Text>
        <View style={styles.closeBtn} />
      </View>

      <ScrollView contentContainerStyle={{ padding: 14, paddingBottom: 30 }}>
        {/* Form header card */}
        <Card pad>
          {form?.prog ? (
            <Badge
              label={cat ? cat.label : form.prog}
              bg={colors.blueTint}
              fg={colors.brandBlue}
              icon={cat ? cat.icon : 'briefcase-outline'}
              style={{ marginBottom: 12 }}
            />
          ) : null}
          <Text style={styles.formTitle}>{form?.n || 'Form Preview'}</Text>
          {form?.d ? <Muted style={{ marginTop: 6 }}>{form.d}</Muted> : null}
        </Card>

        {/* Short Text */}
        <View style={{ marginTop: 16 }}>
          <Label required>Village/Community Name</Label>
          <View style={[styles.fakeInput, { marginTop: 7 }]}>
            <Text style={styles.placeholder}>Enter village name</Text>
          </View>
        </View>

        {/* Dropdown */}
        <View style={{ marginTop: 16 }}>
          <Label required>Water Source Type</Label>
          <View style={[styles.fakeInput, styles.selectBox, { marginTop: 7 }]}>
            <Text style={styles.placeholder}>Select an option</Text>
            <Ionicons name="chevron-down" size={18} color={colors.textMuted} />
          </View>
        </View>

        {/* Number */}
        <View style={{ marginTop: 16 }}>
          <Label required>Water Table Depth (meters)</Label>
          <View style={[styles.fakeInput, { marginTop: 7 }]}>
            <Text style={styles.placeholder}>Enter a number</Text>
          </View>
        </View>

        {/* Multiple Choice */}
        <View style={{ marginTop: 16 }}>
          <Label required>Water Quality Observations</Label>
          <View style={{ marginTop: 8 }}>
            {['Clear', 'Turbid', 'Coloured'].map((opt) => (
              <View key={opt} style={styles.radioRow}>
                <Ionicons name="radio-button-off" size={20} color={colors.textMuted} />
                <Text style={styles.radioLabel}>{opt}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Photo Upload */}
        <View style={{ marginTop: 16 }}>
          <Label>Site Photo</Label>
          <View style={[styles.dashedBox, { marginTop: 8 }]}>
            <Ionicons name="camera-outline" size={28} color={colors.textMuted} />
            <Muted style={{ marginTop: 8 }}>Tap to upload a photo</Muted>
          </View>
        </View>

        {/* Location */}
        <View style={{ marginTop: 16 }}>
          <Label required>Field Location</Label>
          <View style={[styles.locationBtn, { marginTop: 8 }]}>
            <Ionicons name="location-outline" size={18} color={colors.brandBlue} />
            <Text style={styles.locationText}>Capture current location</Text>
          </View>
        </View>

        {/* Submit */}
        <View style={{ marginTop: 24 }}>
          <Btn title="Submit" variant="primary" icon="checkmark" full />
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#fff',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 14,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: colors.borderSubtle,
  },
  closeBtn: { width: 34, height: 34, alignItems: 'center', justifyContent: 'center' },
  headerTitle: { fontSize: 17, fontWeight: '700', color: colors.textHeading },

  formTitle: { fontSize: 20, fontWeight: '700', color: colors.textHeading },

  fakeInput: {
    minHeight: 46,
    backgroundColor: colors.inputSurface,
    borderWidth: 1,
    borderColor: colors.inputBorder,
    borderRadius: radius.control,
    paddingHorizontal: 12,
    justifyContent: 'center',
  },
  selectBox: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  placeholder: { fontSize: 14, color: colors.textPlaceholder },

  radioRow: { flexDirection: 'row', alignItems: 'center', paddingVertical: 8 },
  radioLabel: { fontSize: 14, color: colors.textStrong, marginLeft: 10 },

  dashedBox: {
    borderWidth: 1.5,
    borderStyle: 'dashed',
    borderColor: colors.divider,
    borderRadius: radius.control,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 28,
    backgroundColor: colors.inputSurface,
  },

  locationBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 46,
    borderWidth: 1,
    borderColor: colors.brandBlue,
    borderRadius: radius.control,
    backgroundColor: '#fff',
  },
  locationText: { fontSize: 14, fontWeight: '700', color: colors.brandBlue, marginLeft: 8 },
});
