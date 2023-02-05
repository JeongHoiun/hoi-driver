import Head from 'next/head';
import Sidebar from '../Sidebar';
import * as S from './styles';

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
            <div style={{ display: 'flex' }}>
                <Sidebar />
                <S.MainContentDiv>{children}</S.MainContentDiv>
            </div>
        </>
    );
}
