import Image from 'next/image';
import { UserSsr } from '../utils/types';
import HackerEditor from './HackerEditor';
import MentorEditor from './MentorEditor';
import PartnerEditor from './PartnerEditor';

const ProfileEditor = ({ userSsr }: UserSsr) => {
  return (
    <div className='border-[1px] rounded-3xl border-[#dadadb] bg-white p-8 px-4 w-8/12 max-w-2xl m-auto mt-14'>
      <Image
        src='/team-header.webp'
        alt='Team Header'
        width={1000}
        height={300}
      ></Image>
      <div className='w-full flex justify-center'>
        <h1 className='text-5xl font-bold my-4 '>Edit profile</h1>
      </div>
      <div className='w-full flex justify-center'>
        <p className='text-[#737374] mb-10'>
          Change your profile and account settings
        </p>
      </div>
      {userSsr.role === 'hacker' && <HackerEditor userSsr={userSsr} />}
      {userSsr.role === 'partner' && <PartnerEditor userSsr={userSsr} />}
      {userSsr.role === 'mentor' && <MentorEditor userSsr={userSsr} />}
    </div>
  );
};
export default ProfileEditor;
