import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

import { useMutation } from '@apollo/client';
import { UPDATE_USER } from '../graphql/mutations';
import { UserSsr } from '../utils/types';
import { SubmitButton } from './SubmitButton';
import { hackerFormValidator } from '../utils/validators';

const schema = hackerFormValidator;

type Schema = z.infer<typeof schema>;

const HackerEditor = ({ userSsr }: UserSsr) => {
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
      ethExp: userSsr.ethExp,
      motivation: userSsr.motivation || '',
      builtBefore: userSsr.builtBefore || '',
      lookingToBuild: userSsr.lookingToBuild || '',
      rules: userSsr.rules || false,
    },
  });

  const [updateUser, { data: updatedUser, error: updatedUserErr }] =
    useMutation(UPDATE_USER);

  const onSubmit = async (/*data: Schema*/) => {
    try {
      const formValues = getValues();
      const variables = {
        userUpdate: {
          firstName: formValues.firstName || '',
          lastName: formValues.lastName || '',
          rules: formValues.rules || false,
          linkedin: formValues.linkedin || '',
          website: formValues.website || '',
        },
        hackerProfile: {
          github: formValues.github || '',
          yearsOfExp: Number(formValues.yearsOfExp) || 0,
          ethExp: formValues.ethExp,
          motivation: formValues.motivation || '',
          builtBefore: formValues.builtBefore || '',
          lookingToBuild: formValues.lookingToBuild || '',
        },
      };

      const updatedUser = await updateUser({
        variables,
      });
    } catch (error) {
      console.error('error', error);
    }
  };

  return (
    <div className='flex justify-center'>
      <div className='flex justify-center flex-col items-center'>
        <form
          action=''
          className='flex flex-col'
          onSubmit={handleSubmit(onSubmit)}
        >
          <p>Email</p>
          <div className='bg-[#f4f4f5] mb-6 rounded-lg border-2 border-[#dadadb] h-14 px-4 flex items-center cursor-no-drop text-sm w-full'>
            {userSsr.email}
          </div>

          <p>Application Status</p>
          <div className='bg-[#f4f4f5] mb-6 rounded-lg border-2 border-[#dadadb] h-14 px-4 flex items-center cursor-no-drop text-sm w-full'>
            {userSsr.applicationStatus ? 'Approved' : 'Pending'}
          </div>

          <div className='flex flex-row justify-between mb-6'>
            <div className='flex flex-col grow mr-2'>
              <label htmlFor='firstName'>First name</label>
              <input
                className='rounded-lg border-2 border-[#dadadb] h-14 px-4 text-sm'
                {...register('firstName')}
                type='text'
                name='firstName'
                id='firstName'
                placeholder='First name'
              />
            </div>
            <div className='flex flex-col grow ml-2'>
              <label htmlFor='lastName'>Last name</label>
              <input
                className='rounded-lg border-2 border-[#dadadb] h-14 px-4 text-sm'
                {...register('lastName')}
                type='text'
                name='lastName'
                id='lastName'
                placeholder='Last name'
              />
            </div>
          </div>

          <label htmlFor='website'>Website</label>
          <input
            className='rounded-lg border-2 border-[#dadadb] mb-6 h-14 px-4 text-sm'
            {...register('website')}
            type='text'
            name='website'
            id='website'
            placeholder='Website'
          />

          <label htmlFor='github'>Github</label>
          <input
            className='rounded-lg border-2 border-[#dadadb] mb-6 h-14 px-4 text-sm'
            {...register('github')}
            type='text'
            name='github'
            id='github'
            placeholder='Github'
          />

          <label htmlFor='linkedin'>Linkedin</label>
          <input
            className='rounded-lg border-2 border-[#dadadb] mb-6 h-14 px-4 text-sm'
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
            className='rounded-lg border-2 border-[#dadadb] mb-6 h-14 px-4 text-sm'
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
            className='rounded-lg border-2 border-[#dadadb] mb-6 h-14 px-4 text-sm'
            {...register('ethExp')}
            name='ethExp'
            id='ethExp'
            placeholder='beginner'
          >
            <option value='beginner'>Beginner</option>
            <option value='intermediate'>Intermediate</option>
            <option value='expert'>Expert</option>
          </select>

          <label htmlFor='motivation'>
            What is your motivation to join this event?
          </label>
          <select
            className='rounded-lg border-2 border-[#dadadb] mb-6 h-44 text-sm overflow-hidden'
            {...register('motivation')}
            name='motivation'
            id='motivation'
            placeholder='beginner'
            defaultValue={['workshop']}
            multiple
          >
            <option className='py-1 px-4' value='workshop'>
              Attend workshops & tech talks
            </option>
            <option className='py-1 px-4' value='resume'>
              Build something to put on my resume / portfolio
            </option>
            <option className='py-1 px-4' value='improve'>
              Get better as a developer / designer
            </option>
            <option className='py-1 px-4' value='jobOps'>
              Meet companies for a potential job opportunity
            </option>
            <option className='py-1 px-4' value='meetPpl'>
              Meet like-minded people and make friends
            </option>
            <option className='py-1 px-4' value='launchProduct'>
              Launch a product
            </option>
            <option className='py-1 px-4' value='winPrize'>
              Win a prize
            </option>
            <option className='py-1 px-4' value='other'>
              Other
            </option>
          </select>

          <label htmlFor='builtBefore'>
            {"Tell us about what you've built before?"}
          </label>
          <textarea
            className='rounded-lg border-2 border-[#dadadb] mb-6 h-44 resize-none px-4 py-2 text-sm'
            {...register('builtBefore')}
            name='builtBefore'
            id='builtBefore'
            placeholder='I built...'
          />

          <label htmlFor='lookingToBuild'>
            Tell us about what are you looking to build at this hackathon?
          </label>
          <textarea
            className='rounded-lg border-2 border-[#dadadb] mb-6 h-44 resize-none px-4 py-2 text-sm'
            {...register('lookingToBuild')}
            name='lookingToBuild'
            id='lookingToBuild'
            placeholder="I'm looking to build..."
          />

          <label htmlFor='rules'>
            Do you accept the rules and code of conduct for the event?
          </label>
          <div className='mt-2 flex justify-start items-center'>
            <input
              {...register('rules')}
              type='checkbox'
              name='rules'
              id='rules'
              placeholder='false'
              className='h-4 w-4  cursor-pointer'
            />
            <p className='ml-4  text-sm'>
              Yes I accept the rules and code of conduct for this event
            </p>
          </div>
          <SubmitButton />
        </form>
      </div>
    </div>
  );
};
export default HackerEditor;
