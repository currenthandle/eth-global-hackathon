import { useRouter } from 'next/router';
import { type GetServerSideProps, type GetServerSidePropsContext } from 'next';
import Header from '../components/Header';
import ProfileEditor from '../components/ProfileEditor';
import ClientOnly from '../components/ClientOnly';
import { useEffect } from 'react';
import { UserSsr } from '../utils/types';

const Home = ({ userSsr }: UserSsr) => {
  const router = useRouter();
  useEffect(() => {
    if (!document.cookie) {
      router.push('/login');
    }
  }, [router]);

  return (
    <main className='bg-project-blur bg-contain bg-no-repeat pb-20  pt-8 '>
      <Header />
      <ClientOnly>
        <ProfileEditor userSsr={userSsr} />
      </ClientOnly>
    </main>
  );
};

export default Home;

export const getServerSideProps: GetServerSideProps = async (
  ctx: GetServerSidePropsContext
) => {
  if (!ctx.req.cookies['server-auth-token']) {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    };
  }
  const resp = await fetch('http://localhost:3001', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Cookie: `server-auth-token=${ctx.req.cookies['server-auth-token']}`,
    },
    body: JSON.stringify({
      query: `
        query UserData {
          userData {
            email
            role
            firstName
            lastName
            github
            linkedin
            website
            yearsOfExp
            ethExp
            motivation
            builtBefore
            lookingToBuild
            rules
            organization
            telegram
            twitter
            otherEvents
            reasonForSupporting
            reasonForMentoring
            applicationStatus
          }
        }
      `,
    }),
  });
  const json = await resp.json();
  return {
    props: {
      userSsr: json.data.userData,
    },
  };
};
