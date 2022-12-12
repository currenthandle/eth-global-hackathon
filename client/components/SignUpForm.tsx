import { type NextPage } from 'next';
import { useForm /*, type SubmitHandler*/ } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { gql, useMutation, useQuery, useLazyQuery } from '@apollo/client';

const schema = z.object({
  email: z.string().email({ message: 'Email is required' }),
  password: z.string().min(2, { message: 'Too short' }),
  retypePassword: z.string().min(2, { message: 'Too short' }),
  role: z.union([
    z.literal('hacker'),
    z.literal('mentor'),
    z.literal('sponsor'),
  ]),
});

const SIGNUP_USER = gql`
  mutation SignUpUser($email: String!, $password: String!, $role: String!) {
    signUpUser(email: $email, password: $password, role: $role) {
      __typename
      ... on User {
        email
        id
      }
      ... on Error {
        message
      }
    }
  }
`;

type Schema = z.infer<typeof schema>;

const Signup = () => {
  const [signUpUser, { data, error }] = useMutation(SIGNUP_USER);
  const [signUpError, setSignUpError] = useState('');
  const router = useRouter();
  // const { mutate } = trpc.user.create.useMutation({
  //   onSuccess: async () => {
  //     const formValues = getValues();
  //     try {
  //       const resp = await signIn('credentials', {
  //         email: formValues.email,
  //         password: formValues.password,
  //         redirect: false,
  //       });
  //       if (resp?.ok) {
  //         router.push('/');
  //       } else {
  //         console.error('error', resp);
  //       }
  //     } catch (error) {
  //       console.error('error', error);
  //     }
  //   },
  //   onError: (error) => {
  //     console.error('error', error);
  //   },
  // });

  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm<Schema>({
    resolver: zodResolver(schema),
    defaultValues: {
      email: '',
      password: '',
      retypePassword: '',
    },
  });
  // const onSubmit: SubmitHandler<Inputs> = (data) => console.log('hi', data)
  const onSubmit = async (/*data: Schema*/) => {
    // check that the password and retype password match
    const formValues = getValues();
    if (formValues.password !== formValues.retypePassword) {
      setSignUpError('Passwords do not match');
    } else {
      console.log('formValues', formValues.role);
      const signUpUserResp = await signUpUser({
        variables: {
          email: formValues.email,
          password: formValues.password,
          role: formValues.role,
        },
      });

      if (signUpUserResp.data.signUpUser.__typename === 'Error') {
        setSignUpError(signUpUserResp.data.signUpUser.message);
      }
      if (signUpUserResp.data.signUpUser.__typename === 'User') {
        await signIn('credentials', {
          email: formValues.email,
          password: formValues.password,
          id: signUpUserResp.data.signUpUser.id,
          callbackUrl: '/',
        });
      }
    }
  };

  return (
    <div className='flex justify-center pt-10'>
      <div className='w-6/12 rounded-lg border-2 py-4'>
        <h1 className='flex w-full justify-center'>Signup</h1>
        {signUpError && (
          <p className='flex w-full justify-center text-red-500'>
            {signUpError}
          </p>
        )}
        <div className='flex w-full justify-center'>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className='flex w-6/12 flex-col justify-center'
          >
            <label htmlFor='email'>email</label>
            <input
              {...register('email')}
              className='rounded-md border-2 border-black'
              type='email'
              name='email'
              id='email'
              placeholder='Email'
            />
            <p>{errors.email?.message}</p>
            <label htmlFor='password'>Password</label>
            <input
              {...register('password')}
              className='rounded-md border-2 border-black'
              type='password'
              name='password'
              id='password'
              placeholder='Password'
            />
            <p>{errors.password?.message}</p>
            <label htmlFor='retypePassword'>Password</label>
            <input
              {...register('retypePassword')}
              className='rounded-md border-2 border-black'
              type='password'
              name='retypePassword'
              id='retypePassword'
              placeholder='Retype Password'
            />
            <p>{errors.password?.message}</p>

            <label htmlFor='role'>Role</label>
            <select
              {...register('role')}
              className='rounded-md border-2 border-black'
              name='role'
              id='role'
            >
              <option value='hacker'>Hacker</option>
              <option value='mentor'>Mentor</option>
              <option value='sponsor'>Sponsor</option>
            </select>
            {/* <p>{errors.role?.message}</p> */}

            <div className='flex justify-center'>
              <button
                className='mt-4 w-4/12 rounded-md border-2 border-black'
                type='submit'
              >
                Sign up
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
export default Signup;
