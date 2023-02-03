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
                if (req.query.board_id) {
                    const fetchBoardQueryString = `SELECT * FROM board WHERE seq=${req.query.board_id}`;
                    try {
                        mysql_connection.query(fetchBoardQueryString, (err, rows) => {
                            res.status(200).json(rows);
                            res.end();
                        });
                    } catch (err) {
                        res.status(500).json({ name: 'Internal Server Error' });
                        res.end();
                    }
                } else {
                    const fetchBoardListQueryString = 'SELECT * FROM board';

                    try {
                        mysql_connection.query(fetchBoardListQueryString, (err, rows) => {
                            res.status(200).json(rows);
                            res.end();
                        });
                    } catch (err) {
                        res.status(500).json({ name: 'Internal Server Error' });
                        res.end();
                    }
                }
                break;
            }
            case 'POST': {
                const { name, password } = req.body;

                const createBoardQueryString = 'INSERT INTO board (name, password) VALUES (?, ?)';
                try {
                    mysql_connection.query(
                        createBoardQueryString,
                        [name, password],
                        (err, rows) => {
                            res.status(200).json(rows);
                            res.end();
                        }
                    );
                } catch (err) {
                    res.status(500).json({ name: 'Internal Server Error' });
                    res.end();
                }
                break;
            }
            case 'PATCH': {
                const { name, seq } = req.body;

                const createBoardQueryString = 'UPDATE board SET name = (?) WHERE seq = (?)';
                try {
                    mysql_connection.query(createBoardQueryString, [name, seq], (err, rows) => {
                        res.status(200).json(rows);
                        res.end();
                    });
                } catch (err) {
                    res.status(500).json({ name: 'Internal Server Error' });
                    res.end();
                }
                break;
            }
            case 'DELETE': {
                const { seq } = req.body;

                const deleteBoardQueryString = 'DELETE FROM board where seq=(?)';
                try {
                    mysql_connection.query(deleteBoardQueryString, [seq], (err, rows) => {
                        res.status(200).json(rows);
                        res.end();
                    });
                } catch (err) {
                    res.status(500).json({ name: 'Internal Server Error' });
                    res.end();
                }
                break;
            }
            default: {
                res.status(404).json({ name: 'Not Found' });
                res.end();
            }
        }
    });
}
