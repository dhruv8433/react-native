import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import TodoItem from "@/components/TodoItem";
import { RootState } from "@/hooks/types";
import { useState } from "react";
import { FlatList, Image, Platform, StyleSheet, View } from "react-native";
import { Divider } from "react-native-paper";
import { useSelector } from "react-redux";

export default function Completed() {

    const [expandedTodo, setExpandedTodo] = useState<string | null>(null);

    const handlePress = (id: string) => {
        setExpandedTodo(expandedTodo === id ? null : id);
    };

    const completedTodos = useSelector((state: RootState) => state.todos.completedTodos);

    console.log("completed", completedTodos)
    return (
        <ThemedView style={styles.container}>
            <ThemedView style={styles.header}>
                <Image source={{ uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSv8a2YftkCyxt7LPQ2I-tc5tQgydVpHWsFPA&s" }} style={styles.logo} />
                <ThemedText type="title" style={styles.title}>
                    Completed
                </ThemedText>
            </ThemedView>

            {/* Beautiful image of todos */}
            <View style={styles.imageContainer}>
                <Image source={{ uri: 'https://i.pinimg.com/564x/ee/2d/b4/ee2db4e6b1b3ca277bc96f2e1b20367a.jpg' }} style={styles.todosImage} />
            </View>

            <ThemedText style={styles.description}>
                Your completed tasks are listed below. Keep up the good work! 🚀
            </ThemedText>

            <View style={{ paddingHorizontal: 20 }}>
                <Divider style={{ borderColor: "#000" }} />
            </View>

            <View style={styles.formContainer}>
                <ThemedView style={styles.todoListContainer}>
                    <FlatList
                        data={completedTodos}
                        keyExtractor={item => item.id}
                        renderItem={({ item }) => (
                            <TodoItem
                                item={item}
                                expanded={expandedTodo === item.id}
                                onPress={() => handlePress(item.id)}
                                isCompleted={true}
                            />
                        )}
                    />
                </ThemedView>
            </View>
        </ThemedView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 25,
        paddingHorizontal: 16,
    },
    formContainer: {
        flex: 1,
    },
    input: {
        marginBottom: 10,
    },
    button: {
        marginTop: 10,
    },
    todoListContainer: {
        flex: 1,
        paddingHorizontal: 16,
        paddingTop: 20,
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
        paddingHorizontal: 15
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
        paddingHorizontal: 16,
    },
});
