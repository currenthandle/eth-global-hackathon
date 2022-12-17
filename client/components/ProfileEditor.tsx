import Image from 'next/image';
import { UserSsr } from '../utils/types';
import HackerEditor from './HackerEditor';
import MentorEditor from './MentorEditor';
import PartnerEditor from './PartnerEditor';

const ProfileEditor = ({ userSsr }: UserSsr) => {
  return (
    <div className='border-[1px] rounded-3xl border-[#dadadb] bg-white p-8 w-8/12 max-w-2xl m-auto mt-14'>
      {/* <Image src='/team-header.webp' alt='Team Header' fill></Image> */}
      {userSsr.role === 'hacker' && <HackerEditor userSsr={userSsr} />}
      {userSsr.role === 'partner' && <PartnerEditor userSsr={userSsr} />}
      {userSsr.role === 'mentor' && <MentorEditor userSsr={userSsr} />}
    </div>
  );
};
export default ProfileEditor;
