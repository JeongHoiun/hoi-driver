import { Button, List, styled } from '@mui/material';

export const BoardDiv = styled('div')({
    width: '100%',
    padding: '64px',
    height: '100%'
});

export const BoardTitleDiv = styled('div')({
    display: 'flex',
    alignItems: 'center',
    gap: '32px'
});

export const UploadDialogContentDiv = styled('div')({
    minWidth: '400px'
});

export const UploadDialogButton = styled(Button)({
    margin: '16px 0px',
    width: '100%'
});

export const SelectedFileList = styled(List)({
    border: '1px solid #ccc',
    maxHeight: '400px',
    overflow: 'auto',
    marginBottom: '16px'
});
