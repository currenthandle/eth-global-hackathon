// import Head from 'next/head';
// import Image from 'next/image';
// import ClientOnly from '../components/ClientOnly';
// import { Sample } from '../components/Sample';
// import styles from '../styles/Home.module.css';
import {
  type GetServerSideProps,
  type GetServerSidePropsContext,
  type NextPage,
} from 'next';
import { getServerAuthSession } from '../get-server-auth-session';
import { signOut, useSession } from 'next-auth/react';

// export default function Home(): NextPage {
const Home: NextPage = () => {
  const session = useSession();
  console.log('session', session);
  return (
    <div className='flex justify-center items-center  min-h-screen '>
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

export default Home;

export const getServerSideProps: GetServerSideProps = async (
  ctx: GetServerSidePropsContext
) => {
  const session = await getServerAuthSession(ctx);

  // console.log('session', session);
  if (!session) {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
      props: {},
    };
  }

  return {
    props: {
      session,
    },
  };
};
