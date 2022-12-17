import { z } from 'zod';

export const updateUserValidator = z
  .object({
    userUpdate: z.object({
      firstName: z.string().optional(),
      lastName: z.string().optional(),
      website: z.string().optional(),
      rules: z.boolean().optional(),
      linkedin: z.string().optional(),
    }),
    hackerProfile: z.object({
      firstName: z.string().optional(),
      lastName: z.string().optional(),
      website: z.string().optional(),
      github: z.string().optional(),
      linkedin: z.string().optional(),
      yearsOfExp: z.number().min(0),
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
    }),
    partnerProfile: z.object({
      organization: z.string().optional(),
      telegram: z.string().optional(),
      twitter: z.string().optional(),
      otherEvents: z.union([z.string().min(250).max(500), z.literal('')]),
      reasonForSupporting: z.union([
        z.string().min(250).max(500),
        z.literal(''),
      ]),
    }),
    mentorProfile: z.object({
      telegram: z.string().optional(),
      twitter: z.string().optional(),
      yearsOfExp: z
        .number()
        .or(z.string().regex(/\d+/).transform(Number))
        .refine((n) => n >= 0),
      ethExp: z.union([
        z.literal('beginner'),
        z.literal('intermediate'),
        z.literal('advanced'),
        z.literal(''),
      ]),
      otherEvents: z.union([z.string().min(250).max(500), z.literal('')]),
      reasonForMentoring: z.union([
        z.string().min(250).max(500),
        z.literal(''),
      ]),
    }),
  })
  .partial()
  .refine(
    (data) =>
      (data.userUpdate && data.hackerProfile) ||
      (data.userUpdate && data.partnerProfile) ||
      (data.userUpdate && data.mentorProfile),
    'Must provide userUpdate and one role profile'
  );
