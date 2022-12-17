import { z } from 'zod';

const userUpdateValidator = z.object({
  firstName: z.string().optional(),
  lastName: z.string().optional(),
  website: z.string().optional(),
  rules: z.boolean().optional(),
  linkedin: z.string().optional(),
});

const ethExpValidator = z.union([
  z.literal('beginner'),
  z.literal('intermediate'),
  z.literal('advanced'),
  z.literal(''),
]);

const motiavtionValidator = z.union([
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
]);

const textAreaValidator = z.union([
  z.string().min(250).max(500),
  z.literal(''),
]);

const updateHackerValidator = z.object({
  userUpdate: userUpdateValidator,
  hackerProfile: z.object({
    github: z.string().optional(),
    yearsOfExp: z.number().min(0),
    ethExp: ethExpValidator,
    motivation: motiavtionValidator,
    builtBefore: textAreaValidator,
    lookingToBuild: textAreaValidator,
  }),
});

const updatePartnerValidator = z.object({
  userUpdate: userUpdateValidator,
  partnerProfile: z.object({
    organization: z.string().optional(),
    telegram: z.string().optional(),
    twitter: z.string().optional(),
    otherEvents: textAreaValidator,
    reasonForSupporting: textAreaValidator,
  }),
});

const updateMentorValidator = z.object({
  userUpdate: userUpdateValidator,
  mentorProfile: z.object({
    telegram: z.string().optional(),
    twitter: z.string().optional(),
    yearsOfExp: z.number(),
    ethExp: ethExpValidator,
    otherEvents: textAreaValidator,
    reasonForMentoring: textAreaValidator,
  }),
});

// tried this as well
// export const updateUserValidator = z.union([
export const updateUserValidator = z.discriminatedUnion('userUpdate', [
  updateHackerValidator,
  updatePartnerValidator,
  updateMentorValidator,
]);

export type UpdateUserInput = z.infer<typeof updateUserValidator>;

export type UpdateMentorInput = z.infer<typeof updateMentorValidator>;
export type UpdatePartnerInput = z.infer<typeof updatePartnerValidator>;
export type UpdateHackerInput = z.infer<typeof updateHackerValidator>;
