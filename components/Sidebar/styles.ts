import { styled } from '@mui/material';

export const SidebarRootDiv = styled('div')({
    display: 'flex',
    flexDirection: 'column',
    width: '240px',
    padding: '32px',
    height: '100vh',
    alignItems: 'center',
    gap: 16,
    borderRight: '1px solid #ccc'
});

export const CreateNewBoardContentDiv = styled('div')({
    display: 'flex',
    flexDirection: 'column',
    width: '380px',
    marginTop: '16px',
    '&:first-of-type': {
        marginTop: 0
    }
});
