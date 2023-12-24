import { useMutation, useQuery } from '@tanstack/react-query';
import { fetchFilesInBoard, saveFileInBoard } from '../services/files';
import { queryClient } from '../pages/_app';
import { fetchSpecificPageItems } from '../aws/fetchFiles';

export function useFetchFilesInBoard(board_id: string, page: number) {
    return useQuery<{blobUris: string[], totalCount: number}, Error>(['files', board_id, page], async () => {
        const { files, totalCount } = await fetchFilesInBoard(board_id, page);
        const keys = files.map((file) => `${board_id}/${file.title}_${file.seq}`);
        const blobUris = await fetchSpecificPageItems(keys);
        return { blobUris, totalCount };
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
