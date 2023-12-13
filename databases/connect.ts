import mysql from 'mysql';

const mysql_connection = mysql.createConnection({
    host: '127.0.0.1',
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME
});

export default mysql_connection;
