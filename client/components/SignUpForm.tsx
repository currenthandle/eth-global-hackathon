import { type NextPage } from 'next';
import { useForm /*, type SubmitHandler*/ } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useRouter } from 'next/router';
import { useContext, useState } from 'react';
import { useMutation, useLazyQuery } from '@apollo/client';
// import { SIGNUP_USER } from '../graphql/mutations';
import { EMAIL_IS_AVAILABLE } from '../graphql/queries';
import { DispatchContext } from '../utils/context';

const schema = z.object({
  email: z.string().email({ message: 'Email is required' }),
});

type Schema = z.infer<typeof schema>;

const Signup = () => {
  // const [signUpUser, { data, error }] = useMutation(SIGNUP_USER);
  const [signUpError, setSignUpError] = useState('');
  const router = useRouter();
  const dispatch = useContext(DispatchContext);
  // const emailIsAvailable = useLazyQuery(EMAIL_IS_AVAILABLE);
  const [isEmailAvailable, { data: available, error: availableErr }] =
    useLazyQuery(EMAIL_IS_AVAILABLE);

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
  const onSubmit = async (/*data: Schema*/) => {
    const formValues = getValues();

    const emailIsAvailableResp = await isEmailAvailable({
      variables: {
        email: formValues.email,
      },
    });
    if (!emailIsAvailableResp.data.emailIsAvailable) {
      setSignUpError('Email is already taken');
    } else {
      dispatch({ type: 'SET_SIGNUP_DATA', payload: formValues });
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
              className='rounded-lg border-2 border-black'
              type='email'
              name='email'
              id='email'
              placeholder='Email'
            />
            <p>{errors.email?.message}</p>

            <div className='flex justify-center'>
              <button
                className='mt-4 w-4/12 rounded-lg border-2 border-black'
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
