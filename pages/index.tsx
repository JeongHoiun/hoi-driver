import Head from 'next/head';
import { Inter } from '@next/font/google';
import styles from '../styles/Home.module.css';
import Sidebar from '../components/commons/Sidebar';
import MainLayout from '../components/commons/MainLayout';

const inter = Inter({ subsets: ['latin'] });

function HomeContents() {
    return (
        <>
            <Head>
                <title>Hoi Driver</title>
                <meta name="description" content="Hoiun's driver" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <main className={styles.main}>
                <Sidebar />
            </main>
        </>
    );
}

export default function Home() {
    return <MainLayout>{HomeContents()}</MainLayout>;
}
