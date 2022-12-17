import { z } from 'zod';

const yearsOfExpValidator = z
  .number()
  .or(z.string().regex(/\d+/).transform(Number))
  .refine((n) => n >= 0);

const ethExpValidator = z.union([
  z.literal('beginner'),
  z.literal('intermediate'),
  z.literal('expert'),
]);

// const motiavtionValidator = z.union([
//   z.literal(''),
//   z.array(
//     z.union([
//       z.literal('workshop'),
//       z.literal('resume'),
//       z.literal('improve'),
//       z.literal('jobOps'),
//       z.literal('meetPpl'),
//       z.literal('launchProduct'),
//       z.literal('winPrize'),
//       z.literal('other'),
//     ])
//   ),
// ]);
const motiavtionValidator = z.array(
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
);

const textAreaValidator = z.union([
  z.string().min(250).max(500),
  z.literal(''),
]);

const userFormDataValidator = z.object({
  firstName: z.string().optional(),
  lastName: z.string().optional(),
  website: z.string().optional(),
  github: z.string().optional(),
  linkedin: z.string().optional(),
  rules: z.boolean().default(false),
});

const hackerFormDataValidator = z.object({
  yearsOfExp: yearsOfExpValidator,
  ethExp: ethExpValidator,
  motivation: motiavtionValidator,
  builtBefore: textAreaValidator,
  lookingToBuild: textAreaValidator,
});

export const hackerFormValidator = userFormDataValidator.and(
  hackerFormDataValidator
);