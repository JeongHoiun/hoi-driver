import { Button, Typography } from '@mui/material';
import UploadIcon from '@mui/icons-material/Upload';
import { useState } from 'react';
import Image from 'next/image';
import { useFetchBoardInfo } from '../../queries/boards';
import * as S from './styles';
import UploadDilaog from './UploadDialog';
import { useFetchImages } from '../../aws/useFetchImages';

interface Props {
    board_id: string;
}

export default function BoardComponent(props: Props) {
    const { board_id } = props;
    const { data: board } = useFetchBoardInfo(board_id);
    const [openUploadDialog, setOpenUploadDialog] = useState(false);
    const { fetchImages, photoUrls } = useFetchImages();

    const handleButtonClick = async () => {
        await fetchImages('1');
    };

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
                <Button onClick={handleButtonClick}>asdfasdf</Button>
            </S.BoardTitleDiv>
            {photoUrls?.map((imageUrl, index) => <Image src={imageUrl} key={index} alt={`Picture ${index}`} width="180" height="180"/>
            )}
        </S.BoardDiv>
    );
}
