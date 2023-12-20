import axios from 'axios';
import { FileInfo } from '../models';

export const fetchFilesInBoard = async (board_id: string) => {
    const res = await axios.get(`/api/file/${board_id}`);
    const board: FileInfo = res.data;
    return board;
};

export const saveFileInBoard = async (
    { fileName, boardId }: { fileName: string; boardId: number }
) => {
    const res = await axios.post(`/api/file/${boardId}`, {
        file_name: fileName
    });
    const response = res.data;
    return response;
};
