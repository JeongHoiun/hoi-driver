import axios from 'axios';
import { FileInfo } from '../models';

export const fetchFilesInBoard = async (board_id: string) => {
    const res = await axios.get(`/api/file/${board_id}`);
    const board: FileInfo = res.data;
    return board;
};

export const saveFileInBoard = async (fileNames: string[], boardId: number) => {
    const res = await axios.post(`/api/file/${boardId}`, {
        file_names: fileNames
    });
    const response = res.data;
    return response;
};
