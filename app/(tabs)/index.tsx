// HomeScreen.tsx
import React, { useState, useEffect } from 'react';
import { Image, StyleSheet, Platform, FlatList, View, ScrollView } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useSelector } from 'react-redux';
import TodoItem from '../../components/TodoItem'; // Import your new component
import { RootState } from '@/hooks/types';
import { Divider } from 'react-native-paper';

export default function HomeScreen() {
  const [expandedTodo, setExpandedTodo] = useState<string | null>(null);

  // Detailed logging
  const todos = useSelector((state: RootState) => {
    console.log("useSelector state:", state);
    return state.todos;

  });

  // Logging after extraction
  useEffect(() => {
    console.log("Extracted todos:", todos);
  }, [todos]);

  const handlePress = (id: string) => {
    setExpandedTodo(expandedTodo === id ? null : id);
  };

  return (
    <ScrollView>
      <ThemedView style={styles.container}>
        <ThemedView style={styles.header}>
          <Image source={{ uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSv8a2YftkCyxt7LPQ2I-tc5tQgydVpHWsFPA&s" }} style={styles.logo} />
          <ThemedText type="title" style={styles.title}>
            My Todos
          </ThemedText>
        </ThemedView>

        {/* Beautiful image of todos */}
        <View style={styles.imageContainer}>
          <Image source={{ uri: 'https://i.pinimg.com/564x/a7/5f/02/a75f028d910bd6fd07926b011c8dc5b1.jpg' }} style={styles.todosImage} />
        </View>

        <ThemedText style={styles.description}>
          Welcome to My Todos app! This app helps you keep track of your tasks and organize your day efficiently.
        </ThemedText>

        <View style={{ paddingHorizontal: 20 }}>
          <Divider style={{ borderColor: "#000" }} />
        </View>

        <ThemedView style={styles.todoListContainer}>
          <FlatList
            data={todos}
            keyExtractor={item => item.id}
            renderItem={({ item }) => (
              <TodoItem
                item={item}
                expanded={expandedTodo === item.id}
                onPress={() => handlePress(item.id)}
                isCompleted={false}
              />
            )}
          />
        </ThemedView>
      </ThemedView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS === 'android' ? 25 : 0,
    paddingHorizontal: 16,
    minHeight: "100vh"
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingTop: 40,
    paddingHorizontal: 16,
  },
  logo: {
    width: 30,
    height: 30,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
  },
  imageContainer: {
    alignItems: 'center',
    marginTop: 20,
    paddingHorizontal: 15,
  },
  todosImage: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
    borderRadius: 10,
  },
  todoListContainer: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 20,
  },
  description: {
    fontSize: 16,
    marginTop: 20,
    marginBottom: 20,
    textAlign: 'center',
    paddingHorizontal: 16,
  },
});
