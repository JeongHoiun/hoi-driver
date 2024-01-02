import { useRouter } from 'next/router';
import { useSearchParams } from 'next/navigation';
import BoardComponent from '../../components/BoardComponent';
import MainLayout from '../../components/commons/MainLayout';

export default function Board() {
    const router = useRouter();
    const { board_id } = router.query;
    const searchParams = useSearchParams();
    const page = searchParams.get('page') || 1;
    return <MainLayout>
        {board_id && <BoardComponent board_id={board_id as string} page={+page} />}
    </MainLayout>;
}
