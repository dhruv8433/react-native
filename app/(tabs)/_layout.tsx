// TabLayout.js
import React from 'react';
import { View, StyleSheet } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from '../store'; // Ensure correct path

import { TabBarIcon } from '@/components/navigation/TabBarIcon';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';

import TabTwoScreen from './TabTwoScreen'; // Ensure correct path
import HomeScreen from '.';
import TodoDetailScreen from '@/components/TodoDetailScreen';
import Completed from './Completed';
import EditTodo from '@/components/EditTodo';
import Toast from 'react-native-toast-message';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const TodoStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="TodoList" component={HomeScreen} />
    <Stack.Screen name="TodoDetail" component={TodoDetailScreen} />
    <Stack.Screen name="EditTodo" component={EditTodo} />
  </Stack.Navigator>
);

const TabTwoStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="TabTwoScreen" component={TabTwoScreen} />
  </Stack.Navigator>
);

const CompletedStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="CompletedScreen" component={Completed} />
  </Stack.Navigator>
);


const TabLayout = () => {
  const colorScheme = useColorScheme();

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Tab.Navigator
          screenOptions={{
            tabBarShowLabel: false,
            tabBarActiveTintColor: '#000',
            tabBarInactiveTintColor: Colors[colorScheme ?? 'light'].tabIconDefault,
            tabBarStyle: {
              backgroundColor: '#E6E6FA',
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
          <Tab.Screen
            name="TodoStack"
            component={TodoStack}
            options={{
              tabBarIcon: ({ color, focused }) => (
                <TabBarIcon name={focused ? 'home' : 'home-outline'} color={color} size={32} />
              ),
            }}
          />
          <Tab.Screen
            name="TabTwoStack"
            component={TabTwoStack}
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
          <Tab.Screen
            name="CompletedStack"
            component={CompletedStack}
            options={{
              tabBarIcon: ({ color, focused }) => (
                <TabBarIcon name={focused ? 'checkmark-circle' : 'checkmark-circle-outline'} color={color} size={32} />
              ),
            }}
          />
        </Tab.Navigator>
      </PersistGate>
      <Toast ref={(ref) => Toast.setRef(ref)} />
    </Provider>
  );
};

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
    backgroundColor: 'purple',
  },
});

export default TabLayout;
