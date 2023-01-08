import { useQuery, useQueryClient } from 'react-query';
import { Board } from '../models';
import { fetchBoards } from '../services/boards';

export function useFetchBoards() {
    const queryClient = useQueryClient();
    const { data: boards } = useQuery<Board[], Error>('boards', fetchBoards);
    return { boards, queryClient };
}
