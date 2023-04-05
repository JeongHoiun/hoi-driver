import { Button, Typography } from '@mui/material';
import UploadIcon from '@mui/icons-material/Upload';
import { useEffect, useState } from 'react';
import { useFetchBoardInfo } from '../../queries/boards';
import * as S from './styles';
import UploadDilaog from './UploadDialog';
import { fetchImages } from '../../aws/fetchImages';

interface Props {
    board_id: string;
}

export default function BoardComponent(props: Props) {
    const { board_id } = props;
    const { data: board } = useFetchBoardInfo(board_id);
    const [openUploadDialog, setOpenUploadDialog] = useState(false);
    const [imagesUrls, setImagesUrls] = useState<string[] | null>([]);

    const handleButtonClick = async () => {
        // eslint-disable-next-line react-hooks/rules-of-hooks
        await fetchImages('1').then((v) => {
            setImagesUrls(v);
        });
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
            {imagesUrls?.map((imageUrl, index) => (
                <img src={imageUrl} key={index} />
            ))}
        </S.BoardDiv>
    );
}
