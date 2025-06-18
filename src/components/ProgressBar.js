import React from 'react';
import { View, StyleSheet } from 'react-native';

export default function ProgressBar({ progress }) {
  return (
    <View style={styles.container}>
      <View style={[styles.bar, { width: `${progress * 100}%` }]} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 10,
    backgroundColor: '#ddd',
    borderRadius: 5,
    marginTop: 5
  },
  bar: {
    height: 10,
    backgroundColor: 'green',
    borderRadius: 5
  }
});
