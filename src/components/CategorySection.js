import React from 'react';
import { View, Text, Button } from 'react-native';
import TimerCard from './TimerCard';

export default function CategorySection({ category, timers, onStartAll, onPauseAll, onResetAll, onStart, onPause, onReset }) {
  return (
    <View>
      <Text style={{ fontSize: 20, fontWeight: 'bold' }}>{category}</Text>
      <View style={{ flexDirection: 'row', gap: 10 }}>
        <Button title="Start All" onPress={() => onStartAll(category)} />
        <Button title="Pause All" onPress={() => onPauseAll(category)} />
        <Button title="Reset All" onPress={() => onResetAll(category)} />
      </View>
      {timers.map(timer => (
        <TimerCard
          key={timer.id}
          timer={timer}
          onStart={onStart}
          onPause={onPause}
          onReset={onReset}
        />
      ))}
    </View>
  );
}
