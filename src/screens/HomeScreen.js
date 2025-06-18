import React, { useContext, useEffect, useRef } from 'react';
import { ScrollView, Alert, SafeAreaView, StyleSheet } from 'react-native';
import CategorySection from '../components/CategorySection';
import { TimerContext } from '../context/TimerContext';
import { storeData } from '../utils/storage';

const HomeScreen = () => {
  const { state, dispatch } = useContext(TimerContext);
  const intervalsRef = useRef({});

  useEffect(() => {
    storeData('timers', state.timers);
    storeData('history', state.history);
  }, [state.timers, state.history]);

  const handleStart = (timer) => {
    if (intervalsRef.current[timer.id]) return;

    dispatch({
      type: 'UPDATE_TIMER',
      payload: { id: timer.id, updates: { status: 'Running' } }
    });

    intervalsRef.current[timer.id] = setInterval(() => {
      dispatch({
        type: 'UPDATE_TIMER',
        payload: {
          id: timer.id,
          updates: prev => {
            const remaining = prev.remaining - 1;

            if (remaining === Math.floor(timer.duration / 2)) {
              Alert.alert('Halfway There!', `${timer.name} is at 50%.`);
            }

            if (remaining <= 0) {
              clearInterval(intervalsRef.current[timer.id]);
              delete intervalsRef.current[timer.id];

              dispatch({
                type: 'UPDATE_TIMER',
                payload: {
                  id: timer.id,
                  updates: { remaining: 0, status: 'Completed' }
                }
              });

              dispatch({
                type: 'ADD_HISTORY',
                payload: {
                  name: timer.name,
                  time: new Date().toLocaleString()
                }
              });

              Alert.alert('Timer Completed!', `${timer.name} has finished.`);
              return { remaining: 0, status: 'Completed' };
            }

            return { remaining, status: 'Running' };
          }
        }
      });
    }, 1000);
  };

  const handlePause = (timer) => {
    if (intervalsRef.current[timer.id]) {
      clearInterval(intervalsRef.current[timer.id]);
      delete intervalsRef.current[timer.id];

      dispatch({
        type: 'UPDATE_TIMER',
        payload: { id: timer.id, updates: { status: 'Paused' } }
      });
    }
  };

  const handleReset = (timer) => {
    if (intervalsRef.current[timer.id]) {
      clearInterval(intervalsRef.current[timer.id]);
      delete intervalsRef.current[timer.id];
    }

    dispatch({
      type: 'UPDATE_TIMER',
      payload: {
        id: timer.id,
        updates: { remaining: timer.duration, status: 'Paused' }
      }
    });
  };

  const handleBulk = (category, action) => {
    const timers = state.timers.filter(t => t.category === category);
    timers.forEach(timer => {
      if (action === 'start') handleStart(timer);
      else if (action === 'pause') handlePause(timer);
      else if (action === 'reset') handleReset(timer);
    });
  };

  const grouped = state.timers.reduce((acc, timer) => {
    acc[timer.category] = acc[timer.category] || [];
    acc[timer.category].push(timer);
    return acc;
  }, {});

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {Object.keys(grouped).map(category => (
          <CategorySection
            key={category}
            category={category}
            timers={grouped[category]}
            onStartAll={() => handleBulk(category, 'start')}
            onPauseAll={() => handleBulk(category, 'pause')}
            onResetAll={() => handleBulk(category, 'reset')}
            onStart={handleStart}
            onPause={handlePause}
            onReset={handleReset}
          />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff', // or your app background
  },
  scrollContainer: {
    padding: 16,
    paddingBottom: 100, // Add space so tab bar doesn't overlap content
  },
});
