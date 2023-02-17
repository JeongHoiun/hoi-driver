import { useRouter } from 'next/router';
import BoardComponent from '../../components/BoardComponent';
import MainLayout from '../../components/commons/MainLayout';

export default function Board() {
    const router = useRouter();
    const { board_id } = router.query;
    return <MainLayout>{board_id && <BoardComponent board_id={board_id as string} />}</MainLayout>;
}
