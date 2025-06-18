export const initialState = {
  timers: [],
  history: []
};

export default function timerReducer(state, action) {
  switch (action.type) {
    case 'ADD_TIMER':
      return { ...state, timers: [...state.timers, action.payload] };
    case 'UPDATE_TIMER':
        return {
            ...state,
            timers: state.timers.map(timer =>
            timer.id === action.payload.id
                ? {
                    ...timer,
                    ...(typeof action.payload.updates === 'function'
                    ? action.payload.updates(timer)
                    : action.payload.updates)
                }
                : timer
            )
        };
    case 'RESET_TIMERS':
      return { ...state, timers: [] };
    case 'ADD_HISTORY':
      return { ...state, history: [...state.history, action.payload] };
    default:
      return state;
  }
}
