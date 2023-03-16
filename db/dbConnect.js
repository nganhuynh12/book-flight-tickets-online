const mysql = require('mysql');

const db = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'svo',
});

module.exports = db;
