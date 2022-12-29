// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import mysql_connection from '../../databases/connect';

type Data = {
    name: string;
};

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
    var queryString = 'SELECT * FROM board';

    mysql_connection.query(queryString, (err, rows, fields) => {
        res.status(200).json(rows);
    });
}
