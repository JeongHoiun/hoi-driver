import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogProps,
    DialogTitle
} from '@mui/material';
import axios from 'axios';
import { useState } from 'react';
import HoiTextField from '../commons/HoiTextField';
import * as S from './styles';

export default function CreateNewBoardDialog(props: DialogProps) {
    const { open, onClose } = props;
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');

    const handleClose = () => {
        if (onClose) {
            onClose({}, 'escapeKeyDown');
        }
    };

    const handleCreateButtonClick = async () => {
        await axios.post('/api/boards', {
            name,
            password: password || null
        });
        handleClose();
    };

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>Create New Board</DialogTitle>
            <DialogContent>
                <S.CreateNewBoardContentDiv>
                    <HoiTextField
                        label="게시판 이름"
                        placeholder="Board name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </S.CreateNewBoardContentDiv>

                <S.CreateNewBoardContentDiv>
                    <HoiTextField
                        label="비밀번호 (비어있을 시 공개 게시판)"
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </S.CreateNewBoardContentDiv>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>
                <Button variant="contained" onClick={handleCreateButtonClick}>
                    Create
                </Button>
            </DialogActions>
        </Dialog>
    );
}
