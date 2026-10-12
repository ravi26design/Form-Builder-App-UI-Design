import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { colors } from './theme';

// Blue gradient hero header (used on Home / Profile / Dashboard tops)
export function GradientHeader({ children, style, height }) {
  const insets = useSafeAreaInsets();
  return (
    <LinearGradient
      colors={[colors.brandBlue, colors.brandBlueDark]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={[
        {
          paddingTop: insets.top + 14,
          paddingHorizontal: 18,
          paddingBottom: 20,
          borderBottomLeftRadius: 22,
          borderBottomRightRadius: 22,
        },
        style,
      ]}
    >
      {children}
    </LinearGradient>
  );
}

// White stack header with back chevron + title (used on pushed screens)
export function StackHeader({ title, subtitle, onBack, right, navigation }) {
  const insets = useSafeAreaInsets();
  const back = onBack || (navigation ? () => navigation.goBack() : null);
  return (
    <View style={[styles.stackHead, { paddingTop: insets.top + 8 }]}>
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
        {back ? (
          <TouchableOpacity onPress={back} style={styles.backBtn} hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}>
            <Ionicons name="arrow-back" size={22} color={colors.brandBlue} />
          </TouchableOpacity>
        ) : null}
        <View style={{ flex: 1 }}>
          <Text numberOfLines={1} style={styles.stackTitle}>
            {title}
          </Text>
          {subtitle ? (
            <Text numberOfLines={1} style={styles.stackSub}>
              {subtitle}
            </Text>
          ) : null}
        </View>
        {right}
      </View>
    </View>
  );
}

// Plain top area that just reserves the safe-area inset (for tab screens with own content)
export function SafeTop({ background = colors.canvas }) {
  const insets = useSafeAreaInsets();
  return <View style={{ height: insets.top, backgroundColor: background }} />;
}

const styles = StyleSheet.create({
  stackHead: {
    backgroundColor: '#fff',
    paddingHorizontal: 14,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: colors.borderSubtle,
  },
  backBtn: { width: 34, height: 34, borderRadius: 10, alignItems: 'center', justifyContent: 'center' },
  stackTitle: { fontSize: 17, fontWeight: '700', color: colors.textHeading },
  stackSub: { fontSize: 12, color: colors.textMuted, marginTop: 2 },
});
