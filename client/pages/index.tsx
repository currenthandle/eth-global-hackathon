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

  return (
    <main>
      <Header />
      <ClientOnly>
        <ProfileEditor initialData={props.initialData} />
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
  return {
    props: {},
  };
};
