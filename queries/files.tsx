import { useMutation, useQuery } from '@tanstack/react-query';
import { FileInfo } from '../models';
import { fetchFilesInBoard, saveFileInBoard } from '../services/files';
import { queryClient } from '../pages/_app';

export function useFetchBoardInfo(board_id: string) {
    return useQuery<FileInfo, Error>(['board', board_id], () => fetchFilesInBoard(board_id));
}

export function useSaveFile() {
    return useMutation(
        ['save_file'],
        ({ fileNames, boardId }: { fileNames: string[]; boardId: number }) =>
            saveFileInBoard(fileNames, boardId),
        { onSuccess: () => queryClient.fetchQuery({ queryKey: ['files'] }) }
    );
}
