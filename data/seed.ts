// data/seed.ts — Hobbs seed data + types.
// Ported 1:1 from prototype/hobbs-shared.jsx (README §3). Field names map
// directly to the eventual DB schema so screens can swap to live data later.

export interface Pilot {
  id: string;
  name: string;
  handle: string;
  home: string; // home airport ICAO, e.g. KDWH
  city: string;
  initials: string; // avatar fallback
  hue: number; // 0–360, drives the avatar gradient
  hours: number; // total flight time
  since?: number; // year started (me only)
  certs: string[];
  ratings: string[];
  current?: string[]; // aircraft currency
  workingOn: string; // rating in progress
  goal?: { label: string; target: number };
  medical?: string;
  bio: string;
  badges?: string[];
}

export const H_ME: Pilot = {
  id: 'me',
  name: 'Jordan Larkin',
  handle: '@jordan.flies',
  home: 'KDWH',
  city: 'Houston',
  initials: 'JL',
  hue: 28,
  hours: 184.6,
  since: 2023,
  certs: ['Sport', 'Private (ASEL)'],
  ratings: ['HP'],
  current: ['172', 'PA-28'],
  workingOn: 'Instrument',
  goal: { label: 'Commercial', target: 250 },
  medical: '3rd class · valid Mar 2028',
  bio: 'Time-building toward CFI. Love early-morning $100 hamburgers and unhurried sectional planning.',
};

export const H_PILOTS: Pilot[] = [
  {
    id: 'mara', name: 'Mara Chen', handle: '@marachen', home: 'KSGR', city: 'Sugar Land', initials: 'MC', hue: 350,
    hours: 1240, certs: ['Commercial', 'CFI'], ratings: ['IR', 'ME', 'HP'], workingOn: 'CFII',
    bio: 'CFI at Sugar Land. Always down for a long XC. Happy to safety-pilot for hood time.',
    badges: ['CFI', 'IFR-current'],
  },
  {
    id: 'devon', name: 'Devon Park', handle: '@devon.sport', home: 'KIWS', city: 'West Houston', initials: 'DP', hue: 200,
    hours: 78, certs: ['Sport'], ratings: [], workingOn: 'Private',
    bio: 'Sport pilot on a Champ. Grass strips & pancake breakfasts only.',
    badges: ['Tailwheel'],
  },
  {
    id: 'rae', name: 'Rae Solano', handle: '@rae.flies.ifr', home: 'KHOU', city: 'Houston', initials: 'RS', hue: 285,
    hours: 412, certs: ['Private'], ratings: ['IR'], workingOn: 'Commercial',
    bio: 'Splitting Hobbs in a Cirrus SR20. Building XC for Commercial.',
    badges: ['IFR-current'],
  },
  {
    id: 'tomas', name: 'Tomás Reyes', handle: '@hangar.tomas', home: 'KDWH', city: 'Tomball', initials: 'TR', hue: 145,
    hours: 96, certs: ['Private'], ratings: [], workingOn: 'IR',
    bio: 'New PPL. Looking for IFR-rated safety pilots and Wednesday hangar nights.',
    badges: [],
  },
  {
    id: 'pris', name: 'Priya Kothari', handle: '@priya.aviates', home: 'KCXO', city: 'Conroe', initials: 'PK', hue: 12,
    hours: 2840, certs: ['ATP', 'CFI', 'CFII', 'MEI'], ratings: ['IR', 'ME', 'HP', 'TW'], workingOn: 'Seaplane',
    bio: "Regional FO. Free for weekend CFI sessions when I'm not on a 4-day.",
    badges: ['ATP', 'CFI', 'MEI'],
  },
];

export const H_PILOT = (id: string): Pilot =>
  H_PILOTS.find((p) => p.id === id) || H_ME;

// ─── Invites (flight-share board) ─────────────────────────────────────────
export interface Invite {
  id: string;
  from: string; // pilotId
  when: string;
  fromAp: string;
  toAp: string;
  leg: string;
  dist: number; // nm
  plane: string;
  cost: number; // USD
  split: string;
  purpose: string;
  seats: { taken: number; total: number };
  note: string;
}

