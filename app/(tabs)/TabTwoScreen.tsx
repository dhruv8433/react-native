// TabTwoScreen.tsx
import React, { useState } from 'react';
import { StyleSheet, View, Platform } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import DropDownPicker from 'react-native-dropdown-picker';
import { useDispatch } from 'react-redux';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { addTodo } from '@/hooks/action';

type Todo = {
  id: string;
  text: string;
  description: string;
  tags: string[];
  date: string;
  completed: boolean;
};

const TabTwoScreen = () => {
  const [newTodoText, setNewTodoText] = useState<string>('');
  const [newTodoDescription, setNewTodoDescription] = useState<string>('');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [tagsOpen, setTagsOpen] = useState<boolean>(false);
  const [tagsValue, setTagsValue] = useState<string | null>(null);
  const [tagsItems, setTagsItems] = useState<{ label: string; value: string }[]>([
    { label: 'Work', value: 'work' },
    { label: 'Personal', value: 'personal' },
    { label: 'Shopping', value: 'shopping' },
    { label: 'Study', value: 'study' },
  ]);

  const dispatch = useDispatch();

  const handleAddTodo = () => {
    // Create new todo object
    const newTodo: Todo = {
      id: String(Date.now()), // Generate unique ID (timestamp)
      text: newTodoText,
      description: newTodoDescription,
      tags: selectedTags,
      date: String(Date.now()),
    };

    // Dispatch action to add todo to Redux store
    dispatch(addTodo(newTodo));

    // Reset form fields after adding todo
    setNewTodoText('');
    setNewTodoDescription('');
    setSelectedTags([]);

    // Optionally, navigate to another screen or update state to reflect the change
  };

  return (
    <ThemedView style={styles.container}>
      <View style={styles.formContainer}>
        <ThemedText type="title" style={styles.title}>Add Todo</ThemedText>

        <TextInput
          label="Todo Text"
          value={newTodoText}
          onChangeText={(text) => setNewTodoText(text)}
          style={styles.input}
        />

        <TextInput
          label="Description"
          value={newTodoDescription}
          onChangeText={(text) => setNewTodoDescription(text)}
          multiline
          numberOfLines={4}
          style={styles.input}
        />

        <DropDownPicker
          open={tagsOpen}
          value={tagsValue}
          items={tagsItems}
          setOpen={setTagsOpen}
          setValue={setTagsValue}
          setItems={setTagsItems}
          placeholder="Select Tags"
          multiple
          min={0}
          max={tagsItems.length}
          style={styles.input}
          containerStyle={{ marginTop: 10 }}
        />

        <Button mode="contained" onPress={handleAddTodo} style={styles.button}>
          Add Todo
        </Button>
      </View>
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS === 'android' ? 25 : 0,
    paddingHorizontal: 16,
  },
  formContainer: {
    flex: 1,
    padding: 20
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 16,
    paddingTop: 40,
    paddingLeft: 10,
    paddingBottom: 10,
  },
  input: {
    marginBottom: 10,
  },
  button: {
    marginTop: 10,
  },
});

export default TabTwoScreen;
