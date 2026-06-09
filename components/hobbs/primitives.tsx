// components/hobbs/primitives.tsx — shared UI primitives (README §4, hobbs-ui.jsx).
// HPrimary · HGhost · HChip · HSectionTitle.

import React from 'react';
import { Pressable, View, StyleProp, ViewStyle } from 'react-native';
import { H, fonts, radii, spacing } from '@/theme/tokens';
import HText from './HText';
import HIcon, { HIconName } from './HIcon';

// ─── Primary CTA — amber on cream ─────────────────────────────────────────
export function HPrimary({
  label,
  onPress,
  disabled,
  showArrow = true,
}: {
  label: string;
  onPress?: () => void;
  disabled?: boolean;
  showArrow?: boolean;
}) {
  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      style={{
        width: '100%',
        height: spacing.buttonH,
        borderRadius: radii.pill,
        backgroundColor: disabled ? 'rgba(232,132,60,0.35)' : H.amber,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 10,
      }}
    >
      <HText
        style={{ fontFamily: fonts.sansSemibold, fontSize: 14, letterSpacing: 0.4 }}
        color={H.hi}
      >
        {label}
      </HText>
      {showArrow && <HIcon name="arrow-r" size={14} stroke={2.2} color={H.hi} />}
    </Pressable>
  );
}

// ─── Ghost / outline button ───────────────────────────────────────────────
export function HGhost({
  label,
  onPress,
  size = 'md',
  icon,
}: {
  label: string;
  onPress?: () => void;
  size?: 'sm' | 'md';
  icon?: HIconName;
}) {
  const sm = size === 'sm';
  return (
    <Pressable
      onPress={onPress}
      style={{
        height: sm ? 36 : 44,
        paddingHorizontal: sm ? 14 : 18,
        borderRadius: radii.pill,
        borderWidth: 1,
        borderColor: H.rule,
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
      }}
    >
      {icon && <HIcon name={icon} size={sm ? 14 : 16} color={H.ink} />}
      <HText
        style={{ fontFamily: fonts.sansSemibold, fontSize: sm ? 12 : 13, letterSpacing: 0.2 }}
      >
        {label}
      </HText>
    </Pressable>
  );
}

// ─── Chip / pill / badge ──────────────────────────────────────────────────
type ChipTone = 'ink' | 'amber' | 'sage' | 'sky' | 'dusk' | 'rust';

const CHIP_TONE: Record<ChipTone, string> = {
  ink: H.ink, amber: H.amberDp, sage: H.sage, sky: H.sky, dusk: H.dusk, rust: H.rust,
};

export function HChip({
  label,
  tone = 'ink',
  solid,
}: {
  label: string;
  tone?: ChipTone;
  solid?: boolean;
}) {
  const toneColor = CHIP_TONE[tone];
  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderRadius: radii.pill,
        ...(solid
          ? { backgroundColor: toneColor }
          : { borderWidth: 1, borderColor: toneColor }),
      }}
    >
      <HText
        style={{
          fontFamily: fonts.sansSemibold,
          fontSize: 10,
          letterSpacing: 0.4,
          textTransform: 'uppercase',
        }}
        color={solid ? H.hi : toneColor}
      >
        {label}
      </HText>
    </View>
  );
}

// ─── Section title (mono label + optional action) ────────────────────────
export function HSectionTitle({
  children,
  action,
  onAction,
  style,
}: {
  children: string;
  action?: string;
  onAction?: () => void;
  style?: StyleProp<ViewStyle>;
}) {
  return (
    <View
      style={[
        {
          flexDirection: 'row',
          alignItems: 'baseline',
          justifyContent: 'space-between',
          paddingHorizontal: spacing.screenX,
        },
        style,
      ]}
    >
      <HText kind="mono" color={H.inkSoft}>
        {children}
      </HText>
      {action && (
        <Pressable onPress={onAction} hitSlop={8}>
          <HText
            style={{ fontFamily: fonts.sansSemibold, fontSize: 11 }}
            color={H.amberDp}
          >
            {action}
          </HText>
        </Pressable>
      )}
    </View>
  );
}
