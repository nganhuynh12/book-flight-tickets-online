const db = require('./dbConnect');
const mysql = require('mysql');
const bcript = require('bcrypt');

const register = async (username, password, callback) => {
  let success = false;
  const hashedPassword = await bcript.hash(password, 10);
  db.getConnection(async (err, connection) => {
    const sql = 'INSERT INTO user VALUES (?, ?)';
    const query = mysql.format(sql, [username, hashedPassword]);

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
