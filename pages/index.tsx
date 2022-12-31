import MainLayout from '../components/commons/MainLayout';

function HomeContents() {
    return <>This is Home</>;
}

export default function Home() {
    return <MainLayout>{HomeContents()}</MainLayout>;
}
