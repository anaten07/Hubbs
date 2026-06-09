// components/hobbs/HAvatar.tsx — circular sunset-hue gradient avatar (README §4).

import React from 'react';
import { View, Text } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { H, fonts, avatarGradient } from '@/theme/tokens';
import type { Pilot } from '@/data/seed';

interface HAvatarProps {
  pilot: Pilot;
  size?: number;
}

export default function HAvatar({ pilot, size = 36 }: HAvatarProps) {
  const hue = pilot.hue ?? 28;
  return (
    <LinearGradient
      colors={avatarGradient(hue)}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={{
        width: size,
        height: size,
        borderRadius: size / 2,
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Text
        style={{
          color: H.paper,
          fontFamily: fonts.sansSemibold,
          fontSize: Math.round(size * 0.4),
          letterSpacing: 0.3,
        }}
      >
        {pilot.initials}
      </Text>
    </LinearGradient>
  );
}
