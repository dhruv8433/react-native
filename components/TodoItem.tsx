import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useDispatch } from 'react-redux';
import { markAsCompleted, deleteTodo } from '@/hooks/action';
import { useNavigation } from '@react-navigation/native';
import { Todo } from '@/hooks/types';
import Toast from 'react-native-toast-message';

type TodoItemProps = {
  item: Todo;
  expanded: boolean;
  onPress: () => void;
  isCompleted: boolean;
};

const colors: string[] = ['#FFCDD2', '#E1BEE7', '#C5CAE9', '#B3E5FC', '#C8E6C9', '#FFF9C4', '#FFE0B2', '#D7CCC8'];

const TodoItem: React.FC<TodoItemProps> = ({ item, expanded, onPress, isCompleted }) => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const handleMoveToCompleted = () => {
    console.log('Move to completed:', item.id);
    dispatch(markAsCompleted(item.id));
    if (!isCompleted) {
      dispatch(deleteTodo(item.id));
      Toast.show({
        type: 'success',
        text1: 'Todo completed',
        visibilityTime: 3000,
        autoHide: true,

      })
    }
  };

  const handleDelete = () => {
    console.log('Delete todo:', item.id);
    dispatch(deleteTodo(item.id.toString()));
    Toast.show({
      type: 'success',
      text1: 'Todo Deleted Success',
      visibilityTime: 3000,
      autoHide: true,
    })
  };


  if (!item) {
    return null;
  }

  const { text, description, date } = item;

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-based
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  const handlePress = () => {
    navigation.navigate('TodoDetail', { id: item.id, completedTodo: item.completed }); // Corrected navigation parameter
  };

  return (
    <TouchableOpacity onPress={handlePress}>
      <View style={[styles.todoItem, { backgroundColor: colors[Math.floor(Math.random() * colors.length)], borderLeftWidth: 4 }]}>
        <View style={{ flex: 1 }}>
          <Text style={styles.todoText}>{text}</Text>
          {expanded && (
            <>
              <Text style={styles.todoDescription}>{description}</Text>
              <Text style={styles.todoDescription}>Date: {formatDate(date)}</Text>
            </>
          )}
        </View>
        <View style={styles.iconContainer}>
          {!isCompleted && (
            <TouchableOpacity onPress={handleMoveToCompleted} style={styles.completedIcon}>
              <MaterialIcons name="done" size={24} color="white" />
            </TouchableOpacity>
          )}
          {!isCompleted && (
            <TouchableOpacity onPress={handleDelete} style={styles.deleteIcon}>
              <MaterialIcons name="delete" size={24} color="white" />
            </TouchableOpacity>
          )}
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
