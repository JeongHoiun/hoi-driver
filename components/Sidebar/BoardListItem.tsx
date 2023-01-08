import { useState } from 'react';
import { Button, Popover } from '@mui/material';
import { Board } from '../../models';
import * as S from './styles';
import DeleteBoardDialog from './DeleteBoardDialog';
import UpdateBoardDialog from './UpdateBoardDialog';

interface Props {
    board: Board;
}

export default function BoardListItem(props: Props) {
    const { board } = props;
    const [itemMenuVisible, setItemMenuVisible] = useState(false);
    const [menuAnchorEl, setMenuAnchorEl] = useState<null | HTMLElement>(null);
    const [openDeleteBoardDialog, setOpenDeleteBoardDialog] = useState(false);
    const [openUpdateBoardDialog, setOpenUpdateBoardDialog] = useState(false);

    const handleMenuItemClick = (event: React.MouseEvent<HTMLElement>) => {
        setMenuAnchorEl(event.currentTarget);
        setItemMenuVisible(false);
        event.stopPropagation();
    };

    const handleMenuClose = () => {
        setMenuAnchorEl(null);
    };

    return (
        <S.BoardListItemRootDiv
            onMouseEnter={() => setItemMenuVisible(true)}
            onMouseLeave={() => setItemMenuVisible(false)}
        >
            {openDeleteBoardDialog && (
                <DeleteBoardDialog
                    open={openDeleteBoardDialog}
                    onClose={() => setOpenDeleteBoardDialog(false)}
                    board={board}
                />
            )}
            {openUpdateBoardDialog && (
                <UpdateBoardDialog
                    open={openUpdateBoardDialog}
                    onClose={() => setOpenUpdateBoardDialog(false)}
                    board={board}
                />
            )}
            <S.BoardListItemButton href={`/${board.seq}`}>{board.name}</S.BoardListItemButton>
            <S.MoreIconButton
                style={{ visibility: itemMenuVisible ? 'visible' : 'hidden' }}
                size="small"
                onClick={handleMenuItemClick}
            >
                <S.MoreIcon />
            </S.MoreIconButton>
            <Popover open={menuAnchorEl !== null} anchorEl={menuAnchorEl} onClose={handleMenuClose}>
                <div>
                    <Button variant="text" onClick={() => setOpenUpdateBoardDialog(true)}>
                        수정
                    </Button>
                    <Button
                        color="secondary"
                        variant="text"
                        onClick={() => setOpenDeleteBoardDialog(true)}
                    >
                        삭제
                    </Button>
                </div>
            </Popover>
        </S.BoardListItemRootDiv>
    );
}
