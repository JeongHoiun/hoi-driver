import { useQuery } from '@tanstack/react-query';
import { fetchImages } from '../aws/fetchFiles';

export function useFetchImages(path: string, page: number) {
    return useQuery<string[], Error>(['images', path], () => fetchImages(path, page));
}
