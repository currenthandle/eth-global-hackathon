import { z } from 'zod';

export const updateHackerProfileValidator = z.object({
  firstName: z.string().optional(),
  lastName: z.string().optional(),
  website: z.string().optional(),
  github: z.string().optional(),
  linkedin: z.string().optional(),
  yearsOfExp: z.number(),
  // .or(z.string().regex(/\d+/).transform(Number))
  // .refine((n) => n >= 0),
  // z.union([z.literal(0), z.string().numeric().min(1)]),
  ethExp: z.union([
    z.literal('beginner'),
    z.literal('intermediate'),
    z.literal('advanced'),
    z.literal(''),
  ]),
  motivation: z.union([
    z.literal(''),
    z.array(
      z.union([
        z.literal('workshop'),
        z.literal('resume'),
        z.literal('improve'),
        z.literal('jobOps'),
        z.literal('meetPpl'),
        z.literal('launchProduct'),
        z.literal('winPrize'),
        z.literal('other'),
      ])
    ),
  ]),
  builtBefore: z.union([z.string().min(250).max(500), z.literal('')]),
  lookingToBuild: z.union([z.string().min(250).max(500), z.literal('')]),
  rules: z.boolean().default(false),
});
