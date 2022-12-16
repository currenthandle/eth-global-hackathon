// import { initialUserData } from './initialUserData';
// import { initialState } from './reducer';
import { createContext, useContext } from 'react';
import { Action } from './reducer';

const initialState = { loggedIn: false, signUpData: null };

export const StateContext = createContext(initialState);
export const DispatchContext = createContext({} as React.Dispatch<Action>);
// export const DispatchContext = createContext(null);
