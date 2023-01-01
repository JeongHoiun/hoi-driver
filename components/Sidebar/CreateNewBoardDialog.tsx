import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogProps,
    DialogTitle,
    TextField,
    Typography
} from '@mui/material';
import { useState } from 'react';
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

    const handleCreateButtonClick = () => {
        const fetchPhotos = async () => {
            await fetch('/api/boards', {
                method: 'POST',
                body: JSON.stringify({
                    name,
                    password: password || null
                })
            });
        };
        fetchPhotos();
        handleClose();
    };

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>Create New Board</DialogTitle>
            <DialogContent>
                <S.CreateNewBoardContentDiv>
                    <Typography>게시판 이름</Typography>
                    <TextField
                        placeholder="Board name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </S.CreateNewBoardContentDiv>

                <S.CreateNewBoardContentDiv>
                    <Typography>비밀번호 (비어있을 시 공개 게시판)</Typography>
                    <TextField
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
