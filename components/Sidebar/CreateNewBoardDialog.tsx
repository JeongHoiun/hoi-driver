import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogProps,
    DialogTitle,
    TextField
} from '@mui/material';

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
                <TextField placeholder="Board name" />
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
