var mysql = require('mysql');

/**
 * Define connection pool and configurations
 */
/* var pool = mysql. createPool({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'zaq12wsx',
    database: 'auth_db',
    timezone: '+05:30',
    supportBigNumbers: true,
    dateStrings: true,
    connectionLimit: 10
}); */

var pool = mysql. createPool({
    host: 'us-cdbr-iron-east-01.cleardb.net',
    port: 3306,
    user: 'b61bf5ce585674',
    password: '5e9ff621',
    database: 'heroku_328778fabfa24e4',
    timezone: '+05:30',
    supportBigNumbers: true,
    dateStrings: true,
    connectionLimit: 10
});

// export the module
module.exports = pool;