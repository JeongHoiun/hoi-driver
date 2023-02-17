import { Button, Typography } from '@mui/material';
import UploadIcon from '@mui/icons-material/Upload';
import { useFetchBoardInfo } from '../../queries/boards';
import * as S from './styles';

interface Props {
    board_id: string;
}

export default function BoardComponent(props: Props) {
    const { board_id } = props;
    const { data: board } = useFetchBoardInfo(board_id);
    return (
        <S.BoardDiv>
            <S.BoardTitleDiv>
                <Typography variant="h3" fontWeight={600}>
                    {board?.name}
                </Typography>
                <Button variant="contained">
                    <UploadIcon />
                    Upload
                </Button>
            </S.BoardTitleDiv>
        </S.BoardDiv>
    );
}
