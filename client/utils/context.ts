// import { initialUserData } from './initialUserData';
// import { initialState } from './reducer';
import { createContext, useContext } from 'react';
import { Action } from './reducer';
import { State } from './types';

export const StateContext = createContext<State>({
  signUpData: null,
});
export const DispatchContext = createContext({} as React.Dispatch<Action>);
// export const DispatchContext = createContext(null);
