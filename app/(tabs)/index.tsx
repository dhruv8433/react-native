import React, { useState } from 'react';
import { Image, StyleSheet, Platform, FlatList, View, ScrollView, ImageBackground } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useSelector } from 'react-redux';
import TodoItem from '../../components/TodoItem'; // Import your new component
import { RootState } from '@/hooks/types';
import { Divider } from 'react-native-paper';

export default function HomeScreen() {
  const [expandedTodo, setExpandedTodo] = useState<string | null>(null);
  const todos = useSelector((state: RootState) => state.todos);

  const handlePress = (id: string) => {
    setExpandedTodo(expandedTodo === id ? null : id);
  };

  const backgroundImage = "https://i.pinimg.com/564x/70/3e/98/703e98add960eaf253746d771a98c367.jpg";

  return (
    <ImageBackground source={{ uri: backgroundImage }} style={styles.backgroundImage}>
      <ScrollView contentContainerStyle={styles.container}>
        {/* Header section */}
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

        {/* Description */}
        <ThemedText style={styles.description}>
          Welcome to My Todos app! This app helps you keep track of your tasks and organize your day efficiently.
        </ThemedText>

        {/* Divider */}
        <View style={styles.dividerContainer}>
          <Divider style={styles.divider} />
        </View>

        {/* Todo list */}
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
      </ScrollView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS === 'android' ? 25 : 0,
    paddingHorizontal: 16,
    backgroundColor: 'transparent', // Make sure background is transparent to show ImageBackground
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 40,
    paddingBottom: 20,
    paddingHorizontal: 16,
    backgroundColor: "transparent",
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover', // or 'stretch'
    justifyContent: 'center',
  },
  logo: {
    width: 30,
    height: 30,
    marginRight: 8,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
  },
  imageContainer: {
    alignItems: 'center',
    marginTop: 20,
  },
  todosImage: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
    borderRadius: 10,
  },
  description: {
    fontSize: 16,
    marginTop: 20,
    marginBottom: 20,
    textAlign: 'center',
  },
  dividerContainer: {
    paddingHorizontal: 20,
  },
  divider: {
    borderColor: '#000000', // Color of the divider
    borderWidth: 1,
  },
  todoListContainer: {
    flex: 1,
    marginTop: 20,
    backgroundColor: "transparent",
  },
});
