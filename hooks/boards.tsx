import { useMutation, useQuery } from 'react-query';
import { Board } from '../models';
import { createBoard, deleteBoard, fetchBoards, updateBoard } from '../services/boards';

export function useFetchBoards() {
    return useQuery<Board[], Error>('boards', fetchBoards);
}

export function useCreateBoards() {
    return useMutation(
        'create_board',
        ({ name, password }: { name: string; password: string }) =>
            createBoard({ name, password })
    );
}

export function useDeleteBoards() {
    return useMutation('delete_board', (seq : number) => deleteBoard({ seq }));
}

export function useUpdateBoards() {
    return useMutation(
        'update_board',
        ({ seq, name }: { seq: number; name: string }) => updateBoard({ seq, name })
    );
}
