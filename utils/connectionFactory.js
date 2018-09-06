const mysql = require('mysql');

/**
 * Define connection pool and configurations
 */
const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  database: process.env.DB_DATABASE,
  password: process.env.DB_PASS,
  port: 3306,
  timezone: '+05:30',
  supportBigNumbers: true,
  dateStrings: true,
  connectionLimit: 10,
});

// export the module
module.exports = pool;
