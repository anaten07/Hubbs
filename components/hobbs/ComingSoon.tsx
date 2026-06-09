// components/hobbs/ComingSoon.tsx — styled placeholder for screens not yet built.

import React from 'react';
import { View } from 'react-native';
import { H, spacing } from '@/theme/tokens';
import HText from './HText';
import HIcon, { HIconName } from './HIcon';

export default function ComingSoon({
  icon,
  label,
  title,
  blurb,
}: {
  icon: HIconName;
  label: string;
  title: string;
  blurb: string;
}) {
  return (
    <View style={{ flex: 1, backgroundColor: H.paper }}>
      <View
        style={{
          flex: 1, alignItems: 'center', justifyContent: 'center',
          paddingHorizontal: spacing.screenX, paddingBottom: 90, gap: 12,
        }}
      >
        <View
          style={{
            width: 64, height: 64, borderRadius: 32, backgroundColor: H.paperDp,
            alignItems: 'center', justifyContent: 'center',
          }}
        >
          <HIcon name={icon} size={28} color={H.amberDp} />
        </View>
        <HText kind="mono" color={H.amberDp}>{label}</HText>
        <HText kind="title" style={{ textAlign: 'center' }}>{title}</HText>
        <HText kind="body" color={H.inkSoft} style={{ textAlign: 'center', maxWidth: 280 }}>
          {blurb}
        </HText>
      </View>
    </View>
  );
}
