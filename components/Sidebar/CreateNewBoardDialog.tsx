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
import * as S from './styles';

export default function CreateNewBoardDialog(props: DialogProps) {
    const { open, onClose } = props;
    const handleClose = () => {
        if (onClose) {
            onClose({}, 'escapeKeyDown');
        }
    };
    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>Create New Board</DialogTitle>
            <DialogContent>
                <S.CreateNewBoardContentDiv>
                    <Typography>게시판 이름</Typography>
                    <TextField placeholder="Board name" />
                </S.CreateNewBoardContentDiv>

                <S.CreateNewBoardContentDiv>
                    <Typography>비밀번호 (비어있을 시 공개 게시판)</Typography>
                    <TextField placeholder="Password" />
                </S.CreateNewBoardContentDiv>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>
                <Button variant="contained" onClick={handleClose}>
                    Create
                </Button>
            </DialogActions>
        </Dialog>
    );
}
