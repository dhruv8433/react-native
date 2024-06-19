import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import Svg, { Circle } from 'react-native-svg';

const HomeScreen: React.FC = () => {
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [time, setTime] = useState<number>(0);
  const [laps, setLaps] = useState<number[]>([]);

  useEffect(() => {
    let interval: NodeJS.Timeout | undefined;
    if (isRunning) {
      interval = setInterval(() => {
        setTime(prevTime => prevTime + 100);
      }, 1);
    } else if (!isRunning && time !== 0) {
      clearInterval(interval);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isRunning]);

  const handleStartStop = () => {
    if (isRunning) {
      setLaps([...laps, time]);
    }
    setIsRunning(!isRunning);
  };

  const handleReset = () => {
    setIsRunning(false);
    setTime(0);
    setLaps([]);
  };

  const formatTime = (time: number) => {
    const milliseconds = `00${time % 1000}`.slice(-3);
    const seconds = Math.floor(time / 1000);
    const getSeconds = `0${seconds % 60}`.slice(-2);
    const minutes = Math.floor(seconds / 60);
    const getMinutes = `0${minutes % 60}`.slice(-2);
    return `${getMinutes}:${getSeconds}.${milliseconds}`;
  };

  // Calculate the strokeDashoffset for the progress circle
  const progress = (time / 1000) % 60;
  const circumference = 2 * Math.PI * 140; // 140 is the radius of the circle
  const strokeDashoffset = circumference - (progress / 60) * circumference;

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Stopwatch</Text>
      <View style={styles.timeContainer}>
        <Svg height="300" width="300">
          <Circle
            cx="150"
            cy="150"
            r="140"
            stroke="#ffe0f0"
            strokeWidth="10"
            fill="none"
          />
          <Circle
            cx="150"
            cy="150"
            r="140"
            stroke="#880e4f"
            strokeWidth="10"
            fill="none"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
          />
        </Svg>
        <Text style={styles.time}>{formatTime(time)}</Text>
      </View>
      <View style={styles.buttonsContainer}>
        <TouchableOpacity style={styles.button} onPress={handleStartStop}>
          <Text style={styles.buttonText}>{isRunning ? "Pause" : "Play"}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={handleReset}>
          <Text style={styles.buttonText}>Reset</Text>
        </TouchableOpacity>
      </View>
      <ScrollView style={styles.lapsContainer}>
        {laps.map((lap, index) => (
          <View key={index} style={styles.lap}>
            <Text style={styles.lapText}>Lap {index + 1}</Text>
            <Text style={styles.lapText}>{formatTime(lap)}</Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fce4ec',
    padding: 20,
  },
  header: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 40,
    color: '#880e4f',
    marginTop: 50
  },
  timeContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 40,
  },
  time: {
    fontSize: 48,
    color: '#880e4f',
    position: 'absolute',
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '60%',
  },
  button: {
    backgroundColor: '#880e4f',
    padding: 15,
    borderRadius: 50,
    width: 100,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  lapsContainer: {
    width: '80%',
    marginTop: 20,
  },
  lap: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomColor: '#880e4f',
    borderBottomWidth: 1,
    paddingVertical: 10,
  },
  lapText: {
    fontSize: 18,
    color: '#880e4f',
  },
});

export default HomeScreen;
