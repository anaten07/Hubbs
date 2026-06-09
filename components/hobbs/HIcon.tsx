// components/hobbs/HIcon.tsx — the Hobbs stroke icon set (README §4).
// 24×24, 1.6 stroke, round caps. Ported 1:1 from prototype/hobbs-shared.jsx.

import React from 'react';
import Svg, { Path, Circle, Rect } from 'react-native-svg';
import { H } from '@/theme/tokens';

export type HIconName =
  | 'plane' | 'plane-r' | 'arrow-r' | 'arrow-l' | 'arrow-d' | 'arrow-u'
  | 'check' | 'plus' | 'x' | 'pin' | 'cal' | 'clock' | 'heart' | 'msg'
  | 'user' | 'users' | 'home' | 'book' | 'compass' | 'search' | 'filter'
  | 'bell' | 'shield' | 'star' | 'wing' | 'sun' | 'dots' | 'bolt' | 'lock';

interface HIconProps {
  name: HIconName;
  size?: number;
  stroke?: number;
  color?: string;
  fill?: boolean; // some glyphs (plane-r silhouette) render filled
}

export default function HIcon({
  name,
  size = 16,
  stroke = 1.6,
  color = H.ink,
  fill = false,
}: HIconProps) {
  const common = {
    stroke: fill ? 'none' : color,
    strokeWidth: stroke,
    strokeLinecap: 'round' as const,
    strokeLinejoin: 'round' as const,
    fill: fill ? color : 'none',
  };
  const svg = (children: React.ReactNode) => (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      {children}
    </Svg>
  );

  switch (name) {
    case 'plane':
      return svg(<>
        <Path {...common} d="M21 14l-9-3-9 3v-2l9-5V3a1.5 1.5 0 013 0v4l9 5v2z" />
        <Path {...common} d="M9 19l3-2 3 2v2H9z" />
      </>);
    case 'plane-r':
      return svg(<Path {...common} d="M2 16l20-6-7-3-4 2-5-1-2 1 3 2-3 2 3 1 4 2 0 3 2-1 9-2z" />);
    case 'arrow-r':
      return svg(<Path {...common} d="M5 12h14M13 6l6 6-6 6" />);
    case 'arrow-l':
      return svg(<Path {...common} d="M19 12H5M11 6l-6 6 6 6" />);
    case 'arrow-d':
      return svg(<Path {...common} d="M12 5v14M6 13l6 6 6-6" />);
    case 'arrow-u':
      return svg(<Path {...common} d="M12 19V5M6 11l6-6 6 6" />);
    case 'check':
      return svg(<Path {...common} d="M5 12l5 5 9-11" />);
    case 'plus':
      return svg(<Path {...common} d="M12 5v14M5 12h14" />);
    case 'x':
      return svg(<Path {...common} d="M6 6l12 12M18 6L6 18" />);
    case 'pin':
      return svg(<>
        <Path {...common} d="M12 21s-7-7-7-12a7 7 0 0114 0c0 5-7 12-7 12z" />
        <Circle {...common} cx="12" cy="9" r="2.5" />
      </>);
    case 'cal':
      return svg(<>
        <Rect {...common} x="3" y="5" width="18" height="16" rx="2" />
        <Path {...common} d="M8 3v4M16 3v4M3 10h18" />
      </>);
    case 'clock':
      return svg(<>
        <Circle {...common} cx="12" cy="12" r="9" />
        <Path {...common} d="M12 7v5l3 2" />
      </>);
    case 'heart':
      return svg(<Path {...common} d="M12 21s-7-4.5-9-9a5 5 0 019-3 5 5 0 019 3c-2 4.5-9 9-9 9z" />);
    case 'msg':
      return svg(<Path {...common} d="M21 12a8 8 0 01-11.5 7.2L4 21l1.8-5.5A8 8 0 1121 12z" />);
    case 'user':
      return svg(<>
        <Circle {...common} cx="12" cy="8" r="4" />
        <Path {...common} d="M4 21a8 8 0 0116 0" />
      </>);
    case 'users':
      return svg(<>
        <Circle {...common} cx="9" cy="8" r="3.5" />
        <Path {...common} d="M2 21a7 7 0 0114 0" />
        <Circle {...common} cx="17" cy="9" r="2.5" />
        <Path {...common} d="M16 21a5 5 0 016-4" />
      </>);
    case 'home':
      return svg(<Path {...common} d="M3 11l9-7 9 7v9a2 2 0 01-2 2h-4v-7H9v7H5a2 2 0 01-2-2z" />);
    case 'book':
      return svg(<>
        <Path {...common} d="M4 4h12a3 3 0 013 3v13H7a3 3 0 01-3-3z" />
        <Path {...common} d="M4 17a3 3 0 013-3h12" />
      </>);
    case 'compass':
      return svg(<>
        <Circle {...common} cx="12" cy="12" r="9" />
        <Path {...common} d="M15 9l-1.5 4.5L9 15l1.5-4.5z" />
      </>);
    case 'search':
      return svg(<>
        <Circle {...common} cx="11" cy="11" r="6.5" />
        <Path {...common} d="M20 20l-3.5-3.5" />
      </>);
    case 'filter':
      return svg(<Path {...common} d="M3 5h18l-7 9v6l-4-2v-4z" />);
    case 'bell':
      return svg(<>
        <Path {...common} d="M6 10a6 6 0 0112 0v4l2 3H4l2-3z" />
        <Path {...common} d="M10 20a2 2 0 004 0" />
      </>);
    case 'shield':
      return svg(<>
        <Path {...common} d="M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6l8-3z" />
        <Path {...common} d="M9 12l2 2 4-4" />
      </>);
    case 'star':
      return svg(<Path {...common} d="M12 3l2.7 5.6 6.3.9-4.5 4.4 1 6.1L12 17l-5.5 3 1-6.1L3 9.5l6.3-.9L12 3z" />);
    case 'wing':
      return svg(<Path {...common} d="M2 17c4-2 8-3 12-3l8-2-7 6-13 1z" />);
    case 'sun':
      return svg(<>
        <Circle {...common} cx="12" cy="12" r="4" />
        <Path {...common} d="M12 2v2M12 20v2M4 12H2M22 12h-2M5 5l1.5 1.5M17.5 17.5L19 19M5 19l1.5-1.5M17.5 6.5L19 5" />
      </>);
    case 'dots':
      return svg(<>
        <Circle {...common} cx="5" cy="12" r="1" />
        <Circle {...common} cx="12" cy="12" r="1" />
        <Circle {...common} cx="19" cy="12" r="1" />
      </>);
    case 'bolt':
      return svg(<Path {...common} d="M13 2L4 14h7l-1 8 9-12h-7l1-8z" />);
    case 'lock':
      return svg(<>
        <Rect {...common} x="5" y="11" width="14" height="10" rx="2" />
        <Path {...common} d="M8 11V8a4 4 0 018 0v3" />
      </>);
    default:
      return null;
  }
}
