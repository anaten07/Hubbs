// app/(tabs)/index.tsx — Feed (home). README §5.1, ported from hobbs-screens-feed.jsx.

import React from 'react';
import { View, ScrollView, Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { H, radii, spacing, fonts } from '@/theme/tokens';
import { H_ME, H_INVITES, H_FEED, H_PILOT } from '@/data/seed';
import HText from '@/components/hobbs/HText';
import HIcon from '@/components/hobbs/HIcon';
import HAvatar from '@/components/hobbs/HAvatar';
import HFeedItem from '@/components/hobbs/HFeedItem';
import { HChip, HSectionTitle } from '@/components/hobbs/primitives';

// route name within the tab navigator for a given prototype `go` target
const TAB_ROUTES: Record<string, string> = {
  feed: 'index', find: 'find', events: 'events', msgs: 'messages', logbook: 'logbook',
};

export default function FeedScreen() {
  const navigation = useNavigation<any>();
  const go = (route: string) => {
    const tab = TAB_ROUTES[route];
    if (tab) navigation.navigate(tab);
    // invite:/event:/post/profile detail routes — wired as screens are built
  };

  return (
    <View style={{ flex: 1, backgroundColor: H.paper }}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 96 }}
      >
        {/* Brand bar */}
        <View
          style={{
            flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
            paddingHorizontal: spacing.screenX, paddingTop: 10, paddingBottom: 6,
          }}
        >
          <View style={{ flexDirection: 'row', alignItems: 'baseline', gap: 8 }}>
            <HText style={{ fontFamily: fonts.serif, fontSize: 28, letterSpacing: -0.4 }}>
              Hobbs<HText style={{ fontFamily: fonts.serifItalic, fontSize: 28 }} color={H.amberDp}>.</HText>
            </HText>
            <HText kind="mono" color={H.inkMute}>KDWH · 78° clear</HText>
          </View>
          <View style={{ flexDirection: 'row', gap: 6, alignItems: 'center' }}>
            <Pressable hitSlop={8} style={{ padding: 8 }}>
              <HIcon name="bell" size={20} />
              <View
                style={{
                  position: 'absolute', top: 6, right: 6, width: 7, height: 7,
                  borderRadius: 4, backgroundColor: H.amber,
                }}
              />
            </Pressable>
            <Pressable hitSlop={8} onPress={() => go('profile')} style={{ padding: 4 }}>
              <HAvatar pilot={H_ME} size={34} />
            </Pressable>
          </View>
        </View>

        {/* Hero */}
        <View style={{ paddingHorizontal: spacing.screenX, paddingTop: 14, paddingBottom: 6 }}>
          <HText kind="mono" color={H.amberDp}>Saturday at Hooks</HText>
          <View style={{ marginTop: 8 }}>
            <HText kind="display">A clear morning.{'\n'}
              <HText kind="display" italic color={H.amberDp}>Who's flying?</HText>
            </HText>
          </View>
          <HText kind="body" color={H.inkSoft} style={{ marginTop: 10 }}>
            4 open invites within 100 nm. Mara's heading to Galveston for breakfast.
          </HText>
        </View>

        {/* Quick actions */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{
            paddingHorizontal: spacing.screenX, paddingTop: 14, paddingBottom: 18, gap: 8,
          }}
        >
          <Pressable
            onPress={() => go('post')}
            style={{
              paddingHorizontal: 16, paddingVertical: 10, borderRadius: radii.pill,
              backgroundColor: H.ink, flexDirection: 'row', alignItems: 'center', gap: 6,
            }}
          >
            <HIcon name="plus" size={14} stroke={2.2} color={H.hi} />
            <HText style={{ fontFamily: fonts.sansSemibold, fontSize: 13 }} color={H.hi}>Post a flight</HText>
          </Pressable>
          <Pressable
            onPress={() => go('find')}
            style={{
              paddingHorizontal: 16, paddingVertical: 10, borderRadius: radii.pill,
              borderWidth: 1, borderColor: H.rule, flexDirection: 'row', alignItems: 'center', gap: 6,
            }}
          >
            <HIcon name="compass" size={14} />
            <HText style={{ fontFamily: fonts.sansSemibold, fontSize: 13 }}>Find a copilot</HText>
          </Pressable>
          <Pressable
            onPress={() => go('events')}
            style={{
              paddingHorizontal: 16, paddingVertical: 10, borderRadius: radii.pill,
              borderWidth: 1, borderColor: H.rule, justifyContent: 'center',
            }}
          >
            <HText style={{ fontFamily: fonts.sansSemibold, fontSize: 13 }}>Fly-ins</HText>
          </Pressable>
        </ScrollView>

        {/* Open invites strip */}
        <View style={{ marginBottom: 22 }}>
          <HSectionTitle action="See all" onAction={() => go('find')}>
            Open invites · within 100nm
          </HSectionTitle>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{
              paddingHorizontal: spacing.screenX, paddingTop: 10, paddingBottom: 4, gap: 12,
            }}
          >
            {H_INVITES.slice(0, 3).map((inv) => {
              const p = H_PILOT(inv.from);
              return (
                <Pressable
                  key={inv.id}
                  onPress={() => go('invite:' + inv.id)}
                  style={{ width: 230, backgroundColor: H.paperDp, borderRadius: radii.card, padding: 14 }}
                >
                  <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
                    <HAvatar pilot={p} size={26} />
                    <HText kind="small" color={H.inkSoft}>{p.name.split(' ')[0]} · {p.home}</HText>
                  </View>
                  <View style={{ marginTop: 10, flexDirection: 'row', alignItems: 'center', gap: 8 }}>
                    <HText kind="sub">{inv.fromAp}</HText>
                    <HIcon name="arrow-r" size={12} />
                    <HText kind="sub">{inv.toAp}</HText>
                  </View>
                  <HText kind="small" color={H.inkSoft} style={{ marginTop: 4 }}>{inv.leg}</HText>
                  <View style={{ marginTop: 12, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                    <HText kind="mono">{inv.when.split('·')[0].trim()}</HText>
                    <HChip tone="amber" solid label={`$${inv.cost} share`} />
                  </View>
                </Pressable>
              );
            })}
          </ScrollView>
        </View>

        {/* Activity */}
        <HSectionTitle>From your circle</HSectionTitle>
        <View style={{ marginTop: 10, paddingHorizontal: spacing.screenX }}>
          {H_FEED.map((f, i) => (
            <HFeedItem key={f.id} item={f} go={go} last={i === H_FEED.length - 1} />
          ))}
        </View>
      </ScrollView>
    </View>
  );
}
