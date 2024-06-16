// HomeScreen.tsx

import React, { useState, useEffect } from 'react';
import { Image, StyleSheet, Platform, FlatList, TouchableOpacity } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useSelector, useDispatch } from 'react-redux';
import TodoItem from './TodoItem'; // Import your new component
import { markAsCompleted } from '@/hooks/action';
import { RootState } from '@/hooks/types';

export default function HomeScreen() {
  const [expandedTodo, setExpandedTodo] = useState<string | null>(null);
  const dispatch = useDispatch();
  const todos = useSelector((state: RootState) => state.todos.todos);
  const completedTodos = useSelector((state: RootState) => state.todos.completedTodos);

  const handlePress = (id: string) => {
    setExpandedTodo(expandedTodo === id ? null : id);
  };

  const handleMarkAsCompleted = (id: string) => {
    dispatch(markAsCompleted(id));
  };

  const handleMoveToCompleted = (id: string) => {
    dispatch(markAsCompleted(id));
  };

  useEffect(() => {
    console.log('Current todos:', todos);
    console.log('Completed todos:', completedTodos);
  }, [todos, completedTodos]);

  return (
    <ThemedView style={styles.container}>
      <ThemedView style={styles.header}>
        <Image source={require('@/assets/images/react-logo.png')} style={styles.logo} />
        <ThemedText type="title" style={styles.title}>
          My Todos
        </ThemedText>
      </ThemedView>
      <ThemedView style={styles.todoListContainer}>
        <FlatList
          data={todos}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <TodoItem
              item={item}
              expanded={expandedTodo === item.id}
              onPress={() => handlePress(item.id)}
              onMarkAsCompleted={() => handleMoveToCompleted(item.id)}
            />
          )}
        />
      </ThemedView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS === 'android' ? 25 : 0,
    paddingHorizontal: 16,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingTop: 40,
    paddingHorizontal: 16,
  },
  logo: {
    width: 50,
    height: 50,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
  },
  todoListContainer: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 20,
  },
});
