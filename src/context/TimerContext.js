import React, { createContext, useReducer } from 'react';
import timerReducer, { initialState } from './timerReducer';

export const TimerContext = createContext();

export const TimerProvider = ({ children }) => {
  const [state, dispatch] = useReducer(timerReducer, initialState);
  return (
    <TimerContext.Provider value={{ state, dispatch }}>
      {children}
    </TimerContext.Provider>
  );
};
