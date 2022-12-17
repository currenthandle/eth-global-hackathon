import Image from 'next/image';
import HackerEditor from './HackerEditor';
import PartnerEditor from './PartnerEditor';

const ProfileEditor = ({ userSsr }) => {
  // console.log('userSsr', userSsr  );

  return (
    <div className='border-2 rounded-3xl border-[#dadadb] bg-white p-8 w-8/12 max-w-2xl m-auto '>
      {/* <Image src='/team-header.webp' alt='Team Header' fill></Image> */}
      {userSsr.role === 'hacker' && <HackerEditor userSsr={userSsr} />}
      {userSsr.role === 'partner' && <PartnerEditor userSsr={userSsr} />}
    </div>
  );
};
export default ProfileEditor;
