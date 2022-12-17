import { z } from 'zod';
import { SignUpData, State } from './types';
export const actionValidator = z.object({
  type: z.string(),
  payload: z
    .object({
      email: z.string().email(),
    })
    .optional(),
});
export type Action = z.infer<typeof actionValidator>;
export default function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'SET_SIGNUP_DATA':
      return {
        signUpData: action.payload as SignUpData,
      };
    case 'CLEAR_SIGNUP_DATA':
      return {
        signUpData: null,
      };
    default:
      return state;
  }
}
