import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogProps,
    DialogTitle
} from '@mui/material';
import { useState } from 'react';
import { useUpdateBoards } from '../../queries/boards';
import { Board } from '../../models';
import HoiTextField from '../commons/HoiTextField';
import * as S from './styles';

interface Props {
    board: Board;
}
export default function UpdateBoardDialog(props: Props & DialogProps) {
    const { open, onClose, board, ...dialogProps } = props;
    const [name, setName] = useState('');
    const { mutate } = useUpdateBoards();

    const handleClose = () => {
        if (onClose) {
            onClose({}, 'escapeKeyDown');
        }
    };

    const handleCreateButtonClick = async () => {
        mutate({ seq: board.seq, name });
        handleClose();
    };

    return (
        <Dialog open={open} onClose={onClose} {...dialogProps}>
            <DialogTitle>Update Board Name</DialogTitle>
            <DialogContent>
                <S.CreateNewBoardContentDiv>
                    <HoiTextField
                        label="게시판 이름"
                        placeholder="Board name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </S.CreateNewBoardContentDiv>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>
                <Button variant="contained" onClick={handleCreateButtonClick}>
                    Update
                </Button>
            </DialogActions>
        </Dialog>
    );
}
