// components/hobbs/HCover.tsx — stylized sunset "cover" placeholder (README §4).
// Sunset gradient + horizon line + soft sun + plane silhouette.
// Replace with real photography in production.

import React from 'react';
import { View, DimensionValue } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import HText from './HText';
import HIcon from './HIcon';
import type { CoverTone } from '@/data/seed';

const PALETTE: Record<CoverTone, [string, string]> = {
  amber: ['#E8843C', '#9B3B26'],
  sky: ['#5E7BA8', '#1A1B3A'],
  sage: ['#A8B898', '#4A5A3A'],
  dusk: ['#D87A6B', '#6B2A2A'],
};

interface HCoverProps {
  tone?: CoverTone;
  width?: DimensionValue;
  height?: number;
  label?: string;
}

export default function HCover({
  tone = 'amber',
  width = '100%',
  height = 80,
  label,
}: HCoverProps) {
  const palette = PALETTE[tone] ?? PALETTE.amber;
  return (
    <LinearGradient
      colors={palette}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={{ width, height, position: 'relative', overflow: 'hidden' }}
    >
      {/* horizon line */}
      <View
        style={{
          position: 'absolute', left: 0, right: 0, top: '62%',
          height: 1, backgroundColor: 'rgba(255,255,255,0.35)',
        }}
      />
      {/* soft sun */}
      <View
        style={{
          position: 'absolute', top: '38%', right: 20,
          width: 28, height: 28, borderRadius: 14,
          backgroundColor: 'rgba(255,238,200,0.75)',
        }}
      />
      {/* plane silhouette */}
      <View style={{ position: 'absolute', left: 18, bottom: 14 }}>
        <HIcon name="plane-r" size={36} color="rgba(26,27,58,0.5)" fill />
      </View>
      {label && (
        <View style={{ position: 'absolute', left: 12, bottom: 8 }}>
          <HText kind="mono" color="rgba(255,246,229,0.85)">
            {label}
          </HText>
        </View>
      )}
    </LinearGradient>
  );
}
