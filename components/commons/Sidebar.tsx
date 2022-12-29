import { Button } from '@mui/material';
import * as S from './styles';

export default function Sidebar() {
    return (
        <S.SidebarRootDiv>
            <Button variant="text">Group 1</Button>
            <Button variant="text">Group 2</Button>
            <Button variant="text">Group 3</Button>
        </S.SidebarRootDiv>
    );
}
