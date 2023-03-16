const db = require('./dbConnect');
const mysql = require('mysql');

const register = async (username, password, callback) => {
  let success = false;
  db.getConnection(async (err, connection) => {
    const sql = 'INSERT INTO user VALUES (?, ?)';
    const query = mysql.format(sql, [username, password]);

    await connection.query(query, (err, result) => {
      success = true;
      connection.release();
      callback();
    });
  });
  return success;
};

module.exports = {
  register,
};
