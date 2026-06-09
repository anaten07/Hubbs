// components/hobbs/HText.tsx — typographic primitive (README §4 type scale).

import React from 'react';
import { Text, TextProps, TextStyle, StyleProp } from 'react-native';
import { H, type as typeScale, TypeKind, fonts } from '@/theme/tokens';

interface HTextProps extends TextProps {
  kind?: TypeKind;
  color?: string;
  italic?: boolean;
  style?: StyleProp<TextStyle>;
}

const SERIF_KINDS: TypeKind[] = ['display', 'title', 'sub', 'num'];

export default function HText({
  kind = 'body',
  color,
  italic,
  style,
  children,
  ...rest
}: HTextProps) {
  const base = typeScale[kind];
  const italicStyle: TextStyle = italic
    ? SERIF_KINDS.includes(kind)
      ? { fontFamily: fonts.serifItalic }
      : { fontStyle: 'italic' }
    : {};

  return (
    <Text
      {...rest}
      style={[base, { color: color || H.ink }, italicStyle, style]}
    >
      {children}
    </Text>
  );
}
