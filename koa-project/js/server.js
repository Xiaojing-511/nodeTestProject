const mysql = require('mysql');
// 建立连接池
var pool = mysql.createPool({
    connectionLimit: 10,
    host: '127.0.0.1',
    user: 'root',
    password: 'ab123456',
    database: 'myblogs'
});

function query(sql) {
    return new Promise((resolve, reject) => {
        // console.log(pool,pool.getConnection);
        pool.getConnection(function (err, connection) {
            if (err) reject(err);
            connection.query(sql, function (error, results) {
                connection.release();
                if (error) {
                    reject(error);
                } else {
                    resolve(results);
                }
            });
        });
    });
}

module.exports = { query };
 