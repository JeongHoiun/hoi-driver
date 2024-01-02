import { Box, Button, Pagination, Typography } from '@mui/material';
import UploadIcon from '@mui/icons-material/Upload';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { useFetchBoardInfo } from '../../queries/boards';
import * as S from './styles';
import UploadDilaog from './UploadDialog';
import { useFetchFilesInBoard } from '../../queries/files';
import { ITEMS_PER_PAGE } from '../../models/consts';

interface Props {
    board_id: string;
    page: number;
}

export default function BoardComponent(props: Props) {
    const { board_id, page } = props;
    const { data: board } = useFetchBoardInfo(board_id);
    const [openUploadDialog, setOpenUploadDialog] = useState(false);
    const router = useRouter();
    const { data: filesResponse, isLoading: loadingImages } = useFetchFilesInBoard(board_id, page);
    const totalPage = Math.floor((filesResponse?.totalCount || 0) / ITEMS_PER_PAGE);

    const handleChangePage = (event: React.ChangeEvent<unknown>, value: number) => {
        const url = new URL(window.location.href);
        url.searchParams.set('page', value.toString());

        router.push(url);
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
            </S.BoardTitleDiv>
            {loadingImages && <Typography variant="h5">Loading...</Typography>}
            { !loadingImages
                && <>
                    <Box display="flex" width="100%" justifyContent="end">
                        <Pagination count={totalPage} page={page} onChange={handleChangePage} />
                    </Box>
                    {filesResponse?.blobUris?.map((imageUrl, index) =>
                        <img style={{ margin: '8px' }} src={imageUrl} key={index} alt={`Picture ${index}`} width="30%"/>
                    )}
                    <Box display="flex" width="100%" justifyContent="end">
                        <Pagination count={totalPage} page={page} onChange={handleChangePage} />
                    </Box>
                </>
            }
        </S.BoardDiv>
    );
}
