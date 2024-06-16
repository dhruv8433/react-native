// TabTwoScreen.tsx
import React, { useState } from 'react';
import { StyleSheet, View, Platform, Image } from 'react-native';
import { TextInput, Button, Divider } from 'react-native-paper';
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
      completed: Boolean(false),
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
      <ThemedView style={styles.header}>
        <Image source={{ uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSv8a2YftkCyxt7LPQ2I-tc5tQgydVpHWsFPA&s" }} style={styles.logo} />
        <ThemedText type="title" style={styles.title}>Add Todo</ThemedText>
      </ThemedView>

      {/* Beautiful image of todos */}
      <View style={styles.imageContainer}>
        <Image source={{ uri: 'https://i.pinimg.com/564x/15/3a/06/153a0665b1a65e59cef51bb81b0ee662.jpg' }} style={styles.todosImage} />
      </View>

      <ThemedText style={styles.description}>
        Add your todos by simply filling out the form below. You can also add tags to categorize your todos.
      </ThemedText>

      <View style={{ paddingHorizontal: 20 }}>
        <Divider style={{ borderColor: "#000" }} />
      </View>

      <View style={styles.formContainer}>
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
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingTop: 40,
    paddingHorizontal: 16,
  },
  formContainer: {
    flex: 1,
    padding: 20
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
    paddingHorizontal: 15
  },
  todosImage: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
    borderRadius: 10,
  },
  input: {
    marginBottom: 10,
  },
  button: {
    marginTop: 10,
  },
  description: {
    fontSize: 16,
    marginTop: 20,
    marginBottom: 20,
    textAlign: 'center',
    paddingHorizontal: 16,
  },
});

export default TabTwoScreen;
