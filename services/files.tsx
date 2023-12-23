import axios from 'axios';
import { FileInfo } from '../models';
import { uploadFiles } from '../aws/uploadFiles';

export const fetchFilesInBoard = async (board_id: string) => {
    const res = await axios.get(`/api/file/${board_id}`);
    const board: FileInfo[] = res.data;
    return board;
};

export const saveFileInBoard = async (files: File[], boardId: string) => {
    const res = await axios.post(`/api/file/${boardId}`, {
        file_names: files.map((file) => file.name)
    });
    await uploadFiles(files, boardId, res.data.insertId);
    const response = res.data;
    return response;
};
