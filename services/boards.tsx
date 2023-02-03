import axios from 'axios';
import { Board } from '../models';

export const fetchBoards = async () => {
    const res = await axios.get('/api/boards');
    const boards: Board[] = res.data;
    return boards;
};

export const fetchBoardInfo = async (board_id: string) => {
    const res = await axios.get(`/api/board/${board_id}`);
    const board: Board = res.data;
    return board;
};

export const createBoard = async ({ name, password }: { name: string; password: string }) => {
    const res = await axios.post('/api/boards', {
        name,
        password: password || null
    });
    const createdBoard: Board = res.data;
    return createdBoard;
};

export const deleteBoard = async ({ seq }: { seq: number }) => {
    await axios.delete('/api/boards', {
        data: {
            seq
        }
    });
};

export const updateBoard = async ({ seq, name }: { seq: number; name: string }) => {
    await axios.patch('/api/boards', {
        seq,
        name
    });
};
