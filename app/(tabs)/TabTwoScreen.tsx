import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Platform, Image, ScrollView, ImageBackground, Alert } from 'react-native';
import { TextInput, Button, Divider } from 'react-native-paper';
import { Picker } from '@react-native-picker/picker'; // Import Picker from @react-native-picker/picker
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
  const [category, setCategory] = useState<string>(''); // State for selected category

  const dispatch = useDispatch();

  useEffect(() => {
    // If there are existing tags, set the first tag as the default value
    if (selectedTags.length > 0) {
      setCategory(selectedTags[0]);
    }
  }, [selectedTags]);

  const handleAddTodo = () => {
    const newTodo: Todo = {
      id: String(Date.now()),
      text: newTodoText,
      description: newTodoDescription,
      tags: category ? [category] : [],
      date: new Date().toISOString(),
      completed: false,
    };

    dispatch(addTodo(newTodo));
    showAlert();
    setNewTodoText('');
    setNewTodoDescription('');
    setSelectedTags([]);
    setCategory(''); // Reset category
  };

  const showAlert = () => {
    Alert.alert(
      'Task Saved',
      'Your task has been saved successfully!',
      [{ text: 'OK', onPress: () => console.log('OK Pressed') }]
    );
  };

  const backgroundImage = "https://i.pinimg.com/564x/0d/46/5c/0d465c78df992a5acf02577d8892b9ff.jpg";

  return (
    <ImageBackground source={{ uri: backgroundImage }} style={styles.backgroundImage}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <ThemedView style={styles.container}>
          <ThemedView style={styles.header}>
            <Image source={{ uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSv8a2YftkCyxt7LPQ2I-tc5tQgydVpHWsFPA&s" }} style={styles.logo} />
            <ThemedText type="title" style={styles.title}>Add Todo</ThemedText>
          </ThemedView>

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

            <Picker
              selectedValue={category}
              style={styles.picker}
              onValueChange={(itemValue) => setCategory(itemValue)}
            >
              <Picker.Item label="Select category" value="" />
              <Picker.Item label="Design" value="design" />
              <Picker.Item label="Development" value="development" />
              <Picker.Item label="Coding" value="coding" />
              <Picker.Item label="Meeting" value="meeting" />
              <Picker.Item label="Office Time" value="office time" />
              <Picker.Item label="User Experience" value="user experience" />
            </Picker>

            <Button mode="contained" onPress={handleAddTodo} style={styles.button}>
              Add Todo
            </Button>
          </View>
        </ThemedView>
      </ScrollView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS === 'android' ? 25 : 0,
    paddingHorizontal: 16,
    backgroundColor: "transparent",
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
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
  input: {
    marginBottom: 10,
  },
  picker: {
    marginVertical: 10,
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
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
});

export default TabTwoScreen;
