import Head from 'next/head';
import Image from 'next/image';
import ClientOnly from '../components/ClientOnly';
import { Sample } from '../components/Sample';
// import styles from '../styles/Home.module.css';

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
