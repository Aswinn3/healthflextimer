import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import ProgressBar from './ProgressBar';

export default function TimerCard({ timer, onStart, onPause, onReset }) {
  return (
    <View style={styles.card}>
      <Text style={styles.name}>{timer.name}</Text>
      <Text>Time Left: {timer.remaining}s</Text>
      <Text>Status: {timer.status}</Text>
      <ProgressBar progress={timer.remaining / timer.duration} />
      <View style={styles.controls}>
        <Button title="Start" onPress={() => onStart(timer)} />
        <Button title="Pause" onPress={() => onPause(timer)} />
        <Button title="Reset" onPress={() => onReset(timer)} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: { margin: 10, padding: 10, backgroundColor: '#eee', borderRadius: 8 },
  name: { fontSize: 18, fontWeight: 'bold' },
  controls: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 10 }
});
