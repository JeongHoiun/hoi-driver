import { useFetchBoardInfo } from '../../queries/boards';

interface Props {
    board_id: string;
}

export default function BoardComponent(props: Props) {
    const { board_id } = props;
    const { data: board } = useFetchBoardInfo(board_id);
    return <div>{board?.name}</div>;
}
