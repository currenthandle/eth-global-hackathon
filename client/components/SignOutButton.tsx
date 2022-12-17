import { useRouter } from 'next/router';
import { useContext } from 'react';
import { DispatchContext } from '../utils/context';
import deleteAllCookies from '../utils/deleteAllCookies';
const SignOutButton = () => {
  const router = useRouter();
  const dispatch = useContext(DispatchContext);
  return (
    <button
      className=' border-2 px-8 py-4 rounded-full bg-white'
      onClick={() => {
        deleteAllCookies();
        router.push('/');
        dispatch({ type: 'CLEAR_SIGNUP_DATA' });
      }}
    >
      Sign Out
    </button>
  );
};
export default SignOutButton;
