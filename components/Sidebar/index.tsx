import { Button } from '@mui/material';
import { useState } from 'react';
import { useFetchBoards } from '../../queries/boards';
import BoardListItem from './BoardListItem';
import CreateNewBoardDialog from './CreateNewBoardDialog';
import * as S from './styles';

export default function Sidebar() {
    const [openCreateNewBoardDialog, setOpenCreateNewBoardDialog] = useState(false);
    const { data: boards } = useFetchBoards();

    const handleCreateNewBoardDialogOpen = () => {
        setOpenCreateNewBoardDialog(true);
    };
    const handleCreateNewBoardDialogClose = () => {
        setOpenCreateNewBoardDialog(false);
    };

    return (
        <S.SidebarRootDiv>
            {openCreateNewBoardDialog && (
                <CreateNewBoardDialog
                    open={openCreateNewBoardDialog}
                    onClose={handleCreateNewBoardDialogClose}
                />
            )}
            <S.BoardListDiv>
                {boards?.map((board) => (
                    <BoardListItem board={board} key={board.seq} />
                ))}
            </S.BoardListDiv>
            <Button variant="contained" onClick={handleCreateNewBoardDialogOpen}>
                Create new board
            </Button>
        </S.SidebarRootDiv>
    );
}