export const H_INVITES: Invite[] = [
  {
    id: 'i1', from: 'mara', when: 'Sat · Jun 14 · 07:30',
    fromAp: 'KSGR', toAp: 'KGLS', leg: 'Galveston breakfast', dist: 51,
    plane: 'Cessna 172N · N4523S', cost: 95, split: 'Pro-rata Hobbs',
    purpose: '$100 hamburger', seats: { taken: 0, total: 1 },
    note: 'You fly outbound, I fly back. PPL or Sport welcome.',
  },
  {
    id: 'i2', from: 'rae', when: 'Sun · Jun 15 · 14:00',
    fromAp: 'KHOU', toAp: 'KCLL', leg: 'XC to College Station', dist: 79,
    plane: 'Cirrus SR20 · N919RS', cost: 140, split: '50 / 50',
    purpose: 'Cross-country time', seats: { taken: 1, total: 1 },
    note: 'Building Commercial XC. IFR if practical.',
  },
  {
    id: 'i3', from: 'tomas', when: 'Wed · Jun 11 · 18:30',
    fromAp: 'KDWH', toAp: '—', leg: 'IFR hood swap (local)', dist: 0,
    plane: 'Piper Archer · N2189F', cost: 70, split: 'Pro-rata',
    purpose: 'Safety-pilot swap', seats: { taken: 0, total: 1 },
    note: 'Need an IFR-current safety pilot. Will return the favor.',
  },
  {
    id: 'i4', from: 'devon', when: 'Sat · Jun 14 · 09:00',
    fromAp: 'KIWS', toAp: 'T78', leg: 'Brenham grass strip', dist: 48,
    plane: 'Aeronca Champ · N84321', cost: 60, split: 'Even',
    purpose: 'Sport-pilot fly-out', seats: { taken: 0, total: 1 },
    note: 'No-radio, no-electrical. Bring sunscreen.',
  },
];

// ─── Feed activity ────────────────────────────────────────────────────────
export type FeedItem =
  | {
      id: string; kind: 'flight'; pilot: string; co: string | null;
      when: string; from: string; to: string; dist: number; hrs: number; note: string;
    }
  | { id: string; kind: 'milestone'; pilot: string; when: string; text: string }
  | { id: string; kind: 'event'; when: string; title: string; who: number };

export const H_FEED: FeedItem[] = [
  {
    id: 'f1', kind: 'flight', pilot: 'mara', co: 'rae',
    when: '2h', from: 'KSGR', to: 'KAUS', dist: 145, hrs: 1.2,
    note: 'Smooth tailwind out, headwind home. Rae shot the approach back in.',
  },
  { id: 'f2', kind: 'milestone', pilot: 'tomas', when: '6h', text: 'Logged 100 hours total time today. PPL → IR begins.' },
  { id: 'f3', kind: 'event', when: '1d', title: 'KDWH hangar night', who: 12 },
  {
    id: 'f4', kind: 'flight', pilot: 'pris', co: null,
    when: '1d', from: 'KCXO', to: 'KCXO', dist: 0, hrs: 1.4,
    note: 'CFI lesson with a student — slow flight & stalls. Bumpy as usual.',
  },
  { id: 'f5', kind: 'milestone', pilot: 'devon', when: '2d', text: 'First grass-strip landing at T78. Champ behaved.' },
];

// ─── Events / fly-ins / conferences ──────────────────────────────────────
export type CoverTone = 'amber' | 'sky' | 'sage' | 'dusk';

export interface HEvent {
  id: string;
  title: string;
  where: string; // airport
  city: string;
  when: string;
  time: string;
  kind: string;
  going: number;
  cap: number | null;
  cover: CoverTone;
  distance: string;
}

