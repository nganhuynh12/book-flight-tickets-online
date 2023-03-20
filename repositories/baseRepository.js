const { genInsertQuery } = require('../utils');
const mysql = require('mysql');

const db = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'svo',
});

class baseRepository {
  constructor(tableName) {
    this.tableName = tableName;
  }

  find(options) {
    return new Promise(async (resolve) => {
      db.getConnection(async (error, connection) => {
        if (error) throw error;

        let sql = `SELECT * FROM ${this.tableName}`;
        let whereStatement = ' WHERE ';

        if (options && options.where) {
          const statement = [];

          for (const [column, value] of Object.entries(options.where)) {
            statement.push(`${column} = '${value}'`);
          }

          if (statement.length == 1) {
            whereStatement += statement[0];
          } else {
            whereStatement += statement.join(' AND ');
          }

          sql += whereStatement;
        }

        const query = mysql.format(sql);

        await connection.query(query, (error, result) => {
          connection.release();
          if (error) throw error;
          resolve(result);
        });
      });
    });
  }

  findById(id) {
    return new Promise((resolve, reject) => {
      db.getConnection(async (error, connection) => {
        if (error) throw error;

        const sql = `SELECT * FROM ${this.tableName} WHERE id = ?`;
        const query = mysql.format(sql, [id]);

        await connection.query(query, (error, result) => {
          if (error) throw error;
          connection.release();
          resolve(result);
        });
      });
    });
  }

  save(row) {
    return new Promise(async (resolve, reject) => {
      db.getConnection(async (error, connection) => {
        if (error) throw error;

        const query = genInsertQuery(this.tableName, row);
        await connection.query(query, (err, result) => {
          connection.release();
          if (err) throw err;
          resolve({ success: true, message: 'save succeed' });
        });
      });
    });
  }

  delete(id) {
    return new Promise(async (resolve, reject) => {
      db.getConnection(async (error, connection) => {
        if (error) throw error;

        const sql = `DELETE FROM ${this.tableName} WHERE id = ?`;
        const query = mysql.format(sql, id);
        await connection.query(query, (err, result) => {
          connection.release();
          if (err) throw err;
          resolve({ success: true, message: 'delete succeed' });
        });
      });
    });
  }
}

module.exports = baseRepository;
