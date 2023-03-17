const db = require('./dbConnect');
const mysql = require('mysql');
const { genInsertQuery } = require('../utils');
const { findAll } = require('./base');

const addTicket = (ticket) => {
  return new Promise((resolve, reject) => {
    db.getConnection(async (error, connection) => {
      if (error) throw error;

      const query = genInsertQuery('ticket', ticket);
      await connection.query(query, (error, result) => {
        connection.release();
        if (error) throw error;
        resolve({ success: true, message: 'add ticket succeed' });
      });
    });
  });
};

const updateTicketById = (id, ticket) => {};

const findAllTicket = () => {
  return findAll('ticket');
};

module.exports = {
  addTicket,
  findAllTicket,
};
