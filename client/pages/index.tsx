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
  console.log('ctx', ctx.req.cookies);
  // make a query to USER_DATA to get the initial values
  // useQuery(USER_DATA);
  // const { data: initialData, error: initialError } = useQuery(USER_DATA);

  const resp = await fetch('http://localhost:3001', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Cookie: `server-auth-token=${ctx.req.cookies['server-auth-token']}`,
    },
    body: JSON.stringify({
      query: `
        query {
          userData {
            email
            firstName
            lastName
            student
            school
            country
            company
            website
            github
            twitter
            telegram
            linkedin
          }
        }
      `,
    }),
  });
  const json = await resp.json();
  console.log('json', json);
  // const text = await resp.text();
  // console.log('text', text);
  return {
    props: {
      initialData: json,
      // initialData: text,
    },
  };
};

// export const getServerSideProps: GetServerSideProps = async (
//   ctx: GetServerSidePropsContext
// ) => {
//   const session = await getServerAuthSession(ctx);

//   // console.log('session', session);
//   if (!session) {
//     return {
//       redirect: {
//         destination: '/login',
//         permanent: false,
//       },
//       props: {},
//     };
//   }

//   return {
//     props: {
//       session,
//     },
//   };
// };
