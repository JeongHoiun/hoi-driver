import { Button } from '@mui/material';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { Board } from '../../models';
import * as S from './styles';

export default function Sidebar() {
    const [groups, setGroups] = useState<Board[]>([]);
    useEffect(() => {
        const fetchPhotos = async () => {
            const res = await fetch('/api/boards');
            const arr: Board[] = await res.json();
            setGroups(arr);
        };
        fetchPhotos();
    }, []);
    return (
        <S.SidebarRootDiv>
            {groups.map((group) => (
                <Button component={Link} href={`/${group.seq}`} variant="text" key={group.seq}>
                    {group.name}
                </Button>
            ))}
        </S.SidebarRootDiv>
    );
}
