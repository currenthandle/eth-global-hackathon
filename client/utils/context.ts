// import { initialUserData } from './initialUserData';
// import { initialState } from './reducer';
import { createContext, useContext } from 'react';
import { Action } from './reducer';

const initialState = {};

export const StateContext = createContext(null);
export const DispatchContext = createContext({} as React.Dispatch<Action>);
// export const DispatchContext = createContext(null);
