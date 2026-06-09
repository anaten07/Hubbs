// components/hobbs/HTabBar.tsx — bottom tab bar (README §5).
// Feed · Find · Events · Messages · Logbook. Active = amberDp, blurred cream bg.

import React from 'react';
import { Pressable } from 'react-native';
import { BlurView } from 'expo-blur';
import type { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { H, fonts } from '@/theme/tokens';
import HIcon, { HIconName } from './HIcon';
import HText from './HText';

const ICONS: Record<string, HIconName> = {
  index: 'home',
  find: 'compass',
  events: 'cal',
  messages: 'msg',
  logbook: 'book',
};

const LABELS: Record<string, string> = {
  index: 'Feed',
  find: 'Find',
  events: 'Events',
  messages: 'Messages',
  logbook: 'Logbook',
};

export default function HTabBar({ state, navigation }: BottomTabBarProps) {
  // The root SafeAreaView already applies the bottom inset, so a fixed pad here.
  return (
    <BlurView
      intensity={20}
      tint="light"
      style={{
        position: 'absolute', left: 0, right: 0, bottom: 0,
        paddingTop: 10,
        paddingBottom: 16,
        paddingHorizontal: 8,
        backgroundColor: 'rgba(245,239,226,0.92)',
        borderTopWidth: 1,
        borderTopColor: H.rule,
        flexDirection: 'row',
      }}
    >
      {state.routes.map((route, index) => {
        const focused = state.index === index;
        const color = focused ? H.amberDp : H.inkMute;
        const onPress = () => {
          const event = navigation.emit({ type: 'tabPress', target: route.key, canPreventDefault: true });
          if (!focused && !event.defaultPrevented) navigation.navigate(route.name);
        };
        return (
          <Pressable
            key={route.key}
            onPress={onPress}
            style={{ flex: 1, alignItems: 'center', gap: 4, paddingVertical: 8 }}
          >
            <HIcon name={ICONS[route.name] ?? 'home'} size={20} stroke={focused ? 2 : 1.6} color={color} />
            <HText
              style={{ fontFamily: focused ? fonts.sansSemibold : fonts.sansMedium, fontSize: 10, letterSpacing: 0.2 }}
              color={color}
            >
              {LABELS[route.name] ?? route.name}
            </HText>
          </Pressable>
        );
      })}
    </BlurView>
  );
}
