import { useForm, type SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

import { USER_DATA } from '../graphql/queries';
import { useQuery } from '@apollo/client';

const schema = z.object({
  email: z.union([
    z.string().email({ message: 'Email is required' }),
    z.string().min(0).max(0),
  ]),
  firstName: z.string(),
  lastName: z.string(),
  student: z.boolean(),
  school: z.string(),
  country: z.string(),
  company: z.string(),
  website: z.union([
    z.string().url({ message: 'Invalid' }),
    z.string().min(0).max(0),
  ]),
  github: z.string(),
  twitter: z.string(),
  telgram: z.string(),
  linkedin: z.string(),
});

type Schema = z.infer<typeof schema>;

const ProfileEditor = () => {
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm<Schema>({
    resolver: zodResolver(schema),
    defaultValues: {
      email: '',
      firstName: '',
      lastName: '',
      // gender: '',
      student: false,
      school: '',
      country: '',
      company: '',
      website: '',
      github: '',
      twitter: '',
      telgram: '',
      linkedin: '',
    },
  });

  const { data, error } = useQuery(USER_DATA);
  const userData = data?.userData;
  // console.log('userData', userData);
  const onSubmit = async (/*data: Schema*/) => {
    try {
      console.log('begin');
      const formValues = getValues();
      console.log('formValues', formValues);
      console.log('formValues', formValues);
    } catch (error) {
      console.error('error', error);
    }
  };

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
          <label htmlFor='email'>Email</label>
          <input
            {...register('email')}
            type='email'
            name='email'
            id='email'
            placeholder='Email'
          />
          {/* set up inputs for all other fields describe in defaultValues */}

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
          <label htmlFor='student'>Student</label>
          <input
            {...register('student')}
            type='checkbox'
            name='student'
            id='student'
            placeholder='Student'
          />
          <label htmlFor='school'>School</label>
          <input
            {...register('school')}
            type='text'
            name='school'
            id='school'
            placeholder='School'
          />
          <label htmlFor='country'>Country</label>
          <input
            {...register('country')}
            type='text'
            name='country'
            id='country'
            placeholder='Country'
          />
          <label htmlFor='company'>Company</label>
          <input
            {...register('company')}
            type='text'
            name='company'
            id='company'
            placeholder='Company'
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
          <label htmlFor='twitter'>Twitter</label>
          <input
            {...register('twitter')}
            type='text'
            name='twitter'
            id='twitter'
            placeholder='Twitter'
          />
          <label htmlFor='telgram'>Telgram</label>
          <input
            {...register('telgram')}
            type='text'
            name='telgram'
            id='telgram'
            placeholder='Telgram'
          />
          <label htmlFor='linkedin'>Linkedin</label>
          <input
            {...register('linkedin')}
            type='text'
            name='linkedin'
            id='linkedin'
            placeholder='Linkedin'
          />
          <button type='submit'>Submit</button>
        </form>
      </div>
    </div>
  );
};
export default ProfileEditor;
