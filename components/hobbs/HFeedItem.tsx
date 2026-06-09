// components/hobbs/HFeedItem.tsx — renders one feed entry (flight / milestone / event).
// Ported from prototype/hobbs-screens-feed.jsx.

import React from 'react';
import { View, Pressable } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { H, radii, fonts } from '@/theme/tokens';
import { FeedItem, H_PILOT } from '@/data/seed';
import HText from './HText';
import HIcon from './HIcon';
import HAvatar from './HAvatar';

// like / comment row
function Reactions({ likes, comments }: { likes: number; comments: number }) {
  return (
    <View style={{ marginTop: 8, flexDirection: 'row', alignItems: 'center', gap: 14 }}>
      <Pressable hitSlop={6} style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}>
        <HIcon name="heart" size={14} color={H.inkSoft} />
        <HText kind="small" color={H.inkSoft}>{String(likes)}</HText>
      </Pressable>
      <Pressable hitSlop={6} style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}>
        <HIcon name="msg" size={14} color={H.inkSoft} />
        <HText kind="small" color={H.inkSoft}>{String(comments)}</HText>
      </Pressable>
    </View>
  );
}

export default function HFeedItem({
  item,
  go,
  last,
}: {
  item: FeedItem;
  go: (route: string) => void;
  last?: boolean;
}) {
  const rowStyle = {
    paddingVertical: 14,
    borderBottomWidth: last ? 0 : 1,
    borderBottomColor: H.ruleSoft,
  };

  // ── Event ──
  if (item.kind === 'event') {
    return (
      <View style={rowStyle}>
        <Pressable onPress={() => go('event:e0')} style={{ flexDirection: 'row', gap: 12 }}>
          <View
            style={{
              width: 44, height: 44, borderRadius: 22, backgroundColor: H.ink,
              alignItems: 'center', justifyContent: 'center',
            }}
          >
            <HIcon name="cal" size={18} color={H.hi} />
          </View>
          <View style={{ flex: 1 }}>
            <HText kind="small" color={H.inkSoft}>{item.when} · Event</HText>
            <HText kind="sub" style={{ marginTop: 2 }}>{item.title}</HText>
            <HText kind="small" color={H.inkSoft} style={{ marginTop: 2 }}>
              {item.who} going · Hangar 4
            </HText>
          </View>
        </Pressable>
      </View>
    );
  }

  // ── Milestone ──
  if (item.kind === 'milestone') {
    const p = H_PILOT(item.pilot);
    return (
      <View style={rowStyle}>
        <View style={{ flexDirection: 'row', gap: 12 }}>
          <HAvatar pilot={p} size={44} />
          <View style={{ flex: 1 }}>
            <View style={{ flexDirection: 'row', alignItems: 'baseline', gap: 6 }}>
              <HText kind="small" style={{ fontFamily: fonts.sansSemibold }}>{p.name.split(' ')[0]}</HText>
              <HText kind="small" color={H.inkSoft}>· {item.when}</HText>
            </View>
            <LinearGradient
              colors={['rgba(232,132,60,0.16)', 'rgba(216,122,107,0.16)']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={{ marginTop: 6, paddingHorizontal: 14, paddingVertical: 12, borderRadius: radii.panel }}
            >
              <HText kind="mono" color={H.amberDp}>⭑ Milestone</HText>
              <HText kind="body" style={{ marginTop: 6 }}>{item.text}</HText>
            </LinearGradient>
            <Reactions likes={23} comments={4} />
          </View>
        </View>
      </View>
    );
  }

  // ── Flight ──
  const p = H_PILOT(item.pilot);
  const co = item.co ? H_PILOT(item.co) : null;
  return (
    <View style={rowStyle}>
      <View style={{ flexDirection: 'row', gap: 12 }}>
        <View style={{ width: 44, height: 44 }}>
          <HAvatar pilot={p} size={44} />
          {co && (
            <View style={{ position: 'absolute', right: -6, bottom: -4 }}>
              <HAvatar pilot={co} size={22} />
            </View>
          )}
        </View>
        <View style={{ flex: 1 }}>
          <View style={{ flexDirection: 'row', alignItems: 'baseline', gap: 6, flexWrap: 'wrap' }}>
            <HText kind="small">
              <HText kind="small" style={{ fontFamily: fonts.sansSemibold }}>{p.name.split(' ')[0]}</HText>
              {co && <HText kind="small" color={H.inkSoft}> with {co.name.split(' ')[0]}</HText>}
            </HText>
            <HText kind="small" color={H.inkSoft}>· {item.when}</HText>
          </View>

          {/* route panel */}
          <View
            style={{
              marginTop: 6, paddingHorizontal: 14, paddingVertical: 10,
              backgroundColor: H.paperDp, borderRadius: radii.panel,
            }}
          >
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
              <HText kind="sub">{item.from}</HText>
              <View style={{ flex: 1, height: 1, backgroundColor: H.rule, alignItems: 'center', justifyContent: 'center' }}>
                <View style={{ position: 'absolute' }}>
                  <HIcon name="plane-r" size={14} color={H.amberDp} fill />
                </View>
              </View>
              <HText kind="sub">{item.to || item.from}</HText>
            </View>
            <View style={{ marginTop: 8, flexDirection: 'row', gap: 14 }}>
              <HText kind="mono" color={H.inkSoft}>{item.hrs.toFixed(1)}h Hobbs</HText>
              {item.dist > 0 && <HText kind="mono" color={H.inkSoft}>{item.dist} nm</HText>}
            </View>
          </View>

          <HText kind="body" color={H.inkSoft} style={{ marginTop: 8 }}>{item.note}</HText>
          <Reactions likes={12} comments={2} />
        </View>
      </View>
    </View>
  );
}
