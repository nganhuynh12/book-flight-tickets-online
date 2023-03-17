const db = require('./dbConnect');
const mysql = require('mysql');

const findAll = (tableName) => {
  return new Promise(async (resolve) => {
    db.getConnection(async (error, connection) => {
      if (error) throw error;
      const sql = `SELECT * FROM ${tableName}`;
      const query = mysql.format(sql);
      await connection.query(query, (error, result) => {
        connection.release();
        if (error) throw error;
        resolve(result);
      });
    });
  });
};

module.exports = {
  findAll,
};
