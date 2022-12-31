import { useRouter } from 'next/router';
import MainLayout from '../../components/commons/MainLayout';

function BoardContents() {
    const router = useRouter();
    const { board_id } = router.query;
    return <div>{board_id}</div>;
}

export default function Board() {
    return (
        <MainLayout>
            <BoardContents />
        </MainLayout>
    );
}
