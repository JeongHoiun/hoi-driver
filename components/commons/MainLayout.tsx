import Head from 'next/head';
import styles from '../../styles/Home.module.css';
import Sidebar from './Sidebar';

interface Props {
    children: React.ReactNode;
}

export default function MainLayout(props: Props) {
    const { children } = props;
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
                {children}
            </main>
        </>
    );
}
