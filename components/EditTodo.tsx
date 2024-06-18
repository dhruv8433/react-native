import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Image, ScrollView, Platform } from 'react-native';
import { TextInput, Button, Divider } from 'react-native-paper';
import DropDownPicker from 'react-native-dropdown-picker';
import { useDispatch, useSelector } from 'react-redux';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { addTodo, updateTodo } from '@/hooks/action';
import { RootState } from '@/hooks/types';

const EditTodo = ({ route, navigation }) => {
    const { id } = route.params; // Get todo ID from navigation params
    const dispatch = useDispatch();
    const todos = useSelector((state: RootState) => state.todos);

    // State for form fields
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

    // Fetch todo details if editing existing todo
    useEffect(() => {
        if (id) {
            const todoToUpdate = todos.find(todo => todo.id === id);
            if (todoToUpdate) {
                setNewTodoText(todoToUpdate.text);
                setNewTodoDescription(todoToUpdate.description);
                setSelectedTags(todoToUpdate.tags);
                setTagsValue(null); // Reset tags selection
            }
        }
    }, [id, todos]);

    // Function to handle adding or updating a todo
    const handleAddOrUpdateTodo = () => {
        const todoToUpdate = todos.find(todo => todo.id === id);

        const updatedTodo = {
            id: id || String(Date.now()), // Generate new ID if adding new todo
            text: newTodoText,
            description: newTodoDescription,
            tags: selectedTags,
            date: todoToUpdate ? todoToUpdate.date : String(Date.now()),
            completed: todoToUpdate ? todoToUpdate.completed : false,
        };

        if (todoToUpdate) {
            // Update existing todo
            dispatch(updateTodo(updatedTodo));
        } else {
            // Add new todo
            dispatch(addTodo(updatedTodo));
        }

        // Reset form fields after adding or updating todo
        setNewTodoText('');
        setNewTodoDescription('');
        setSelectedTags([]);
        setTagsValue(null);

        // Navigate back to TodoList screen
        navigation.navigate('TodoList');
    };

    return (
        <ScrollView>
            <ThemedView style={styles.container}>
                <ThemedView style={styles.header}>
                    <Image
                        source={{
                            uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSv8a2YftkCyxt7LPQ2I-tc5tQgydVpHWsFPA&s',
                        }}
                        style={styles.logo}
                    />
                    <ThemedText type="title" style={styles.title}>
                        {id ? 'Update Todo' : 'Add Todo'}
                    </ThemedText>
                </ThemedView>

                {/* Beautiful image of todos */}
                <View style={styles.imageContainer}>
                    <Image
                        source={{ uri: 'https://i.pinimg.com/564x/15/3a/06/153a0665b1a65e59cef51bb81b0ee662.jpg' }}
                        style={styles.todosImage}
                    />
                </View>

                <View style={{ paddingHorizontal: 20 }}>
                    <Divider style={{ borderColor: '#000' }} />
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

                    <Button mode="contained" onPress={handleAddOrUpdateTodo} style={styles.button}>
                        {id ? 'Update Todo' : 'Add Todo'}
                    </Button>
                </View>
            </ThemedView>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: Platform.OS === 'android' ? 25 : 0,
        paddingHorizontal: 16,
        minHeight: '100vh',
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
        padding: 20,
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
    button: {
        marginTop: 10,
    },
});

export default EditTodo;
