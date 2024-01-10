// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import mysql_connection from '../../../databases/connect';
import { FileInfo } from '../../../models';
import { ITEMS_PER_PAGE } from '../../../models/consts';

type FilesResponse = {
    files: FileInfo[],
    totalCount: number,
};

export default async function handler(
    req: NextApiRequest, res: NextApiResponse<FilesResponse | Error>
) {
    return new Promise(() => {
        switch (req.method) {
            case 'GET': {
                const { board_id, page } = req.query;
                const safetyPage = page ? +page : 1;
                const fetchBoardQueryString = `SELECT * FROM file WHERE board_id=${board_id} LIMIT ${ITEMS_PER_PAGE} OFFSET ${(safetyPage - 1) * ITEMS_PER_PAGE}`;
                const boardFilesCountQueryString = `SELECT COUNT(*) as count FROM file WHERE board_id=${board_id}`;

                mysql_connection.query(boardFilesCountQueryString, (err, count) => {
                    if (err) {
                        res.status(500).json(new Error('Internal Server Error'));
                        res.end();
                    }
                    mysql_connection.query(fetchBoardQueryString, (err2, rows) => {
                        if (err) {
                            res.status(500).json(new Error('Internal Server Error'));
                            res.end();
                        } else {
                            res.status(200).json({
                                totalCount: count[0].count,
                                files: rows
                            });
                            res.end();
                        }
                    });
                });
                break;
            }
            case 'POST': {
                const { file_names, tags } : { file_names:string[], tags: string[] } = req.body;
                const fetchBoardQueryString = 'INSERT INTO file (title, board_id, tags) VALUES ?';
                mysql_connection.query(fetchBoardQueryString,
                    [file_names.map((fileName) => [fileName, req.query.board_id, tags.join(',')])],
                    (err, rows) => {
                        if (err) {
                            res.status(500).json(new Error('Internal Server Error'));
                            res.end();
                        } else {
                            res.status(200).json(rows);
                            res.end();
                        }
                    });
                break;
            }
            default: {
                res.status(405).json(new Error('Internal Server Error'));
                res.end();
            }
        }
    });
}
