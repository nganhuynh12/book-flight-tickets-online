const db = require('./dbConnect');
const mysql = require('mysql');
const { genInsertQuery } = require('../utils');

const addLocation = (location) => {
  return new Promise(async (resolve, reject) => {
    db.getConnection(async (error, connection) => {
      if (error) throw error;
      const query = genInsertQuery('location', location);
      await connection.query(query, (error, result) => {
        connection.release();
        if (error) throw error;
        resolve({ success: true, message: 'add location succeed' });
      });
    });
  });
};

module.exports = {
  addLocation,
};
