import { Tabs } from 'expo-router';
import React from 'react';
import { View, StyleSheet } from 'react-native';
import { TabBarIcon } from '@/components/navigation/TabBarIcon';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { Provider } from 'react-redux';
import persistStore from 'redux-persist/es/persistStore';
import store from '../store';
import { PersistGate } from 'redux-persist/integration/react';

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const persistor = persistStore(store);

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Tabs
          screenOptions={{
            tabBarShowLabel: false,
            tabBarActiveTintColor: '#000',
            tabBarInactiveTintColor: Colors[colorScheme ?? 'light'].tabIconDefault,
            tabBarStyle: {
              backgroundColor: '#E6E6FA', // Light purple background
              borderTopWidth: 0,
              shadowOpacity: 0.1,
              shadowRadius: 10,
              elevation: 5,
              height: 70,
              paddingBottom: 5,
            },
            headerShown: false,
          }}
        >
          <Tabs.Screen
            name="index"
            options={{
              tabBarIcon: ({ color, focused }) => (
                <TabBarIcon name={focused ? 'home' : 'home-outline'} color={color} size={32} />
              ),
            }}
          />
          <Tabs.Screen
            name="TabTwoScreen"
            options={{
              tabBarIcon: ({ color, focused }) => (
                <View style={styles.addButtonContainer}>
                  <View style={styles.addButton}>
                    <TabBarIcon name="add" color="#fff" size={50} />
                  </View>
                </View>
              ),
            }}
          />
          <Tabs.Screen
            name="Completed"
            options={{
              tabBarIcon: ({ color, focused }) => (
                <TabBarIcon name={focused ? 'checkmark-circle' : 'checkmark-circle-outline'} color={color} size={32} />
              ),
            }}
          />
        </Tabs>
      </PersistGate>
    </Provider>
  );
}

const styles = StyleSheet.create({
  addButtonContainer: {
    position: 'absolute',
    bottom: 25,
    width: 70,
    height: 70,
    borderRadius: 35,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
  },
  addButton: {
    width: 70,
    height: 70,
    borderRadius: 35,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'purple'
  },
});
