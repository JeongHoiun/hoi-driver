import { Button, Typography } from '@mui/material';
import UploadIcon from '@mui/icons-material/Upload';
import { useState } from 'react';
import { useFetchBoardInfo } from '../../queries/boards';
import * as S from './styles';
import UploadDilaog from './UploadDialog';
import { useFetchFilesInBoard } from '../../queries/files';

interface Props {
    board_id: string;
}

export default function BoardComponent(props: Props) {
    const { board_id } = props;
    const { data: board } = useFetchBoardInfo(board_id);
    const [openUploadDialog, setOpenUploadDialog] = useState(false);
    const { data: images, isLoading: loadingImages } = useFetchFilesInBoard(board_id);

    return (
        <S.BoardDiv>
            {openUploadDialog && (
                <UploadDilaog
                    open={openUploadDialog}
                    onClose={() => setOpenUploadDialog(false)}
                    boardId={board_id}
                />
            )}
            <S.BoardTitleDiv>
                <Typography variant="h3" fontWeight={600}>
                    {board?.name}
                </Typography>
                <Button
                    style={{ marginLeft: 'auto' }}
                    variant="text"
                    onClick={() => setOpenUploadDialog(true)}
                >
                    <UploadIcon />
                    Upload
                </Button>
            </S.BoardTitleDiv>
            {loadingImages && <Typography variant="h5">Loading...</Typography>}
            {images?.map((imageUrl, index) => <img src={imageUrl} key={index} alt={`Picture ${index}`} width="30%"/>
            )}
        </S.BoardDiv>
    );
}
