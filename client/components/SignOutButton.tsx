import { useRouter } from 'next/router';
import deleteAllCookies from '../utils/deleteAllCookies';
const SignOutButton = () => {
  const router = useRouter();
  return (
    <button
      className='rounded-lg border-2 p-6'
      onClick={() => {
        deleteAllCookies();
        router.push('/');
      }}
    >
      Sign Out
    </button>
  );
};
export default SignOutButton;
