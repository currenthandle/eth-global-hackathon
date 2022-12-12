import { signOut, useSession } from 'next-auth/react';

const Header = () => {
  return (
    <div className='flex justify-end items-center m-4'>
      <button
        className='rounded-lg border-2 p-6'
        onClick={() => {
          signOut();
        }}
      >
        Sign Out
      </button>
    </div>
  );
};
export default Header;
