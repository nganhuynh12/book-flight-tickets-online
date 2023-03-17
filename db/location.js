const db = require('./dbConnect');
const mysql = require('mysql');
const { genInsertQuery } = require('../utils');
const { findAll } = require('./base');

const addLocation = (location) => {
  return new Promise(async (resolve) => {
    db.getConnection(async (error, connection) => {
      if (error) throw error;
      const query = genInsertQuery('location', location);
      await connection.query(query, (error) => {
        connection.release();
        if (error) throw error;
        resolve({ success: true, message: 'add location succeed' });
      });
    });
  });
};

const findAllLocation = () => {
  return findAll('location');
};

module.exports = {
  addLocation,
  findAllLocation,
};
