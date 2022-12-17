import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useRouter } from 'next/router';
import { useLazyQuery } from '@apollo/client';
import Link from 'next/link';
import { useState } from 'react';
import { VALIDATE_USER } from '../graphql/queries';

const schema = z.object({
  email: z.string().email({ message: 'Email is required' }),
});

type Schema = z.infer<typeof schema>;

const Login = () => {
  const [incorrectCreds, setIncorrectCreds] = useState('');
  const router = useRouter();
  const [validateUser, { data, error }] = useLazyQuery(VALIDATE_USER);

  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm<Schema>({
    resolver: zodResolver(schema),
    defaultValues: {
      email: '',
    },
  });
  const onSubmit = async () => {
    try {
      const formValues = getValues();
      const validUser = await validateUser({
        variables: {
          email: formValues.email,
        },
      });

      if (validUser?.data?.validateUser?.message) {
        setIncorrectCreds(validUser?.data?.validateUser?.message);
      } else {
        document.cookie = `server-auth-token=${validUser.data.validateUser.token}`;
        router.push('/');
      }
    } catch (error) {
      console.error('error', error);
    }
  };

  return (
    <div className='flex justify-center pt-10 mt-16'>
      <div className='w-6/12 rounded-lg py-4'>
        <h1 className='flex w-full justify-center'>Login</h1>
        {incorrectCreds && (
          <p className='flex w-full justify-center text-red-500'>
            {incorrectCreds}
          </p>
        )}
        <div className='flex w-full justify-center'>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className='flex w-6/12 flex-col justify-center'
          >
            <label htmlFor='email'>Email</label>
            <input
              {...register('email')}
              className='rounded-lg border-2 border-[#dadadb]'
              type='email'
              name='email'
              id='email'
              placeholder='Email'
            />
            <p>{errors.email?.message}</p>
            <div className='flex justify-center'>
              <button
                className='mt-4 w-4/12 rounded-lg border-2 border-[#dadadb]'
                type='submit'
              >
                Login
              </button>
            </div>

            <Link href='/signup'>
              <div className='flex justify-center'>
                <button className='mt-4 w-4/12 rounded-lg border-2 border-[#dadadb]'>
                  Sign Up
                </button>
              </div>
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
};
export default Login;
