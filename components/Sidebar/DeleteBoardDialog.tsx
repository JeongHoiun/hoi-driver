import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogProps,
    DialogTitle,
    Typography
} from '@mui/material';
import { Board } from '../../models';
import * as S from './styles';

interface Props {
    board: Board;
}

export default function DeleteBoardDialog(props: DialogProps & Props) {
    const { board, ...dialogProps } = props;
    const handleClose = () => {
        if (dialogProps.onClose) {
            dialogProps.onClose({}, 'escapeKeyDown');
        }
    };

    const handleDeleteButtonClick = async () => {
        await fetch('/api/boards', {
            method: 'delete',
            body: JSON.stringify({
                seq: board.seq
            })
        });
        handleClose();
    };

    return (
        <Dialog {...dialogProps}>
            <DialogTitle>Delete Board</DialogTitle>
            <DialogContent>
                <S.CreateNewBoardContentDiv>
                    <Typography variant="subtitle1">게시판 이름 :</Typography>
                    <Typography variant="body1">{board.name}</Typography>
                </S.CreateNewBoardContentDiv>

                <S.CreateNewBoardContentDiv>
                    <Typography variant="subtitle1">삭제하시겠습니까?</Typography>
                </S.CreateNewBoardContentDiv>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>
                <Button variant="contained" onClick={handleDeleteButtonClick}>
                    Delete
                </Button>
            </DialogActions>
        </Dialog>
    );
}
