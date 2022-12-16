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
  yearsOfExp: z.number().optional(),
  ethExp: z.any(),
  // .union([
  //   z.literal('beginner'),
  //   z.literal('intermediate'),
  //   z.literal('advanced'),
  // ])
  // .optional(),
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
  builtBefore: z.any(),
  //z.string().min(250).max(500).optional(),
  lookingToBuild: z.any().optional(),
  //z.string().min(250).max(500).optional(),
  rules: z.boolean().default(false),
  // website: z.union([
  //   z.string().url({ message: 'Invalid' }),
  //   z.string().min(0).max(0),
  // ]),
});

type Schema = z.infer<typeof schema>;

const HackerEditor = ({ userSsr }) => {
  // console.log('props internal', email);
  // const { firstName, lastName } = userSsr;

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
      ethExp: userSsr.ethExp || 0,
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
    try {
      console.log('begin');
      const formValues = getValues();
      console.log('formValues', formValues);
      console.log('formValues', formValues);
      const variables = {
        userUpdate: {
          firstName: formValues.firstName,
          lastName: formValues.lastName,
        },
        hackerProfile: {
          github: formValues.github,
          linkedin: formValues.linkedin,
          website: formValues.website,
          yearsOfExp: formValues.yearsOfExp,
          ethExp: formValues.ethExp,
          motivation: formValues.motivation,
          builtBefore: formValues.builtBefore,
          lookingToBuild: formValues.lookingToBuild,
          rules: formValues.rules,
        },
      };
      console.log('variables', variables);
      const updatedUser = await updateUser({
        variables,
      });
      console.log('updatedUser', updatedUser);
    } catch (error) {
      console.error('error', error);
    }
  };
  console.log('formValues', getValues());
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
          <label htmlFor='firstName'>First Name</label>
          <input
            {...register('firstName')}
            type='text'
            name='firstName'
            id='firstName'
            placeholder='First Name'
          />
          <label htmlFor='lastName'>Last Name</label>
          <input
            {...register('lastName')}
            type='text'
            name='lastName'
            id='lastName'
            placeholder='Last Name'
          />

          <label htmlFor='website'>Website</label>
          <input
            {...register('website')}
            type='text'
            name='website'
            id='website'
            placeholder='Website'
          />
          <label htmlFor='github'>Github</label>
          <input
            {...register('github')}
            type='text'
            name='github'
            id='github'
            placeholder='Github'
          />

          <label htmlFor='linkedin'>Linkedin</label>
          <input
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
            {...register('yearsOfExp')}
            type='number'
            name='yearsOfExp'
            id='yearsOfExp'
            placeholder='Year of experience'
          />
          <label htmlFor='yearsOfExp'>
            What's your experience level with Ethereum?
          </label>
          <select
            {...register('ethExp')}
            name='ethExp'
            id='ethExp'
            placeholder='beginner'
          >
            <option value='beginner'>Beginner</option>
            <option value='intermediate'>Intermediate</option>
            <option value='beginner'>Beginner</option>
          </select>
          <label htmlFor='yearsOfExp'>
            What's your experience level with Ethereum?
          </label>
          <select
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
            Tell us about what you've built before?
          </label>
          <textarea
            {...register('builtBefore')}
            // type='text'
            name='builtBefore'
            id='builtBefore'
            placeholder='builtBefore'
          />
          <label htmlFor='lookingToBuild'>
            Tell us about what you've built before?
          </label>
          <textarea
            {...register('lookingToBuild')}
            name='lookingToBuild'
            id='lookingToBuild'
            placeholder='Looking to build'
          />
          <label htmlFor='rules'>
            Tell us about what are you looking to build at this hackathon?
          </label>
          <input
            {...register('rules')}
            type='checkbox'
            name='rules'
            id='rules'
            placeholder='false'
          />
          <label htmlFor='yearsOfExp'>
            Do you accept the rules and code of conduct for the event?
          </label>
          <button type='submit'>Submit</button>
        </form>
      </div>
    </div>
  );
};
export default HackerEditor;
