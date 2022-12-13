import { useRouter } from 'next/router';
import deleteAllCookies from '../utils/deleteAllCookies';

const Header = () => {
  const router = useRouter();
  return (
    <div className='flex justify-end items-center m-4'>
      <button
        className='rounded-lg border-2 p-6'
        onClick={() => {
          deleteAllCookies();
          router.push('/');
        }}
      >
        Sign Out
      </button>
    </div>
  );
};
export default Header;
