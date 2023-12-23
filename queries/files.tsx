import { useMutation, useQuery } from '@tanstack/react-query';
import { fetchFilesInBoard, saveFileInBoard } from '../services/files';
import { queryClient } from '../pages/_app';
import { fetchSpecificPageItems } from '../aws/fetchFiles';

export function useFetchFilesInBoard(board_id: string) {
    return useQuery<string[], Error>(['files', board_id], async () => {
        const files = await fetchFilesInBoard(board_id);
        const keys = files.map((file) => `${board_id}/${file.title}_${file.seq}`);
        return fetchSpecificPageItems(keys);
    });
}

export function useSaveFile() {
    return useMutation(
        ['save_file'],
        ({ files, boardId }: { files: File[]; boardId: string }) =>
            saveFileInBoard(files, boardId),
        { onSuccess: () => queryClient.fetchQuery({ queryKey: ['files'] }) }
    );
}
