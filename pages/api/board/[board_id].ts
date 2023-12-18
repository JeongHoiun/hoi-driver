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
                const fetchBoardQueryString = `SELECT * FROM board WHERE seq=${req.query.board_id}`;
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
            default: {
                res.status(405).json({ name: 'Method Not Allowed' });
                res.end();
            }
        }
    });
}
