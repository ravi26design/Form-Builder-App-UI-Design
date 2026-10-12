import React from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, radius, shadow, statusStyles } from './theme';

// ---------- Text helpers ----------
export function H1({ children, style }) {
  return <Text style={[s.h1, style]}>{children}</Text>;
}
export function SectionTitle({ children, style }) {
  return <Text style={[s.sectionTitle, style]}>{children}</Text>;
}
export function Muted({ children, style, numberOfLines }) {
  return (
    <Text numberOfLines={numberOfLines} style={[s.muted, style]}>
      {children}
    </Text>
  );
}
export function Label({ children, required, style }) {
  return (
    <Text style={[s.label, style]}>
      {children}
      {required ? <Text style={{ color: colors.error }}> *</Text> : null}
    </Text>
  );
}

// ---------- Card ----------
export function Card({ children, style, onPress, pad }) {
  const Comp = onPress ? TouchableOpacity : View;
  return (
    <Comp activeOpacity={0.85} onPress={onPress} style={[s.card, pad && s.cardPad, style]}>
      {children}
    </Comp>
  );
}

// ---------- Badge ----------
export function Badge({ label, bg, fg, icon, dot, style }) {
  return (
    <View style={[s.badge, { backgroundColor: bg || colors.blueTint }, style]}>
      {dot ? <View style={[s.dot, { backgroundColor: fg || colors.brandBlue }]} /> : null}
      {icon ? <Ionicons name={icon} size={12} color={fg || colors.brandBlue} style={{ marginRight: 4 }} /> : null}
      <Text style={[s.badgeText, { color: fg || colors.brandBlue }]}>{label}</Text>
    </View>
  );
}
export function StatusBadge({ status, dot = true }) {
  const st = statusStyles[status] || statusStyles.active;
  return <Badge label={st.label} bg={st.bg} fg={st.fg} icon={dot ? null : st.icon} dot={dot} />;
}

// ---------- Button ----------
export function Btn({ title, onPress, variant = 'primary', icon, size, style, textStyle, full, disabled }) {
  const v = variants[variant] || variants.primary;
  const sizeStyle = size === 'sm' ? s.btnSm : null;
  return (
    <TouchableOpacity
      activeOpacity={0.85}
      onPress={onPress}
      disabled={disabled}
      style={[s.btn, sizeStyle, { backgroundColor: v.bg, borderColor: v.border }, full && { flex: 1 }, disabled && { opacity: 0.5 }, style]}
    >
      {icon ? <Ionicons name={icon} size={size === 'sm' ? 15 : 17} color={v.fg} style={{ marginRight: 6 }} /> : null}
      <Text style={[s.btnText, { color: v.fg }, size === 'sm' && { fontSize: 13 }, textStyle]}>{title}</Text>
    </TouchableOpacity>
  );
}
const variants = {
  primary: { bg: colors.brandBlue, fg: '#fff', border: 'transparent' },
  green: { bg: colors.brandGreen, fg: '#fff', border: 'transparent' },
  outline: { bg: '#fff', fg: colors.brandBlue, border: colors.brandBlue },
  ghost: { bg: '#fff', fg: colors.textStrong, border: colors.borderSubtle },
  danger: { bg: colors.error, fg: '#fff', border: 'transparent' },
  warn: { bg: colors.pending, fg: '#fff', border: 'transparent' },
  dangerGhost: { bg: '#fff', fg: colors.error, border: '#F3C2C2' },
};

// ---------- Icon pill (round icon action) ----------
export function IconPill({ icon, color, onPress, bg }) {
  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.7} style={[s.iconPill, bg && { backgroundColor: bg }]}>
      <Ionicons name={icon} size={17} color={color || colors.brandBlue} />
    </TouchableOpacity>
  );
}

// ---------- Chip / pill tabs ----------
export function Chip({ label, selected, onPress, green }) {
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={onPress}
      style={[s.chip, selected && (green ? s.chipSelGreen : s.chipSel)]}
    >
      <Text style={[s.chipText, selected && s.chipTextSel]}>{label}</Text>
    </TouchableOpacity>
  );
}

// ---------- Inputs ----------
export function Input({ value, onChangeText, placeholder, icon, secureTextEntry, keyboardType, multiline, style, rightIcon, onRightPress, editable = true }) {
  return (
    <View style={[s.input, multiline && s.inputTall, !editable && { backgroundColor: '#F5F6F8' }, style]}>
      {icon ? <Ionicons name={icon} size={16} color={colors.textMuted} style={{ marginRight: 8 }} /> : null}
      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={colors.textPlaceholder}
        secureTextEntry={secureTextEntry}
        keyboardType={keyboardType}
        multiline={multiline}
        editable={editable}
        style={[s.inputText, multiline && { height: 84, textAlignVertical: 'top' }]}
      />
      {rightIcon ? (
        <TouchableOpacity onPress={onRightPress}>
          <Ionicons name={rightIcon} size={18} color={colors.textMuted} />
        </TouchableOpacity>
      ) : null}
    </View>
  );
}

export function Field({ label, required, children, help, style }) {
  return (
    <View style={[{ marginBottom: 16 }, style]}>
      {label ? <Label required={required} style={{ marginBottom: 7 }}>{label}</Label> : null}
      {children}
      {help ? <Muted style={{ marginTop: 6, fontSize: 12 }}>{help}</Muted> : null}
    </View>
  );
}

