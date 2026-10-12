import React, { useState } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

import { colors, radius } from '../theme';
import { FILL_QUESTIONS } from '../data';
import { Input, Muted, Btn, ProgressBar, Card } from '../components';

export default function FillFormScreen({ navigation, route }) {
  const insets = useSafeAreaInsets();
  const form = route.params?.form;
  const questions = FILL_QUESTIONS;
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState({});
  const [done, setDone] = useState(false);

  const q = questions[step];
  const total = questions.length;
  const pct = ((step + 1) / total) * 100;
  const setAns = (v) => setAnswers((a) => ({ ...a, [q.id]: v }));

  if (done) {
    return (
      <View style={[styles.doneWrap, { paddingTop: insets.top }]}>
        <View style={styles.doneIcon}>
          <Ionicons name="checkmark" size={48} color="#fff" />
        </View>
        <Text style={styles.doneTitle}>Submitted!</Text>
        <Muted style={{ textAlign: 'center', marginTop: 8, marginHorizontal: 40 }}>
          Your response to “{form?.n || 'the form'}” has been saved{'\n'}and queued for sync.
        </Muted>
        <Btn title="Back to Forms" full style={{ marginTop: 26, width: 220 }} onPress={() => navigation.navigate('Tabs')} />
      </View>
    );
  }

  const next = () => {
    if (step < total - 1) setStep(step + 1);
    else setDone(true);
  };

  return (
    <View style={{ flex: 1, backgroundColor: colors.canvas }}>
      {/* Header with progress */}
      <View style={[styles.head, { paddingTop: insets.top + 10 }]}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons name="close" size={24} color={colors.textStrong} />
          </TouchableOpacity>
          <Text style={styles.headTitle}>
            Question {step + 1} of {total}
          </Text>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Text style={styles.saveLink}>Save Draft</Text>
          </TouchableOpacity>
        </View>
        <View style={{ marginTop: 12 }}>
          <ProgressBar pct={pct} />
        </View>
      </View>

      <ScrollView contentContainerStyle={{ padding: 18, paddingBottom: 40 }}>
        <Text style={styles.qLabel}>
          {q.label}
          {q.required ? <Text style={{ color: colors.error }}> *</Text> : null}
        </Text>
        {q.type ? <Muted style={{ marginBottom: 16 }}>{q.type}</Muted> : null}

        <QuestionInput q={q} value={answers[q.id]} onChange={setAns} />
      </ScrollView>

      <View style={[styles.footer, { paddingBottom: insets.bottom + 12 }]}>
        <Btn title="Previous" variant="ghost" full disabled={step === 0} style={{ opacity: step === 0 ? 0.5 : 1 }} onPress={() => setStep(Math.max(0, step - 1))} />
        <Btn title={step === total - 1 ? 'Submit' : 'Next'} icon={step === total - 1 ? 'checkmark' : 'arrow-forward'} full onPress={next} />
      </View>
    </View>
  );
}

