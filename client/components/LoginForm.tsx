import { type NextPage } from 'next';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
// import { trpc } from '../utils/trpc';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/router';
import { gql, useMutation } from '@apollo/client';
import Link from 'next/link';

const schema = z.object({
  email: z.string().email({ message: 'Email is required' }),
  password: z.string().min(2, { message: 'Too short' }),
});

type Schema = z.infer<typeof schema>;

//type SuccessInput extends Schema
const VALIDATE_USER = gql`
  mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      email
    }
  }
`;

const Login: NextPage = () => {
  const router = useRouter();
  const [validateUser, { data, error }] = useMutation(VALIDATE_USER);

  const {
    register,
    handleSubmit,
    getValues,
    watch,
    formState: { errors },
  } = useForm<Schema>({
    resolver: zodResolver(schema),
    defaultValues: {
      email: '',
      password: '',
    },
  });
  const onSubmit = async (/*data: Schema*/) => {
    try {
      const formValues = getValues();

      const validUser = await validateUser({
        variables: {
          email: formValues.email,
          password: formValues.password,
        },
      });

      console.log('validUser', validUser);

      const resp = await signIn('credentials', {
        email: formValues.email,
        password: formValues.password,
        // redirect: false,
        callbackUrl: '/',
      });

      // if (resp?.ok) {
      //   router.push('/');
      // } else {
      //   console.error('error', resp);
      // }
    } catch (error) {
      console.error('error', error);
    }
    // try {
    //   await signIn("credentials", {
    //     // await signIn("credentials", {
    //     id: "credentials",
    //     email: formValues.email,
    //     password: formValues.password,
    //     // redirect: false,
    //     callbackUrl: "/",
    //   });
    // } catch (error) {
    //   console.error("error", error);
    // }
  };

  return (
    <div className='flex justify-center pt-10'>
      <div className='w-6/12 rounded-lg border-2 py-4'>
        <h1 className='flex w-full justify-center'>Login</h1>
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

            <div className='flex justify-center'>
              <button
                className='mt-4 w-4/12 rounded-md border-2 border-black'
                type='submit'
              >
                Login
              </button>
            </div>

            <Link href='/signup'>
              <div className='flex justify-center'>
                <button className='mt-4 w-4/12 rounded-md border-2 border-black'>
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
