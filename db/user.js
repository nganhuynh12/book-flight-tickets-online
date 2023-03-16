const db = require('./dbConnect');
const mysql = require('mysql');
const bcrypt = require('bcrypt');

const register = async (username, password) => {
  return new Promise(async (resolve, reject) => {
    const hashedPassword = await bcrypt.hash(password, 10);
    db.getConnection(async (err, connection) => {
      const sql = 'INSERT INTO user VALUES (?, ?)';
      const query = mysql.format(sql, [username, hashedPassword]);

      await connection.query(query, (err, result) => {
        connection.release();
        if (err) throw err;
        resolve({ success: true, message: 'register success' });
      });
    });
  });
};

const login = async (username, password, callback) => {
  return new Promise((resolve, reject) => {
    db.getConnection(async (error, connection) => {
      if (error) throw error;
      const sql = 'SELECT * FROM user WHERE username = ?';
      const query = mysql.format(sql, [username]);

      await connection.query(query, async (error, result) => {
        connection.release();
        if (error) throw error;
        if (result.length == 0) {
        } else {
          const hashedPassword = result[0].password;
          if (await bcrypt.compare(password, hashedPassword)) {
            resolve({ success: true, message: 'login success' });
          }
        }
      });
    });
  });
};

module.exports = {
  register,
  login,
};
