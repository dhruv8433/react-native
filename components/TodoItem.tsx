import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useDispatch } from 'react-redux';
import { markAsCompleted, deleteTodo } from '@/hooks/action';
import { Todo } from '@/hooks/types';

type TodoItemProps = {
  item: Todo;
  expanded: boolean;
  onPress: () => void;
  isCompleted: boolean;
};

const colors: string[] = ['#FFCDD2', '#E1BEE7', '#C5CAE9', '#B3E5FC', '#C8E6C9', '#FFF9C4', '#FFE0B2', '#D7CCC8'];

const TodoItem: React.FC<TodoItemProps> = ({ item, expanded, onPress, isCompleted }) => {
  const dispatch = useDispatch();

  const handleMoveToCompleted = () => {
    console.log('Move to completed:', item.id);
    dispatch(markAsCompleted(item.id));
    if (!isCompleted) {
      dispatch(deleteTodo(item.id)); 
    }
  };

  const handleDelete = () => {
    console.log('Delete todo:', item.id);
    dispatch(deleteTodo(item.id.toString())); // Ensure id is converted to string
  };

  if (!item) {
    return null;
  }

  const { text, description, date } = item;

  return (
    <TouchableOpacity onPress={onPress}>
      <View style={[styles.todoItem, { backgroundColor: colors[Math.floor(Math.random() * colors.length)], borderLeftWidth: 4 }]}>
        <View style={{ flex: 1 }}>
          <Text style={styles.todoText}>{text}</Text>
          {expanded && (
            <>
              <Text style={styles.todoDescription}>{description}</Text>
              <Text style={styles.todoDescription}>Date: {date}</Text>
            </>
          )}
        </View>
        <View style={styles.iconContainer}>
          {!isCompleted && (
            <TouchableOpacity onPress={handleMoveToCompleted} style={styles.completedIcon}>
              <MaterialIcons name="done" size={24} color="white" />
            </TouchableOpacity>
          )}
          {!isCompleted && 
          <TouchableOpacity onPress={handleDelete} style={styles.deleteIcon}>
            <MaterialIcons name="delete" size={24} color="white" />
          </TouchableOpacity>
          }
        </View>
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
  iconContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  completedIcon: {
    marginLeft: 16,
    backgroundColor: 'green',
    padding: 10,
    borderRadius: 10,
  },
  deleteIcon: {
    marginLeft: 16,
    backgroundColor: 'red',
    padding: 10,
    borderRadius: 10,
  },
});

export default TodoItem;
