import axios from 'axios';
import { Board } from '../models';

export const fetchBoards = async () => {
    const res = await axios.get('/api/boards');
    const boards: Board[] = res.data;
    return boards;
};
