// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import mysql_connection from '../../databases/connect';

type Data = {
    name: string;
};

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
    return new Promise(() => {
        switch (req.method) {
            case 'GET': {
                const fetchBoardListQueryString = 'SELECT * FROM board';
                mysql_connection.query(fetchBoardListQueryString, (err, rows) => {
                    if (err) {
                        res.status(500).json({ name: 'Internal Server Error' });
                        res.end();
                    } else {
                        res.status(200).json(rows);
                        res.end();
                    }
                });
                break;
            }
            case 'POST': {
                const { name, password } = req.body;
                const createBoardQueryString = 'INSERT INTO board (name, password) VALUES (?, ?)';
                mysql_connection.query(createBoardQueryString, [name, password], (err, rows) => {
                    if (err) {
                        res.status(500).json({ name: 'Internal Server Error' });
                        res.end();
                    } else {
                        res.status(200).json(rows);
                        res.end();
                    }
                });
                break;
            }
            case 'PATCH': {
                const { name, seq } = req.body;

                const createBoardQueryString = 'UPDATE board SET name = (?) WHERE seq = (?)';
                mysql_connection.query(createBoardQueryString, [name, seq], (err, rows) => {
                    if (err) {
                        res.status(500).json({ name: 'Internal Server Error' });
                        res.end();
                    } else {
                        res.status(200).json(rows);
                        res.end();
                    }
                });
                break;
            }
            case 'DELETE': {
                const { seq } = req.body;

                const deleteBoardQueryString = 'DELETE FROM board where seq=(?)';
                mysql_connection.query(deleteBoardQueryString, [seq], (err, rows) => {
                    if (err) {
                        res.status(500).json({ name: 'Internal Server Error' });
                        res.end();
                    } else {
                        res.status(200).json(rows);
                        res.end();
                    }
                });
                break;
            }
            default: {
                res.status(405).json({ name: 'Method Not Allowed' });
                res.end();
            }
        }
    });
}
