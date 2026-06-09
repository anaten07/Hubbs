// theme/tokens.ts — Hobbs design system.
// Faithful port of the `H` token object + type scale, spacing and radii
// from the design handoff (prototype/hobbs-shared.jsx + README §4).

import { TextStyle } from 'react-native';

// ─── Color ──────────────────────────────────────────────────────────────
// "warm sunset-over-the-ramp" — avoid pure black/white.
export const H = {
  paper: '#F5EFE2', // app background (warm cream)
  paperDp: '#EBE3D1', // cards / inset panels
  ink: '#1A1B3A', // primary text (deep indigo, not black)
  inkSoft: 'rgba(26,27,58,0.62)', // secondary text
  inkMute: 'rgba(26,27,58,0.36)', // tertiary / placeholder
  rule: 'rgba(26,27,58,0.14)', // borders
  ruleSoft: 'rgba(26,27,58,0.07)', // list dividers
  amber: '#E8843C', // primary accent (sunset orange) — CTAs
  amberDp: '#C8651E', // accent text / pressed
  dusk: '#D87A6B', // secondary accent
  sage: '#6B7F5F', // success / verified
  sky: '#5E7BA8', // event tone
  rust: '#9B3B26', // "full" / warning
  hi: '#FFF6E5', // text/icon on dark or accent fills
} as const;

export type HColor = keyof typeof H;

// ─── Font families ──────────────────────────────────────────────────────
// Loaded in theme/fonts.ts. Keep these keys in sync with the loaded faces.
export const fonts = {
  serif: 'Fraunces_500Medium', // display / titles / numbers
  serifItalic: 'Fraunces_500Medium_Italic',
  sans: 'Inter_400Regular', // body / UI
  sansMedium: 'Inter_500Medium',
  sansSemibold: 'Inter_600SemiBold',
  mono: 'JetBrainsMono_500Medium', // small all-caps labels / metadata
} as const;

// ─── Type scale (README §4 — `HText` in hobbs-ui.jsx) ─────────────────────
// React Native has no `lineHeight` multiplier, so they're computed as px.
export type TypeKind =
  | 'display'
  | 'title'
  | 'sub'
  | 'num'
  | 'body'
  | 'small'
  | 'mono';

export const type: Record<TypeKind, TextStyle> = {
  display: {
    fontFamily: fonts.serif,
    fontSize: 38,
    lineHeight: 38, // 1.0
    letterSpacing: -0.6,
  },
  title: {
    fontFamily: fonts.serif,
    fontSize: 26,
    lineHeight: 27, // ~1.05
    letterSpacing: -0.3,
  },
  sub: {
    fontFamily: fonts.serif,
    fontSize: 18,
    lineHeight: 22, // 1.2
  },
  num: {
    fontFamily: fonts.serif,
    fontSize: 26,
    lineHeight: 26, // 1.0 — stat numbers
  },
  body: {
    fontFamily: fonts.sans,
    fontSize: 14,
    lineHeight: 21, // 1.5
  },
  small: {
    fontFamily: fonts.sans,
    fontSize: 12,
    lineHeight: 17, // ~1.4
  },
  mono: {
    fontFamily: fonts.mono,
    fontSize: 10,
    lineHeight: 13, // 1.3
    letterSpacing: 1.2,
    textTransform: 'uppercase',
  },
};

// ─── Shape & spacing (README §4) ──────────────────────────────────────────
export const radii = {
  card: 14, // cards
  banner: 16, // large banners
  pill: 999, // chips / buttons — fully round
  date: 8, // date blocks
  panel: 10, // inset note panels
} as const;

export const spacing = {
  screenX: 18, // standard screen horizontal padding
  buttonH: 54, // primary button height
  tap: 44, // minimum tap target
} as const;

// Avatar gradient stops for a given hue (135deg).
export const avatarGradient = (hue: number): [string, string] => [
  `hsl(${hue}, 70%, 64%)`,
  `hsl(${(hue + 30) % 360}, 60%, 38%)`,
];
