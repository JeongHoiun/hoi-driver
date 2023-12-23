// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import mysql_connection from '../../../databases/connect';

type Data = {
    name: string;
};

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
    return new Promise(() => {
        switch (req.method) {
            case 'GET': {
                const fetchBoardQueryString = `SELECT * FROM file WHERE board_id=${req.query.board_id}`;
                mysql_connection.query(fetchBoardQueryString, (err, rows) => {
                    if (err) {
                        res.status(500).json({ name: 'Internal Server Error' });
                        res.end();
                    } else {
                        res.status(200).json(rows[0]);
                        res.end();
                    }
                });
                break;
            }
            case 'POST': {
                const { file_names } : { file_names:string[] } = req.body;
                const fetchBoardQueryString = 'INSERT INTO file (title, board_id) VALUES ?';
                mysql_connection.query(fetchBoardQueryString,
                    [file_names.map((file_name) => [file_name, req.query.board_id])],
                    (err, rows) => {
                        if (err) {
                            res.status(500).json({ name: 'Internal Server Error' });
                            res.end();
                        } else {
                            res.status(200).json(rows[0]);
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