// ---------- Avatar ----------
export function Avatar({ initials, size = 40, style }) {
  return (
    <View style={[{ width: size, height: size, borderRadius: size / 2, backgroundColor: colors.brandBlue, alignItems: 'center', justifyContent: 'center' }, style]}>
      <Text style={{ color: '#fff', fontWeight: '700', fontSize: size * 0.36 }}>{initials}</Text>
    </View>
  );
}

// ---------- Progress bar ----------
export function ProgressBar({ pct }) {
  return (
    <View style={s.progTrack}>
      <View style={[s.progFill, { width: `${Math.max(0, Math.min(100, pct))}%` }]} />
    </View>
  );
}

// ---------- Toggle ----------
export function Toggle({ on, onPress }) {
  return (
    <TouchableOpacity activeOpacity={0.8} onPress={onPress} style={[s.tgl, on && { backgroundColor: colors.brandGreen }]}>
      <View style={[s.tglDot, on && { left: 21 }]} />
    </TouchableOpacity>
  );
}

// ---------- Empty state ----------
export function EmptyState({ icon = 'file-tray', title, subtitle, action }) {
  return (
    <Card pad style={{ alignItems: 'center', paddingVertical: 44 }}>
      <View style={s.emptyIcon}>
        <Ionicons name={icon} size={34} color={colors.brandBlue} />
      </View>
      <SectionTitle style={{ marginTop: 14 }}>{title}</SectionTitle>
      {subtitle ? <Muted style={{ marginTop: 8, textAlign: 'center' }}>{subtitle}</Muted> : null}
      {action}
    </Card>
  );
}

// ---------- Simple row (label / value) ----------
export function InfoRow({ label, value, icon }) {
  return (
    <View style={s.infoRow}>
      <Muted style={{ fontSize: 13 }}>
        {icon ? <Ionicons name={icon} size={13} color={colors.textMuted} /> : null} {label}
      </Muted>
      <Text style={s.infoValue}>{value}</Text>
    </View>
  );
}

// ---------- Stat card (mini metric) ----------
export function StatTile({ value, label, color }) {
  return (
    <View style={{ flex: 1, minWidth: 120 }}>
      <Text style={{ fontSize: 22, fontWeight: '700', color: color || colors.metricValue }}>{value}</Text>
      <Muted style={{ marginTop: 2 }}>{label}</Muted>
    </View>
  );
}

const s = StyleSheet.create({
  h1: { fontSize: 24, fontWeight: '700', color: colors.textHeading },
  sectionTitle: { fontSize: 18, fontWeight: '700', color: colors.textHeading },
  muted: { fontSize: 13, color: colors.textMuted, lineHeight: 19 },
  label: { fontSize: 13, fontWeight: '700', color: colors.textHeading },

  card: {
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.borderSubtle,
    borderRadius: radius.container,
    ...shadow.card,
  },
  cardPad: { padding: 18 },

  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    height: 26,
    paddingHorizontal: 10,
    borderRadius: radius.chip,
  },
  badgeText: { fontSize: 12, fontWeight: '700' },
  dot: { width: 7, height: 7, borderRadius: 4, marginRight: 6 },

  btn: {
    height: 44,
    borderRadius: radius.control,
    paddingHorizontal: 18,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    ...shadow.xs,
  },
  btnSm: { height: 36, paddingHorizontal: 14 },
  btnText: { fontSize: 14, fontWeight: '700' },

  iconPill: {
    width: 36,
    height: 36,
    borderRadius: 10,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: colors.borderSubtle,
    alignItems: 'center',
    justifyContent: 'center',
  },

  chip: {
    height: 38,
    paddingHorizontal: 18,
    borderRadius: radius.control,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    ...shadow.xs,
    borderWidth: 1,
    borderColor: colors.borderSubtle,
  },
  chipSel: { backgroundColor: colors.brandBlue, borderColor: colors.brandBlue },
  chipSelGreen: { backgroundColor: colors.brandGreen, borderColor: colors.brandGreen },
  chipText: { fontSize: 14, fontWeight: '700', color: colors.brandBlue },
  chipTextSel: { color: '#fff' },

  input: {
    minHeight: 46,
    backgroundColor: colors.inputSurface,
    borderWidth: 1,
    borderColor: colors.inputBorder,
    borderRadius: radius.control,
    paddingHorizontal: 12,
    flexDirection: 'row',
    alignItems: 'center',
  },
  inputTall: { minHeight: 96, alignItems: 'flex-start', paddingVertical: 10 },
  inputText: { flex: 1, fontSize: 14, color: colors.textStrong, paddingVertical: 10 },

  progTrack: { height: 6, backgroundColor: '#E6ECF6', borderRadius: 9, overflow: 'hidden' },
  progFill: { height: '100%', backgroundColor: colors.brandBlue, borderRadius: 9 },

  tgl: { width: 42, height: 24, borderRadius: 14, backgroundColor: '#D0D5DD', justifyContent: 'center' },
  tglDot: { position: 'absolute', left: 3, width: 18, height: 18, borderRadius: 9, backgroundColor: '#fff' },

  emptyIcon: {
    width: 64, height: 64, borderRadius: 32, backgroundColor: colors.blueTint,
    alignItems: 'center', justifyContent: 'center',
  },

  infoRow: {
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: colors.borderSubtle,
  },
  infoValue: { fontSize: 15, fontWeight: '700', color: colors.textHeading, marginTop: 5 },
});

export { s as componentStyles };