function QuestionInput({ q, value, onChange }) {
  switch (q.type) {
    case 'Long Text':
      return <Input placeholder={q.ph} value={value} onChangeText={onChange} multiline />;
    case 'Number':
      return <Input placeholder={q.ph} value={value} onChangeText={onChange} keyboardType="numeric" />;
    case 'Short Text':
      return <Input placeholder={q.ph} value={value} onChangeText={onChange} />;
    case 'Dropdown':
    case 'Multiple Choice':
      return (
        <View style={{ gap: 10 }}>
          {q.opts.map((o) => (
            <TouchableOpacity key={o} style={[styles.choice, value === o && styles.choiceSel]} onPress={() => onChange(o)}>
              <Ionicons name={value === o ? 'radio-button-on' : 'radio-button-off'} size={20} color={value === o ? colors.brandBlue : colors.textMuted} />
              <Text style={[styles.choiceText, value === o && { color: colors.brandBlue, fontWeight: '700' }]}>{o}</Text>
            </TouchableOpacity>
          ))}
        </View>
      );
    case 'Checkboxes': {
      const arr = Array.isArray(value) ? value : [];
      const toggle = (o) => (arr.includes(o) ? onChange(arr.filter((x) => x !== o)) : onChange([...arr, o]));
      return (
        <View style={{ gap: 10 }}>
          {q.opts.map((o) => {
            const on = arr.includes(o);
            return (
              <TouchableOpacity key={o} style={[styles.choice, on && styles.choiceSel]} onPress={() => toggle(o)}>
                <Ionicons name={on ? 'checkbox' : 'square-outline'} size={20} color={on ? colors.brandBlue : colors.textMuted} />
                <Text style={[styles.choiceText, on && { color: colors.brandBlue, fontWeight: '700' }]}>{o}</Text>
              </TouchableOpacity>
            );
          })}
        </View>
      );
    }
    case 'Rating':
      return (
        <View style={{ flexDirection: 'row', gap: 8, marginTop: 4 }}>
          {[1, 2, 3, 4, 5].map((n) => (
            <TouchableOpacity key={n} onPress={() => onChange(n)}>
              <Ionicons name={value >= n ? 'star' : 'star-outline'} size={38} color={colors.pending} />
            </TouchableOpacity>
          ))}
        </View>
      );
    case 'Photo Upload':
      return (
        <TouchableOpacity style={styles.media} onPress={() => onChange('photo.jpg')}>
          <Ionicons name={value ? 'checkmark-circle' : 'camera'} size={30} color={value ? colors.brandGreen : colors.textMuted} />
          <Text style={{ color: value ? colors.brandGreen : colors.textMuted, marginTop: 6 }}>
            {value ? 'Photo captured' : 'Take a photo or choose from gallery'}
          </Text>
        </TouchableOpacity>
      );
    case 'Location':
      return (
        <Btn
          title={value ? '📍 Location captured' : 'Capture Current Location'}
          icon={value ? undefined : 'location'}
          variant={value ? 'green' : 'outline'}
          full
          onPress={() => onChange('13.2257° N, 76.0119° E')}
        />
      );
    case 'Signature':
      return (
        <TouchableOpacity style={[styles.media, { minHeight: 130 }]} onPress={() => onChange('signed')}>
          {value ? (
            <>
              <Ionicons name="checkmark-circle" size={30} color={colors.brandGreen} />
              <Text style={{ color: colors.brandGreen, marginTop: 6 }}>Signature captured</Text>
            </>
          ) : (
            <>
              <Ionicons name="create-outline" size={30} color={colors.textMuted} />
              <Text style={{ color: colors.textMuted, marginTop: 6 }}>Tap to sign</Text>
            </>
          )}
        </TouchableOpacity>
      );
    default:
      return <Input placeholder={q.ph} value={value} onChangeText={onChange} />;
  }
}

const styles = StyleSheet.create({
  head: {
    backgroundColor: '#fff', paddingHorizontal: 16, paddingBottom: 14,
    borderBottomWidth: 1, borderBottomColor: colors.borderSubtle,
  },
  headTitle: { fontSize: 15, fontWeight: '700', color: colors.textHeading },
  saveLink: { color: colors.brandBlue, fontWeight: '700', fontSize: 13 },

  qLabel: { fontSize: 20, fontWeight: '700', color: colors.textHeading, marginBottom: 4 },

  choice: {
    flexDirection: 'row', alignItems: 'center', gap: 12,
    borderWidth: 1, borderColor: colors.borderSubtle, borderRadius: radius.control,
    backgroundColor: '#fff', paddingHorizontal: 14, paddingVertical: 14,
  },
  choiceSel: { borderColor: colors.brandBlue, backgroundColor: '#F2F6FF' },
  choiceText: { fontSize: 15, color: colors.textStrong },

  media: {
    minHeight: 110, borderRadius: radius.control, borderWidth: 1, borderStyle: 'dashed',
    borderColor: colors.divider, backgroundColor: '#fff',
    alignItems: 'center', justifyContent: 'center', padding: 16,
  },

  footer: {
    flexDirection: 'row', gap: 12, paddingHorizontal: 16, paddingTop: 12,
    backgroundColor: '#fff', borderTopWidth: 1, borderTopColor: colors.borderSubtle,
  },

  doneWrap: { flex: 1, backgroundColor: '#fff', alignItems: 'center', justifyContent: 'center', padding: 24 },
  doneIcon: {
    width: 96, height: 96, borderRadius: 48, backgroundColor: colors.brandGreen,
    alignItems: 'center', justifyContent: 'center', marginBottom: 20,
  },
  doneTitle: { fontSize: 24, fontWeight: '700', color: colors.textHeading },
});
