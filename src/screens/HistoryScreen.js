import React, { useContext } from 'react';
import { View, Text, ScrollView, SafeAreaView, StyleSheet } from 'react-native';
import { TimerContext } from '../context/TimerContext';

const HistoryScreen = () => {
  const { state } = useContext(TimerContext);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {state.history.length > 0 ? (
          state.history.map((entry, idx) => (
            <View key={idx} style={styles.entry}>
              <Text style={styles.entryText}>
                ✅ {entry.name} — Completed at {entry.time}
              </Text>
            </View>
          ))
        ) : (
          <Text style={styles.emptyText}>No history yet. Start a timer!</Text>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default HistoryScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 100, // extra space to avoid being hidden by tab bar
  },
  entry: {
    marginBottom: 12,
    backgroundColor: '#f0f0f0',
    padding: 12,
    borderRadius: 8
  },
  entryText: {
    fontSize: 16,
    color: '#333'
  },
  emptyText: {
    fontSize: 16,
    color: '#888',
    textAlign: 'center',
    marginTop: 20
  }
});
