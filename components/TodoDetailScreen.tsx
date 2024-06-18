import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ImageBackground, Image } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/hooks/reducers'; // Adjust the import path to your root reducer
import Icon from 'react-native-vector-icons/Ionicons'; // Example icon set, adjust as per your choice
import { deleteTodo } from '@/hooks/action';
import Toast from 'react-native-toast-message'; // Import react-native-toast-message


// Sample background image (replace with your own)
const backgroundImage = "https://i.pinimg.com/564x/16/f4/2f/16f42f6c6233620989df779a47be92f7.jpg";

const TodoDetailScreen = ({ route, navigation }) => {
    const { id } = route.params;
    const todo = useSelector((state: RootState) =>
        state.todos.find((todo) => todo.id === id)
    );

    const dispatch = useDispatch();

    if (!todo) {
        return (
            <View style={styles.container}>
                <ImageBackground source={{ uri: backgroundImage }} style={styles.backgroundImage}>
                    <Text style={styles.errorText}>Todo not found</Text>
                </ImageBackground>
            </View>
        );
    }

    const { text, description, date, tags, completed } = todo;

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-based
        const year = date.getFullYear();
        return `${day}/${month}/${year}`;
    };

    const handleEdit = () => {
        navigation.navigate('EditTodo', { id });
    };

    const handleDelete = async () => {
        try {
            dispatch(deleteTodo(id));
             await Toast.show({
                type: 'success',
                text1: "Todo deleted success",
                visibilityTime: 3000, // Toast duration
                autoHide: true,
            }); navigation.navigate('TodoList'); // Navigate back to TodoList after deletion
        } catch (error) {
            console.error("Error deleting todo:", error);
        }
    };

    const handleComplete = () => {
        // Implement complete/uncomplete logic using Redux action
        // Example:
        // dispatch(toggleCompleteAction(id));
    };

    return (
        <View style={styles.container}>
            <ImageBackground source={{ uri: backgroundImage }} style={styles.backgroundImage}>
                <View style={styles.contentContainer}>
                    <Text style={{ marginBottom: 40, marginTop: 30, fontSize: 30, color: "white", fontWeight: "bold", textAlign: 'center' }}>Your Todo</Text>
                    <View style={styles.imageContainer}>
                        <Image source={{ uri: 'https://i.pinimg.com/564x/a7/5f/02/a75f028d910bd6fd07926b011c8dc5b1.jpg' }} style={styles.todosImage} />
                    </View>

                    <Text style={styles.title}>Title : {text}</Text>
                    <Text style={styles.description}>Description : {description}</Text>
                    <Text style={styles.date}>Date: {formatDate(date)}</Text>
                    <Text style={styles.tags}>Tags: {tags.join(', ')}</Text>
                    <Text style={styles.completed}>Completed: {completed ? 'Yes' : 'No'}</Text>

                    <View style={styles.buttonContainer}>
                        <TouchableOpacity style={[styles.iconButton, styles.editButton]} onPress={handleEdit}>
                            <View style={styles.buttonContent}>
                                <Icon name="create-outline" size={24} color="white" />
                                <Text style={styles.buttonText}>Edit</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity style={[styles.iconButton, styles.deleteButton]} onPress={handleDelete}>
                            <View style={styles.buttonContent}>
                                <Icon name="trash-outline" size={24} color="white" />
                                <Text style={styles.buttonText}>Delete</Text>
                            </View>
                        </TouchableOpacity>
                        {!completed ? (
                            <TouchableOpacity style={[styles.iconButton, styles.completeButton]} onPress={handleComplete}>
                                <View style={styles.buttonContent}>
                                    <Icon name="checkmark-outline" size={24} color="white" />
                                    <Text style={styles.buttonText}>Completed</Text>
                                </View>
                            </TouchableOpacity>
                        ) : null}
                    </View>
                </View>
            </ImageBackground>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
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
    backgroundImage: {
        flex: 1,
        resizeMode: 'cover', // or 'stretch'
        justifyContent: 'center',
    },
    contentContainer: {
        flex: 1,
        padding: 20,
        backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent background to enhance readability
    },
    title: {
        marginTop: 20,
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
        color: 'white',
        marginLeft: 20
    },
    description: {
        fontSize: 16,
        marginBottom: 10,
        color: 'white',
        marginLeft: 20

    },
    date: {
        fontSize: 16,
        marginBottom: 10,
        color: 'white',
        marginLeft: 20

    },
    tags: {
        fontSize: 16,
        marginBottom: 10,
        color: 'white',
        marginLeft: 20

    },
    completed: {
        fontSize: 16,
        marginBottom: 10,
        marginLeft: 20,

        color: 'white',
    },
    errorText: {
        fontSize: 18,
        color: 'red',
        textAlign: 'center',
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: 30,
    },
    iconButton: {
        justifyContent: 'center',
        alignItems: 'center',
        width: 120,
        height: 80,
        borderRadius: 10,
        backgroundColor: 'rgba(255, 255, 255, 0.3)',
    },
    editButton: {
        backgroundColor: 'rgba(0, 123, 255, 0.6)',
    },
    deleteButton: {
        backgroundColor: 'rgba(255, 0, 0, 0.6)',
    },
    completeButton: {
        backgroundColor: 'rgba(0, 255, 0, 0.6)',
    },
    buttonContent: {
        alignItems: 'center',
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
        marginTop: 5,
        textAlign: 'center',
    },
});

export default TodoDetailScreen;
