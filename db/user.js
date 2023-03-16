const db = require('./dbConnect');
const mysql = require('mysql');
const bcrypt = require('bcrypt');

const register = async (email, password) => {
  return new Promise(async (resolve, reject) => {
    const hashedPassword = await bcrypt.hash(password, 10);
    db.getConnection(async (err, connection) => {
      const sql = 'INSERT INTO user (email, password) VALUES (?, ?)';
      const query = mysql.format(sql, [email, hashedPassword]);

      await connection.query(query, (err, result) => {
        connection.release();
        if (err) throw err;
        resolve({ success: true, message: 'register success' });
      });
    });
  });
};

const login = async (email, password, callback) => {
  return new Promise((resolve, reject) => {
    db.getConnection(async (error, connection) => {
      if (error) throw error;
      const sql = 'SELECT * FROM user WHERE email = ?';
      const query = mysql.format(sql, [email]);

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

const findAllUser = () => {
  return new Promise((resolve, reject) => {
    db.getConnection(async (error, connection) => {
      if (error) throw error;
      const sql = 'SELECT * FROM user';
      const query = mysql.format(sql);

      await connection.query(query, (error, result) => {
        if (error) throw error;
        connection.release();
        resolve(result);
      });
    });
  });
};

const findUserById = (id) => {
  return new Promise((resolve, reject) => {
    db.getConnection(async (error, connection) => {
      if (error) throw error;
      const sql = 'SELECT * FROM user WHERE id = ?';
      const query = mysql.format(sql, [id]);

      await connection.query(query, (error, result) => {
        if (error) throw error;
        connection.release();
        resolve(result);
      });
    });
  });
};

const updateUserById = (id, user) => {
  return new Promise((resolve, reject) => {
    db.getConnection(async (error, connection) => {
      if (error) throw error;
      const sql =
        'UPDATE user SET email = ?, username = ?, password = ?, gender = ?, phone = ?, address = ? WHERE id = ?';
      const query = mysql.format(sql, [
        user.email,
        user.username,
        user.password,
        user.gender,
        user.phone,
        user.address,
        id,
      ]);

      await connection.query(query, (error, result) => {
        if (error) throw error;
        connection.release();
        resolve({ success: true, message: 'update user success' });
      });
    });
  });
};

const deleteUserById = (id) => {
  return new Promise((resolve, reject) => {
    db.getConnection(async (error, connection) => {
      if (error) throw error;
      const sql = 'DELETE FROM user WHERE id = ?';
      const query = mysql.format(sql, [id]);

      await connection.query(query, (error, result) => {
        if (error) throw error;
        connection.release();
        resolve({ success: true, message: 'delete user success' });
      });
    });
  });
};

module.exports = {
  register,
  login,
  findAllUser,
  findUserById,
  updateUserById,
  deleteUserById,
};
