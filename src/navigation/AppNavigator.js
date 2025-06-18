import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/HomeScreen';
import HistoryScreen from '../screens/HistoryScreen';
import CreateTimerScreen from '../screens/CreateTimerScreen';
import { Ionicons } from '@expo/vector-icons'; // You can use any icon library

const Tab = createBottomTabNavigator();

export default function AppNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarStyle: {
          backgroundColor: '#ffffff',
          height: 60,
          paddingBottom: 10,
          paddingTop: 5,
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
          elevation: 10,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '600',
        },
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Timers') {
            iconName = focused ? 'timer' : 'timer-outline';
          } else if (route.name === 'Create') {
            iconName = focused ? 'add-circle' : 'add-circle-outline';
          } else if (route.name === 'History') {
            iconName = focused ? 'time' : 'time-outline';
          }

          return <Ionicons name={iconName} size={24} color={focused ? '#007AFF' : '#8e8e93'} />;
        },
        tabBarActiveTintColor: '#007AFF',
        tabBarInactiveTintColor: '#8e8e93',
        headerShown: false,
      })}
    >
      <Tab.Screen name="Timers" component={HomeScreen} />
      <Tab.Screen name="Create" component={CreateTimerScreen} />
      <Tab.Screen name="History" component={HistoryScreen} />
    </Tab.Navigator>
  );
}
