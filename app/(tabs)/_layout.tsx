// app/(tabs)/_layout.tsx — Hobbs bottom tabs: Feed · Find · Events · Messages · Logbook.

import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HTabBar from '@/components/hobbs/HTabBar';

import FeedScreen from './index';
import FindScreen from './find';
import EventsScreen from './events';
import MessagesScreen from './messages';
import LogbookScreen from './logbook';

const Tab = createBottomTabNavigator();

export default function TabLayout() {
  return (
    <Tab.Navigator
      screenOptions={{ headerShown: false, sceneStyle: { backgroundColor: '#F5EFE2' } }}
      tabBar={(props) => <HTabBar {...props} />}
    >
      <Tab.Screen name="index" component={FeedScreen} options={{ title: 'Feed' }} />
      <Tab.Screen name="find" component={FindScreen} options={{ title: 'Find' }} />
      <Tab.Screen name="events" component={EventsScreen} options={{ title: 'Events' }} />
      <Tab.Screen name="messages" component={MessagesScreen} options={{ title: 'Messages' }} />
      <Tab.Screen name="logbook" component={LogbookScreen} options={{ title: 'Logbook' }} />
    </Tab.Navigator>
  );
}