export const H_EVENTS: HEvent[] = [
  { id: 'e0', title: 'KDWH Hangar Night', where: 'Hooks · Hangar 4', city: 'Tomball, TX', when: 'Wed · Jun 11', time: '18:30', kind: 'Hangar night', going: 12, cap: 30, cover: 'sky', distance: '— at your home field' },
  { id: 'e1', title: 'EAA AirVenture Oshkosh', where: 'KOSH', city: 'Oshkosh, WI', when: 'Jul 21–27', time: 'all week', kind: 'Conference · The Big One', going: 412, cap: null, cover: 'amber', distance: '1,043 nm' },
  { id: 'e2', title: "Sun 'n Fun Aerospace Expo", where: 'KLAL', city: 'Lakeland, FL', when: 'Apr 7–12 · 2027', time: 'all week', kind: 'Conference', going: 188, cap: null, cover: 'dusk', distance: '770 nm' },
  { id: 'e3', title: 'Sport Pilot Pancake Fly-in', where: 'T78', city: 'Brenham, TX', when: 'Sat · Jun 14', time: '08:00', kind: 'Fly-in', going: 28, cap: 60, cover: 'sage', distance: '48 nm' },
  { id: 'e4', title: 'Wings Over Houston Air Show', where: 'KEFD', city: 'Ellington, TX', when: 'Oct 18–19', time: 'all weekend', kind: 'Air show', going: 64, cap: null, cover: 'amber', distance: '36 nm' },
  { id: 'e5', title: 'AOPA Buckeye Fly-in', where: 'KMGY', city: 'Dayton, OH', when: 'Sep 27', time: 'all day', kind: 'Fly-in', going: 41, cap: null, cover: 'sky', distance: '900 nm' },
];

// ─── Messages ─────────────────────────────────────────────────────────────
export interface Thread {
  id: string;
  pilot: string; // pilotId
  last: string;
  when: string;
  unread: number;
}

export const H_THREADS: Thread[] = [
  { id: 't1', pilot: 'mara', last: 'See you at the FBO at 07:15 — coffee is on me.', when: '11m', unread: 2 },
  { id: 't2', pilot: 'tomas', last: 'Wed hangar night — bringing pretzels.', when: '2h', unread: 0 },
  { id: 't3', pilot: 'rae', last: 'Next weekend XC still on?', when: '1d', unread: 0 },
  { id: 't4', pilot: 'pris', last: 'I can do a checkride prep Saturday afternoon.', when: '3d', unread: 0 },
];

// ─── Logbook entries ──────────────────────────────────────────────────────
export interface LogEntry {
  id: string;
  date: string;
  tail: string;
  type: string;
  from: string;
  to: string;
  dur: number; // h
  ldg: number;
  night: number;
  ldg_night?: number;
  ifr: number;
  co: string | null; // pilotId
  note: string;
}

export const H_LOG: LogEntry[] = [
  { id: 'l1', date: 'Jun 07', tail: 'N4523S', type: '172', from: 'KDWH', to: 'KHOU', dur: 1.4, ldg: 2, night: 0, ifr: 0, co: null, note: 'Solo proficiency. Bravo entry practice.' },
  { id: 'l2', date: 'Jun 02', tail: 'N919RS', type: 'SR20', from: 'KDWH', to: 'KAUS', dur: 1.6, ldg: 1, night: 0, ifr: 0.4, co: 'rae', note: 'Split with Rae · she flew back.' },
  { id: 'l3', date: 'May 28', tail: 'N2189F', type: 'PA-28', from: 'KDWH', to: 'KDWH', dur: 1.1, ldg: 6, night: 0, ifr: 0, co: 'tomas', note: 'Pattern work.' },
  { id: 'l4', date: 'May 24', tail: 'N4523S', type: '172', from: 'KDWH', to: 'KGLS', dur: 1.3, ldg: 1, night: 0, ifr: 0, co: 'mara', note: 'Galveston breakfast with Mara.' },
  { id: 'l5', date: 'May 18', tail: 'N4523S', type: '172', from: 'KDWH', to: 'KDWH', dur: 1.0, ldg: 8, night: 0.4, ldg_night: 3, ifr: 0, co: null, note: 'Night currency.' },
];
