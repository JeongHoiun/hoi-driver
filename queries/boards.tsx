import { useMutation, useQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { Board } from '../models';
import { queryClient } from '../pages/_app';
import {
    createBoard,
    deleteBoard,
    fetchBoardInfo,
    fetchBoards,
    updateBoard
} from '../services/boards';

export function useFetchBoards() {
    return useQuery<Board[], AxiosError>(['boards'], fetchBoards);
}

export function useFetchBoardInfo(board_id: string) {
    return useQuery<Board, Error>(['board', board_id], () => fetchBoardInfo(board_id));
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
