import { IconButton, styled } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Link from 'next/link';

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

export const BoardListItemRootDiv = styled('div')({
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    padding: '8px',
    '&:hover': {
        backgroundColor: '#f3f3f3'
    }
});

export const BoardListItemButton = styled(Link)({
    width: '136px',
    display: 'flex',
    alignItems: 'center',
    color: '#666',
    fontSize: '14px',
    '&:hover': {
        color: '#333'
    }
});

export const MoreIconButton = styled(IconButton)({
    borderRadius: '0px',
    marginLeft: 'auto',
    padding: '0px'
});

export const MoreIcon = styled(MoreVertIcon)({
    width: '24px',
    height: '24px'
});
