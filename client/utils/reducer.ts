import { z } from 'zod';
import { UserData } from './types';
export const actionValidator = z.object({
  type: z.string(),
  // payload: z.union([cellValidator, boardValidator]),
  payload: z.any(),
});
export type Action = z.infer<typeof actionValidator>;
export default function reducer(state: UserData, action: Action) {
  // console.log('in', userData);
  switch (action.type) {
    case 'SET_SIGNUP_DATA':
      return {
        signUpData: action.payload,
        loggedIn: !state.loggedIn,
      };
    // return { count: state.count + 1 };
    case 'CLEAR_SIGNUP_DATA':
      return {
        signUpData: null,
      };
    case 'decrement':
      return userData;
    // return { count: state.count - 1 };
    default:
      // throw new Error();
      return userData;
  }
}
