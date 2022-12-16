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
  const handleClick = async () => {
    const signUpResp = await signUpUser(
      {
        variables: {
          email: state.signUpData.email,
          password: state.signUpData.password,
          // role: formValues.role,
        },
      }
      // {
      //   onCompleted: (data) => {
      //     console.log('data', data);
      //   },
      //   onError: (error) => {
      //     console.log('error', error);
      //   },
      // }
    );
    document.cookie = `server-auth-token=${signUpResp.data.signUpUser.token}; path=/`;
    router.push('/');
    // dispatch({ type: 'CLEAR_SIGNUP_DATA' });

    //   variables: {
    //     email: state.signUpData.email,
    //     password: state.signUpData.password,
    //     // role: formValues.role,
    //   },
    // });
    // console.log('hello');
    // if (signUpUserResp.data.signUpUser.__typename === 'Error') {
    //   setSignUpError(signUpUserResp.data.signUpUser.message);
    // }
    // if (signUpUserResp.data.signUpUser.__typename === 'UserWithToken') {
    //   document.cookie = `server-auth-token=${signUpUserResp.data.signUpUser.token}; path=/`;
    //   router.push('/');
    // }
  };
  // const signUpUserResp = await signUpUser({
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
          data-role='sponsor'
          className='rounded-lg border-2 p-6'
        >
          Sponsor
        </button>
      </div>
    </div>
  );
};
