import { useQuery } from 'react-query';
import { Board } from '../models';
import { fetchBoards } from '../services/boards';

export function useFetchBoards() {
    return useQuery<Board[], Error>('boards', fetchBoards);
}
