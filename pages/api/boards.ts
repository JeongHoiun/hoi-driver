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

                try {
                    mysql_connection.query(fetchBoardListQueryString, (err, rows) => {
                        res.status(200).json(rows);
                        res.end();
                    });
                } catch (err) {
                    res.status(500).json({ name: 'Internal Server Error' });
                    res.end();
                }
                break;
            }
            case 'POST': {
                const { name, password } = JSON.parse(req.body);

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
            case 'DELETE': {
                const { seq } = JSON.parse(req.body);

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
