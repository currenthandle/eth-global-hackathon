import HackerEditor from './HackerEditor';

const ProfileEditor = ({ userSsr }) => {
  // console.log('userSsr', userSsr  );
  return (
    <div className='flex justify-center'>
      {userSsr.role === 'hacker' && <HackerEditor userSsr={userSsr} />}
    </div>
  );
};
export default ProfileEditor;
