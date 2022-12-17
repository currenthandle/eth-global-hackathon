// import Head from 'next/head';
// import Image from 'next/image';
// import ClientOnly from '../components/ClientOnly';
// import { Sample } from '../components/Sample';
// import styles from '../styles/Home.module.css';
import { useRouter } from 'next/router';
import {
  type GetServerSideProps,
  type GetServerSidePropsContext,
  type NextPage,
} from 'next';
import Header from '../components/Header';
import ProfileEditor from '../components/ProfileEditor';
import ClientOnly from '../components/ClientOnly';
import { useEffect, useLayoutEffect } from 'react';

// export default function Home(): NextPage {
const Home: NextPage = (props) => {
  console.log('props', props);
  const router = useRouter();
  useEffect(() => {
    if (!document.cookie) {
      console.log('redirecting');
      router.push('/login');
    }
  }, [router]);
  console.log('props', props);

  return (
    <main className='bg-project-blur bg-contain bg-no-repeat pb-20  pt-8 '>
      <Header />
      <ClientOnly>
        <ProfileEditor userSsr={props.userSsr} />
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

            telegram
            twitter
            otherEvents
            reasonForSupporting
            reasonForMentoring
          }
        }
      `,
    }),
  });
  const json = await resp.json();
  // const text = await resp.text();
  // console.log('text', text);
  return {
    props: {
      userSsr: json.data.userData,
    },
  };
};
