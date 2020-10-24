// React context Api
// step 1 create StateProvide.js
import React, { createContext, useContext, useReducer } from "react";

// Prepare the DataLayer
export const StateContext = createContext();

// Wrap our app and  provide Data layer
export const StateProvider = ({ initialState, reducer, children }) => (
  <StateContext.Provider value={useReducer(reducer, initialState)}>
    {children}
  </StateContext.Provider>
);
// children => <App />

//hook which allows us to pull information from the data layer
export const useStateValue = () => useContext(StateContext);
