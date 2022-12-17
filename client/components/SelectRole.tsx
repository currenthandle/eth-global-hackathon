import { useContext } from 'react';
import { DispatchContext, StateContext } from '../utils/context';
import { SIGNUP_USER } from '../graphql/mutations';
import { useMutation } from '@apollo/client';
import { useRouter } from 'next/router';

export const SelectRole = () => {
  const state = useContext(StateContext);
  const dispatch = useContext(DispatchContext);
  const router = useRouter();
  const [signUpUser, { data, error }] = useMutation(SIGNUP_USER);
  const handleClick = async (e: React.SyntheticEvent<EventTarget>) => {
    if (!(e.target instanceof HTMLButtonElement)) {
      return;
    }
    const signUpResp = await signUpUser({
      variables: {
        email: state.signUpData?.email,
        role: e.target.dataset.role,
      },
    });
    document.cookie = `server-auth-token=${signUpResp.data.signUpUser.token}; path=/`;
    router.push('/');
  };
  return (
    <div className='flex flex-col items-center pt-10 mt-10'>
      <h1 className='text-4xl mb-6'>Welcome to ETH Global</h1>
      <h2 className='text-xl mb-6'>{"We're so glad to have you!"}</h2>
      <p className='mb-4'>What role are you applying for?</p>

      <div className='flex justify-around w-4/12'>
        <button
          onClick={handleClick}
          data-role='hacker'
          className='rounded-xl border-2 p-4'
        >
          Hacker
        </button>
        <button
          onClick={handleClick}
          data-role='partner'
          className='rounded-xl border-2 p-4'
        >
          Partner
        </button>
        <button
          onClick={handleClick}
          data-role='mentor'
          className='rounded-xl border-2 p-4'
        >
          Mentor
        </button>
      </div>
    </div>
  );
};
