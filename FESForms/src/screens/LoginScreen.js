import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, KeyboardAvoidingView, Platform } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

import { colors, radius, shadow } from '../theme';
import { ROLES } from '../data';
import { useApp } from '../AppContext';
import { H1, Muted, Label, Btn, Input, Field } from '../components';

export default function LoginScreen() {
  const { login } = useApp();
  const insets = useSafeAreaInsets();
  const [role, setRole] = useState(ROLES[0]);
  const [menuOpen, setMenuOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [pw, setPw] = useState('');
  const [showPw, setShowPw] = useState(false);

  return (
    <KeyboardAvoidingView style={{ flex: 1, backgroundColor: '#fff' }} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }} keyboardShouldPersistTaps="handled">
        {/* Hero */}
        <LinearGradient
          colors={[colors.brandBlue, colors.brandBlueDark]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={[styles.hero, { paddingTop: insets.top + 34 }]}
        >
          <View style={styles.logoRow}>
            <View style={styles.mark}>
              <Text style={{ fontSize: 20 }}>🌿</Text>
            </View>
            <View>
              <Text style={styles.logoL1}>India</Text>
              <Text style={styles.logoL2}>
                Observatory <Text style={{ color: '#BFD4FF' }}>Forms</Text>
              </Text>
            </View>
          </View>
          <Text style={styles.heroH}>Manage your conservation forms, seamlessly.</Text>
          <Text style={styles.heroSub}>
            Design forms, collect field data offline, and publish your findings with ease.
          </Text>
        </LinearGradient>

        {/* Form card */}
        <View style={styles.card}>
          <H1>
            Welcome back! <Text style={{ fontSize: 22 }}>👋</Text>
          </H1>
          <Muted style={{ marginTop: 6, marginBottom: 20 }}>Please login to access your account.</Muted>

          {/* Role selector */}
          <View style={{ marginBottom: 16, zIndex: 10 }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 7 }}>
              <Label>Select Role</Label>
              <View style={styles.demoTag}>
                <Text style={styles.demoTagText}>Demo</Text>
              </View>
            </View>
            <TouchableOpacity activeOpacity={0.8} style={styles.roleSel} onPress={() => setMenuOpen((v) => !v)}>
              <View style={[styles.roleIcon, { backgroundColor: role.bg }]}>
                <Ionicons name={role.icon} size={16} color={role.color} />
              </View>
              <Text style={styles.roleName}>{role.name}</Text>
              <Ionicons name={menuOpen ? 'chevron-up' : 'chevron-down'} size={18} color={colors.textMuted} />
            </TouchableOpacity>
            {menuOpen ? (
              <View style={styles.roleMenu}>
                {ROLES.map((r) => (
                  <TouchableOpacity
                    key={r.name}
                    style={styles.roleItem}
                    onPress={() => {
                      setRole(r);
                      setMenuOpen(false);
                    }}
                  >
                    <View style={[styles.roleIcon, { backgroundColor: r.bg }]}>
                      <Ionicons name={r.icon} size={16} color={r.color} />
                    </View>
                    <Text style={[styles.roleName, { flex: 1 }]}>{r.name}</Text>
                    {r.name === role.name ? <Ionicons name="checkmark" size={18} color={colors.brandGreen} /> : null}
                  </TouchableOpacity>
                ))}
              </View>
            ) : null}
          </View>

          <Field label="Email Address">
            <Input icon="mail" placeholder="Type your email" value={email} onChangeText={setEmail} keyboardType="email-address" />
          </Field>
          <Field label="Password">
            <Input
              icon="lock-closed"
              placeholder="Type your password"
              value={pw}
              onChangeText={setPw}
              secureTextEntry={!showPw}
              rightIcon={showPw ? 'eye-off' : 'eye'}
              onRightPress={() => setShowPw((v) => !v)}
            />
          </Field>

          <TouchableOpacity>
            <Text style={styles.forgot}>Forgot Password?</Text>
          </TouchableOpacity>

          <Btn title="Log In" full style={{ marginTop: 6 }} onPress={() => login(role.name)} />

          <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 18, marginBottom: 10 }}>
            <Muted>Don't have an account? </Muted>
            <TouchableOpacity>
              <Text style={styles.link}>Sign Up</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  hero: { paddingHorizontal: 22, paddingBottom: 60 },
  logoRow: { flexDirection: 'row', alignItems: 'center', gap: 10, marginBottom: 22 },
  mark: { width: 40, height: 40, borderRadius: 11, backgroundColor: '#fff', alignItems: 'center', justifyContent: 'center' },
  logoL1: { color: '#fff', fontWeight: '700', fontSize: 16, lineHeight: 17 },
  logoL2: { color: '#EAF0FF', fontWeight: '700', fontSize: 10, letterSpacing: 0.4 },
  heroH: { color: '#fff', fontSize: 22, fontWeight: '700', lineHeight: 28 },
  heroSub: { color: '#D5E0FA', fontSize: 13, marginTop: 8, lineHeight: 19 },

  card: {
    backgroundColor: '#fff',
    marginTop: -34,
    marginHorizontal: 16,
    borderRadius: radius.card,
    padding: 22,
    ...shadow.card,
  },
  demoTag: { marginLeft: 8, backgroundColor: colors.pendingTint, paddingHorizontal: 8, paddingVertical: 2, borderRadius: 6 },
  demoTagText: { fontSize: 10, fontWeight: '700', color: '#B26A00' },

  roleSel: {
    height: 48,
    borderWidth: 1,
    borderColor: colors.inputBorder,
    borderRadius: radius.control,
    backgroundColor: colors.inputSurface,
    paddingHorizontal: 12,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  roleIcon: { width: 30, height: 30, borderRadius: 8, alignItems: 'center', justifyContent: 'center' },
  roleName: { flex: 1, fontSize: 15, fontWeight: '700', color: colors.textStrong },
  roleMenu: {
    marginTop: 6,
    backgroundColor: '#fff',
    borderRadius: radius.control,
    borderWidth: 1,
    borderColor: colors.borderSubtle,
    ...shadow.float,
    overflow: 'hidden',
  },
  roleItem: { flexDirection: 'row', alignItems: 'center', gap: 10, paddingHorizontal: 12, paddingVertical: 11 },

  forgot: { color: colors.brandBlue, fontSize: 13, fontWeight: '600', textAlign: 'right', marginBottom: 16 },
  link: { color: colors.brandBlue, fontSize: 13, fontWeight: '700' },
});
