import '../styles/App.css';
import React, { createContext, useContext, useReducer } from 'react';
const initialState = {
  count1: 0,
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'INCREMENT':
      return {
        ...state,
        [action.name]: state[action.name] + 1,
      };
    case 'DECREMENT':
      return {
        ...state,
        [action.name]: state[action.name] - 1,
      };
    default:
      return state;
  }
};

const useValue = () => useReducer(reducer, initialState);

const Context = createContext(null);

const useGlobalState = () => {
  const value = useContext(Context);
  if (value === null) throw new Error('Please add GlobalStateProvider');
  return value;
};

const GlobalStateProvider = ({ children }) => (
  <Context.Provider value={useValue()}>{children}</Context.Provider>
);

const Counter = ({ name }) => {
  const [state, dispatch] = useGlobalState();
  return (
    <div>
      <span id="counter">{state[name]}</span><br/>
      <button id="increment-btn" onClick={() => dispatch({ type: 'INCREMENT', name })}>increase</button>
      <button id="decrement-btn" onClick={() => dispatch({ type: 'DECREMENT', name })}>decrease</button>
    </div>
  );
};

const App = () => (
  <GlobalStateProvider>
    <Counter name="count1" />
  </GlobalStateProvider>
);

export default App;
