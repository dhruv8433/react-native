import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

export type Todo = {
  id: string;
  text: string;
  description: string;
  tags: string[];
  date: string;
  completed: boolean;
};

type TodoItemProps = {
  item: Todo | undefined; // Ensure item is properly typed to handle undefined
  expanded: boolean;
  onPress: () => void;
  onMarkAsCompleted: () => void;
  isCompleted: boolean;
};

const colors: string[] = ['#FFCDD2', '#E1BEE7', '#C5CAE9', '#B3E5FC', '#C8E6C9', '#FFF9C4', '#FFE0B2', '#D7CCC8'];

const TodoItem: React.FC<TodoItemProps> = ({ item, expanded, onPress, onMarkAsCompleted, isCompleted }) => {
  const handlePress = () => {
    onPress();
  };

  // Check if item is undefined or null
  if (!item) {
    return null; // Or render a placeholder or empty view based on your UI requirements
  }

  return (
    <TouchableOpacity onPress={handlePress}>
      <View style={[styles.todoItem, { backgroundColor: colors[Math.floor(Math.random() * colors.length)] }]}>
        <View style={{ flex: 1 }}>
          <Text style={styles.todoText}>{item.text}</Text>
          {expanded && (
            <>
              <Text style={styles.todoDescription}>{item.description}</Text>
              <Text style={styles.todoDescription}>Date : {item.date}</Text>
            </>
          )}
        </View>
        {!isCompleted && (
          <TouchableOpacity onPress={() => onMarkAsCompleted()} style={styles.completedIcon}>
            <MaterialIcons name="done" size={24} color="white" />
          </TouchableOpacity>
        )}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  todoItem: {
    padding: 16,
    marginVertical: 8,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  todoText: {
    fontSize: 18,
    color: '#333',
  },
  todoDescription: {
    fontSize: 14,
    color: '#555',
    marginTop: 8,
  },
  completedIcon: {
    marginLeft: 16,
    backgroundColor: 'green',
    padding: 10,
    borderRadius: 10,
  },
});

export default TodoItem;
