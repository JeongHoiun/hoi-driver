import { useQuery } from '@tanstack/react-query';
import { fetchSpecificPageItems } from '../aws/fetchFiles';

/**
 *
 * @param keys : key of the file (board_id/file_name_seq)
 * @returns blob Urls
 */
export function useFetchImages(keys: string[]) {
    return useQuery<string[], Error>(['images', keys], () => fetchSpecificPageItems(keys));
}
