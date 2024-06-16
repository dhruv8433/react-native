import { Tabs } from 'expo-router';
import React from 'react';
import { TabBarIcon } from '@/components/navigation/TabBarIcon';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { Provider } from 'react-redux';

import { PersistGate } from 'redux-persist/integration/react';
import persistStore from 'redux-persist/es/persistStore';
import store from '../store';

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const persistor = persistStore(store);

  return (
    <Provider store={store} >
      <PersistGate loading={null} persistor={persistor}>
        <Tabs
          screenOptions={{
            tabBarShowLabel: true,
            tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
            headerShown: false,
          }}>
          <Tabs.Screen
            name="index"
            options={{
              title: 'Home',
              tabBarIcon: ({ color, focused }) => (
                <TabBarIcon name={focused ? 'home' : 'home-outline'} color={color} />
              ),
            }}
          />
          <Tabs.Screen
            name="TabTwoScreen"
            options={{
              title: 'Add',
              tabBarIcon: ({ color, focused }) => (
                <TabBarIcon name={focused ? 'add-outline' : 'add-outline'} color={color} />
              ),
            }}
          />
          <Tabs.Screen
            name="Completed"
            options={{
              title: 'Completed',
              tabBarIcon: ({ color, focused }) => (
                <TabBarIcon name={focused ? 'checkmark-done-outline' : 'checkmark-done-sharp'} color={color} />
              ),
              }}
          />
        </Tabs>
      </PersistGate>
    </Provider>
  );
}
