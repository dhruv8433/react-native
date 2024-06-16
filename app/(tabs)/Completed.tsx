import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import TodoItem from "@/components/TodoItem";
import { RootState } from "@/hooks/types";
import { useState } from "react";
import { FlatList, Platform, StyleSheet, View } from "react-native";
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
            <View style={styles.formContainer}>
                <ThemedText type="title" style={styles.title}>Completed</ThemedText>
                <ThemedView style={styles.todoListContainer}>
                    <FlatList
                        data={completedTodos}
                        keyExtractor={item => item.id}
                        renderItem={({ item }) => (
                            <TodoItem
                                item={item}
                                expanded={expandedTodo === item.id}
                                onPress={() => handlePress(item.id)}
                                onMarkAsCompleted={() => ""}
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
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        marginBottom: 16,
        paddingTop: 40,
        paddingLeft: 20,
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
});
