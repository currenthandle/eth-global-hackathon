import Head from 'next/head';
import Image from 'next/image';
import ClientOnly from '../components/ClientOnly';
import { Sample } from '../components/Sample';
// import styles from '../styles/Home.module.css';
import {
  type GetServerSideProps,
  type GetServerSidePropsContext,
  type NextPage,
} from 'next';
import { getServerAuthSession } from '../get-server-auth-session';

export default function Home() {
  return (
    <div>
      <h1>hello</h1>
      <ClientOnly>
        <Sample />
      </ClientOnly>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async (
  ctx: GetServerSidePropsContext
) => {
  const session = await getServerAuthSession(ctx);

  console.log('session', session);
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
