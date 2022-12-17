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
    console.log('e.target.dataset.role,', e.target.dataset.role);
    const signUpResp = await signUpUser({
      variables: {
        email: state.signUpData?.email,
        password: state.signUpData?.password,
        role: e.target.dataset.role,
      },
    });
    document.cookie = `server-auth-token=${signUpResp.data.signUpUser.token}; path=/`;
    router.push('/');
  };
  return (
    <div className='flex flex-col items-center'>
      <h2>What are you?</h2>

      <div className='flex justify-center'>
        <button
          onClick={handleClick}
          data-role='hacker'
          className='rounded-lg border-2 p-6'
        >
          Hacker
        </button>
        <button
          onClick={handleClick}
          data-role='mentor'
          className='rounded-lg border-2 p-6'
        >
          Mentor
        </button>
        <button
          onClick={handleClick}
          data-role='partner'
          className='rounded-lg border-2 p-6'
        >
          Partner
        </button>
      </div>
    </div>
  );
};
