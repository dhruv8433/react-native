import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Button, Alert } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const initialBoardState = [
  ['', '', ''],
  ['', '', ''],
  ['', '', '']
];

// home screen
const HomeScreen = () => {
  const [board, setBoard] = useState(initialBoardState);
  const [currentPlayer, setCurrentPlayer] = useState('X');
  const [gameMode, setGameMode] = useState(null); // 'single' for playing against the computer, 'multi' for two-player mode
  const [gameOver, setGameOver] = useState(false);

  const handlePress = (row, col) => {
    if (board[row][col] !== '' || gameOver) return;

    const updatedBoard = [...board];
    updatedBoard[row][col] = currentPlayer;
    setBoard(updatedBoard);

    const winner = checkWinner(updatedBoard);
    if (winner) {
      setGameOver(true);
      Alert.alert(`Player ${winner} wins!`);
    } else if (isBoardFull(updatedBoard)) {
      setGameOver(true);
      Alert.alert('It\'s a draw!');
    } else {
      const nextPlayer = currentPlayer === 'X' ? 'O' : 'X';
      setCurrentPlayer(nextPlayer);

      if (gameMode === 'single' && nextPlayer === 'O') {
        makeComputerMove(updatedBoard);
      }
    }
  };

  const isBoardFull = (board) => {
    return board.every(row => row.every(cell => cell !== ''));
  };

  const checkWinner = (board) => {
    for (let i = 0; i < 3; i++) {
      if (board[i][0] !== '' && board[i][0] === board[i][1] && board[i][1] === board[i][2]) {
        return board[i][0];
      }
      if (board[0][i] !== '' && board[0][i] === board[1][i] && board[1][i] === board[2][i]) {
        return board[0][i];
      }
    }
    if (board[0][0] !== '' && board[0][0] === board[1][1] && board[1][1] === board[2][2]) {
      return board[0][0];
    }
    if (board[0][2] !== '' && board[0][2] === board[1][1] && board[1][1] === board[2][0]) {
      return board[0][2];
    }
    return null;
  };

  const makeComputerMove = (board) => {
    let moveMade = false;
    while (!moveMade) {
      const row = Math.floor(Math.random() * 3);
      const col = Math.floor(Math.random() * 3);
      if (board[row][col] === '') {
        board[row][col] = 'O';
        moveMade = true;
      }
    }
    setBoard([...board]);

    const winner = checkWinner(board);
    if (winner) {
      setGameOver(true);
      Alert.alert(`Player ${winner} wins!`);
    } else if (isBoardFull(board)) {
      setGameOver(true);
      Alert.alert('It\'s a draw!');
    } else {
      setCurrentPlayer('X');
    }
  };

  const resetGame = () => {
    setBoard([
      ['', '', ''],
      ['', '', ''],
      ['', '', '']
    ]);
    setCurrentPlayer('X');
    setGameOver(false);
    setGameMode(null);
  };

  return (
    <LinearGradient
      colors={['#4c669f', '#3b5998', '#192f6a']}
      style={styles.container}
    >
      {gameMode === null ? (
        <View>
          <Text style={styles.title}>Tic Tac Toe</Text>
          <View style={styles.menu}>
            <TouchableOpacity style={styles.menuButton} onPress={() => setGameMode('single')}>
              <LinearGradient colors={['#FF8C00', '#FFA500']} style={styles.gradientButton}>
                <Text style={styles.buttonText}>Single Player</Text>
              </LinearGradient>
            </TouchableOpacity>
            <TouchableOpacity style={styles.menuButton} onPress={() => setGameMode('multi')}>
              <LinearGradient colors={['#FF8C00', '#FFA500']} style={styles.gradientButton}>
                <Text style={styles.buttonText}>Two Players</Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>
        </View>
      ) : (
        <>
          <Text style={styles.title}>Tic Tac Toe</Text>
          <Text style={styles.turnText}>Player {currentPlayer}'s Turn</Text>
          <Text style={styles.playerText}>Player 1 vs Player 2</Text>
          <View style={styles.board}>
            {board.map((row, rowIndex) => (
              <View key={rowIndex} style={styles.row}>
                {row.map((cell, colIndex) => (
                  <TouchableOpacity
                    key={colIndex}
                    style={styles.cell}
                    onPress={() => handlePress(rowIndex, colIndex)}
                  >
                    <Text style={styles.cellText}>{cell}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            ))}
          </View>
          <View style={styles.restart}>
            <TouchableOpacity style={styles.menuButton} onPress={resetGame} >
              <LinearGradient colors={['#FF8C00', '#FFA500']} style={styles.gradientButton}>
                <Text style={styles.buttonText}>Restart</Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>
        </>
      )}
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#ffffff'
  },
  turnText: {
    fontSize: 24,
    marginBottom: 10,
    color: '#ffffff'
  },
  playerText: {
    fontSize: 20,
    marginBottom: 20,
    color: '#ffffff'
  },
  board: {
    borderWidth: 3,
    borderColor: '#61DAFB',
  },
  row: {
    flexDirection: 'row'
  },
  cell: {
    width: 100,
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#61DAFB'
  },
  cellText: {
    fontSize: 36,
    color: '#61DAFB'
  },
  menu: {
    width: '100%',
    alignItems: 'center',
  },
  menuButton: {
    marginVertical: 10,
    width: '80%'
  },
  gradientButton: {
    paddingVertical: 15,
    paddingHorizontal: 25,
    borderRadius: 25,
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 20,
    color: '#ffffff',
    fontWeight: 'bold',
  },
  restart: {
    marginTop: 10
  }
});

export default HomeScreen;
