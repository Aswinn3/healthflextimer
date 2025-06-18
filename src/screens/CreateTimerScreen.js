import React, { useState, useContext } from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  Switch,
  Alert,
  ScrollView,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform
} from 'react-native';
import { TimerContext } from '../context/TimerContext';
import uuid from 'react-native-uuid';

export default function CreateTimerScreen({ navigation }) {
  const { dispatch } = useContext(TimerContext);

  const [name, setName] = useState('');
  const [duration, setDuration] = useState('');
  const [category, setCategory] = useState('');
  const [halfwayAlert, setHalfwayAlert] = useState(false);

  const handleSubmit = () => {
    if (!name || !duration || !category) {
      Alert.alert('Missing fields', 'Please fill in all fields.');
      return;
    }

    const newTimer = {
      id: uuid.v4(),
      name,
      duration: parseInt(duration),
      remaining: parseInt(duration),
      category,
      status: 'Paused',
      halfwayAlert
    };

    dispatch({ type: 'ADD_TIMER', payload: newTimer });
    navigation.navigate('Timers');
  };

  return (
    <SafeAreaView style={styles.safeContainer}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <Text style={styles.label}>Timer Name</Text>
          <TextInput
            style={styles.input}
            placeholder="e.g. Workout Timer"
            value={name}
            onChangeText={setName}
          />

          <Text style={styles.label}>Duration (seconds)</Text>
          <TextInput
            style={styles.input}
            placeholder="e.g. 120"
            value={duration}
            onChangeText={setDuration}
            keyboardType="numeric"
          />

          <Text style={styles.label}>Category</Text>
          <View style={styles.categoryContainer}>
            {['Study', 'Break', 'Workout'].map((item) => (
              <Button
                key={item}
                title={item}
                onPress={() => setCategory(item)}
                color={category === item ? '#007AFF' : '#ccc'}
              />
            ))}
          </View>

          <View style={styles.switchRow}>
            <Text style={styles.label}>Enable Halfway Alert</Text>
            <Switch
              value={halfwayAlert}
              onValueChange={setHalfwayAlert}
            />
          </View>

          <Button title="Create Timer" onPress={handleSubmit} />
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeContainer: {
    flex: 1,
    backgroundColor: '#fff'
  },
  scrollContainer: {
    padding: 20,
    paddingBottom: 100 // prevents content being hidden behind tab bar
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    marginTop: 10
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 6,
    padding: 10,
    marginTop: 5
  },
  categoryContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 10
  },
  switchRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 15
  }
});
