const db = require('./dbConnect');
const { genInsertQuery } = require('../utils');
const { findAll } = require('./base');

const addFlight = async (flight) => {
  return new Promise(async (resolve, reject) => {
    db.getConnection(async (error, connection) => {
      if (error) throw error;

      const query = genInsertQuery('flight', flight);
      await connection.query(query, (err, result) => {
        connection.release();
        if (err) throw err;
        resolve({ success: true, message: 'add flight succeed' });
      });
    });
  });
};

const findAllFlight = () => {
  return findAll('flight');
};

module.exports = {
  addFlight,
  findAllFlight,
};
