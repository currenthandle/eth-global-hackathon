import { z } from 'zod';
import { UserData } from './types';
export const actionValidator = z.object({
  type: z.string(),
  // payload: z.union([cellValidator, boardValidator]),
  payload: z.any(),
});
export type Action = z.infer<typeof actionValidator>;

export default function reducer(userData: UserData, action: Action) {
  console.log(userData);
  switch (action.type) {
    case 'UPDATE_USER':
      console.log('payload', action.payload);
      return action.payload;
    // return { count: state.count + 1 };
    case 'decrement':
      return userData;
    // return { count: state.count - 1 };
    default:
      // throw new Error();
      return userData;
  }
}
