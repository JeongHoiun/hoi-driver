import { useMutation, useQuery } from '@tanstack/react-query';
import { Board } from '../models';
import { queryClient } from '../pages/_app';
import { createBoard, deleteBoard, fetchBoards, updateBoard } from '../services/boards';

export function useFetchBoards() {
    return useQuery<Board[], Error>(['boards'], fetchBoards);
}

export function useCreateBoards() {
    return useMutation(
        ['create_board'],
        ({ name, password }: { name: string; password: string }) => createBoard({ name, password }),
        { onSuccess: () => queryClient.fetchQuery({ queryKey: ['boards'] }) }
    );
}

export function useDeleteBoards() {
    return useMutation(['delete_board'], (seq: number) => deleteBoard({ seq }), {
        onSuccess: () => queryClient.fetchQuery({ queryKey: ['boards'] })
    });
}

export function useUpdateBoards() {
    return useMutation(
        ['update_board'],
        ({ seq, name }: { seq: number; name: string }) => updateBoard({ seq, name }),
        { onSuccess: () => queryClient.fetchQuery({ queryKey: ['boards'] }) }
    );
}
