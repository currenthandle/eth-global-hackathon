import { z } from 'zod';
import { SignUpData, State } from './types';
export const actionValidator = z.object({
  type: z.string(),
  payload: z.object({
    email: z.string().email(),
  }),
});
export type Action = z.infer<typeof actionValidator>;
export default function reducer(state: State, action: Action) {
  console.log('action.payload=', action.payload);
  switch (action.type) {
    case 'SET_SIGNUP_DATA':
      return {
        signUpData: action.payload,
      };
    case 'CLEAR_SIGNUP_DATA':
      return {
        signUpData: null,
      };
    default:
      return state;
  }
}
