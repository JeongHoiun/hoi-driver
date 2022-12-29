import mysql from 'mysql';

const mysql_connection = mysql.createConnection({
    host: 'localhost',
    user: 'hoiun',
    password: '46wh6386!',
    database: 'hoi_driver'
});

export default mysql_connection;
