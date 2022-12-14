import { Context } from './types';

export default function (ctx: Context): void {
  if (!ctx.auth || !ctx.auth.userId) {
    throw new Error('Unauthorized');
  }
}
