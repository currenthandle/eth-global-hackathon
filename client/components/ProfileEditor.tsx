import { useForm, type SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
// import * as z from 'zod';
import { z } from 'zod';

const schema = z.object({
  email: z.string().email({ message: 'Email is required' }),
  firstName: z.string().min(2, { message: 'Too short' }),
  lastName: z.string().min(2, { message: 'Too short' }),
  school: z.string().min(2, { message: 'Too short' }),
  country: z.string().min(2, { message: 'Too short' }),
  student: z.boolean(),
  company: z.string().min(2, { message: 'Too short' }),
  website: z.string().min(2, { message: 'Too short' }),
  github: z.string().min(2, { message: 'Too short' }),
  twitter: z.string().min(2, { message: 'Too short' }),
  telgram: z.string().min(2, { message: 'Too short' }),
  linkedin: z.string().min(2, { message: 'Too short' }),
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
  return (
    <div className='flex justify-center'>
      <div className='flex justify-center flex-col items-center'>
        <h1>Edit profile</h1>
        <p>Change your profile and account settings</p>
        <form action='' className='flex flex-col'>
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
