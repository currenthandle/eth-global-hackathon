import Image from 'next/image';
import HackerEditor from './HackerEditor';
import MentorEditor from './MentorEditor';
import PartnerEditor from './PartnerEditor';

const ProfileEditor = ({ userSsr }) => {
  // console.log('userSsr', userSsr  );

  return (
    <div className='border-[1px] rounded-3xl border-[#dadadb] bg-white p-8 w-8/12 max-w-2xl m-auto mt-14'>
      <div className='bg-[#f4f4f5] mb-6 rounded-md border-2 border-[#dadadb] h-14 px-4 flex items-center cursor-no-drop text-sm'>
        {userSsr.email}
      </div>
      {/* <Image src='/team-header.webp' alt='Team Header' fill></Image> */}
      {userSsr.role === 'hacker' && <HackerEditor userSsr={userSsr} />}
      {userSsr.role === 'partner' && <PartnerEditor userSsr={userSsr} />}
      {userSsr.role === 'mentor' && <MentorEditor userSsr={userSsr} />}
    </div>
  );
};
export default ProfileEditor;
