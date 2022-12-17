import { useForm, type SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

import { useMutation, useQuery } from '@apollo/client';
import { UPDATE_USER } from '../graphql/mutations';

const schema = z.object({
  firstName: z.string().optional(),
  lastName: z.string().optional(),
  website: z.string().optional(),
  github: z.string().optional(),
  linkedin: z.string().optional(),
  yearsOfExp: z
    .number()
    .or(z.string().regex(/\d+/).transform(Number))
    .refine((n) => n >= 0),
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
  // website: z.union([z.string(), z.literal('')]),
});

type Schema = z.infer<typeof schema>;

const HackerEditor = ({ userSsr }) => {
  // console.log('userSsr', userSsr);
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm<Schema>({
    resolver: zodResolver(schema),
    defaultValues: {
      firstName: userSsr.firstName || '',
      lastName: userSsr.lastName || '',
      website: userSsr.website || '',
      github: userSsr.github || '',
      linkedin: userSsr.linkedin || '',
      yearsOfExp: userSsr.yearsOfExp || 0,
      ethExp: userSsr.ethExp || '',
      motivation: userSsr.motivation || '',
      builtBefore: userSsr.builtBefore || '',
      lookingToBuild: userSsr.lookingToBuild || '',
      rules: userSsr.rules || false,
    },
  });

  // const { data: initialData, error: initialError } = useQuery(USER_DATA);
  const [updateUser, { data: updatedUser, error: updatedUserErr }] =
    useMutation(UPDATE_USER);

  const onSubmit = async (/*data: Schema*/) => {
    // console.log('onSubmit formValues', getValues());
    try {
      const formValues = getValues();
      const variables = {
        userUpdate: {
          firstName: formValues.firstName || '',
          lastName: formValues.lastName || '',
        },
        hackerProfile: {
          github: formValues.github || '',
          linkedin: formValues.linkedin || '',
          website: formValues.website || '',
          yearsOfExp: Number(formValues.yearsOfExp) || 0,
          ethExp: formValues.ethExp,
          motivation: formValues.motivation || '',
          builtBefore: formValues.builtBefore || '',
          lookingToBuild: formValues.lookingToBuild || '',
          rules: formValues.rules || false,
        },
      };
      console.log('formValues', formValues);
      console.log('submit variables', variables);

      const updatedUser = await updateUser({
        variables,
      });
    } catch (error) {
      console.error('error', error);
    }
  };

  // console.log('formVale', getValues().yearsOfExp);
  // console.log('formVale', typeof getValues().yearsOfExp);
  return (
    <div className='flex justify-center'>
      <div className='flex justify-center flex-col items-center'>
        <h1>Edit profile</h1>
        <p>Change your profile and account settings</p>
        <form
          action=''
          className='flex flex-col'
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className='flex flex-row justify-between mb-6'>
            <div className='flex flex-col grow mr-2'>
              <label htmlFor='firstName'>First Name</label>
              <input
                className='rounded-md border-2 border-[#dadadb] h-12'
                {...register('firstName')}
                type='text'
                name='firstName'
                id='firstName'
                placeholder='First Name'
              />
            </div>
            <div className='flex flex-col grow ml-2'>
              <label htmlFor='lastName'>Last Name</label>
              <input
                className='rounded-md border-2 border-[#dadadb] h-12'
                {...register('lastName')}
                type='text'
                name='lastName'
                id='lastName'
                placeholder='Last Name'
              />
            </div>
          </div>

          <label htmlFor='website'>Website</label>
          <input
            className='rounded-md border-2 border-[#dadadb] mb-6 h-12'
            {...register('website')}
            type='text'
            name='website'
            id='website'
            placeholder='Website'
          />

          <label htmlFor='github'>Github</label>
          <input
            className='rounded-md border-2 border-[#dadadb] mb-6 h-12'
            {...register('github')}
            type='text'
            name='github'
            id='github'
            placeholder='Github'
          />

          <label htmlFor='linkedin'>Linkedin</label>
          <input
            className='rounded-md border-2 border-[#dadadb] mb-6 h-12'
            {...register('linkedin')}
            type='text'
            name='linkedin'
            id='linkedin'
            placeholder='Linkedin'
          />

          <label htmlFor='yearsOfExp'>
            How many years of experience do you have with sofware development?
          </label>
          <input
            className='rounded-md border-2 border-[#dadadb] mb-6 h-12'
            {...register('yearsOfExp')}
            type='number'
            name='yearsOfExp'
            id='yearsOfExp'
            placeholder='Year of experience'
            min='0'
          />

          <label htmlFor='ethExp'>
            {"What's your experience level with Ethereum?"}
          </label>
          <select
            className='rounded-md border-2 border-[#dadadb] mb-6 h-12'
            {...register('ethExp')}
            name='ethExp'
            id='ethExp'
            placeholder='beginner'
          >
            <option value='beginner'>Beginner</option>
            <option value='intermediate'>Intermediate</option>
            <option value='beginner'>Beginner</option>
          </select>

          <label htmlFor='motivation'>
            What is your motivation to join this event?
          </label>
          <select
            className='rounded-md border-2 border-[#dadadb] mb-6 h-12'
            {...register('motivation')}
            name='motivation'
            id='motivation'
            placeholder='beginner'
            defaultValue={['workshop']}
            multiple
          >
            <option value='workshop'>Attend workshops & tech talks</option>
            <option value='resume'>
              Build something to put on my resume / portfolio
            </option>
            <option value='improve'>
              Get better as a developer / designer
            </option>
            <option value='jobOps'>
              Meet companies for a potential job opportunity
            </option>
            <option value='meetPpl'>
              Meet like-minded people and make friends
            </option>
            <option value='launchProduct'>Launch a product</option>
            <option value='winPrize'>Win a prize</option>
            <option value='other'>Other</option>
          </select>

          <label htmlFor='builtBefore'>
            {"Tell us about what you've built before?"}
          </label>
          <textarea
            className='rounded-md border-2 border-[#dadadb] mb-6 h-12'
            {...register('builtBefore')}
            // type='text'
            name='builtBefore'
            id='builtBefore'
            placeholder='builtBefore'
          />

          <label htmlFor='lookingToBuild'>
            Tell us about what are you looking to build at this hackathon?
          </label>
          <textarea
            className='rounded-md border-2 border-[#dadadb] mb-6 h-12'
            {...register('lookingToBuild')}
            name='lookingToBuild'
            id='lookingToBuild'
            placeholder='Looking to build'
          />

          <label htmlFor='rules'>
            Do you accept the rules and code of conduct for the event?
          </label>
          <input
            {...register('rules')}
            type='checkbox'
            name='rules'
            id='rules'
            placeholder='false'
          />

          <button type='submit'>Submit</button>
        </form>
      </div>
    </div>
  );
};
export default HackerEditor;
