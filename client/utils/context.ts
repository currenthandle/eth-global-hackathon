import { initialUserData } from './initialUserData';
import { createContext, useContext } from 'react';
import { Action } from './reducer';

export const UserDataContext = createContext(initialUserData);
export const UserDataDispatchContext = createContext(
  {} as React.Dispatch<Action>
);

// export function useContext() {
//   return useContext(Context);
// }
