// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import mysql_connection from '../../databases/connect';

type Data = {
    name: string;
};

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
    const queryString = 'SELECT * FROM board';

    mysql_connection.query(queryString, (err, rows) => {
        res.status(200).json(rows);
        res.end();
    });
}
