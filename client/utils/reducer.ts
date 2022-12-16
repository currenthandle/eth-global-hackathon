import { z } from 'zod';
import { SignUpData, State } from './types';
export const actionValidator = z.object({
  type: z.string(),
  // payload: z.union([cellValidator, boardValidator]),
  payload: z.any(),
});
export type Action = z.infer<typeof actionValidator>;
export default function reducer(state: State, action: Action) {
  // console.log('in', userData);
  switch (action.type) {
    case 'SET_SIGNUP_DATA':
      return {
        signUpData: action.payload,
      };
    // return { count: state.count + 1 };
    case 'CLEAR_SIGNUP_DATA':
      return {
        signUpData: null,
      };
    default:
      return state;
  }
}
