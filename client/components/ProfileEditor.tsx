import HackerEditor from './HackerEditor';

const ProfileEditor = ({ userSsr }) => {
  // console.log('userSsr', userSsr  );

  return (
    <div className='flex justify-center border-2 rounded-3xl border-[#dadadb] bg-white p-8 w-8/12 max-w-2xl m-auto '>
      {userSsr.role === 'hacker' && <HackerEditor userSsr={userSsr} />}
    </div>
  );
};
export default ProfileEditor;
