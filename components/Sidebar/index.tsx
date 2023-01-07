import { Button } from '@mui/material';
import { useEffect, useState } from 'react';
import { Board } from '../../models';
import BoardListItem from './BoardListItem';
import CreateNewBoardDialog from './CreateNewBoardDialog';
import * as S from './styles';

export default function Sidebar() {
    const [groups, setGroups] = useState<Board[]>([]);
    const [openCreateNewBoardDialog, setOpenCreateNewBoardDialog] = useState(false);
    useEffect(() => {
        const fetchPhotos = async () => {
            const res = await fetch('/api/boards', {
                method: 'GET'
            });
            const arr: Board[] = await res.json();
            setGroups(arr);
        };
        fetchPhotos();
    }, []);

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
            {groups.map((group) => (
                <BoardListItem board={group} key={group.seq} />
            ))}
            <Button variant="contained" onClick={handleCreateNewBoardDialogOpen}>
                Create new board
            </Button>
        </S.SidebarRootDiv>
    );
}
