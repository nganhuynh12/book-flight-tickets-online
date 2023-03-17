const db = require('./dbConnect');
const mysql = require('mysql');

const addTicket = (ticket) => {
  return new Promise((resolve, reject) => {
    db.getConnection(async (error, connection) => {
      if (error) throw error;
      const sql = 'INSERT INTO ticket (type, price, flightId) VALUES (?, ?, ?)';
      const query = mysql.format(sql, [
        ticket.type,
        ticket.price,
        ticket.flightId,
      ]);

      await connection.query(query, (error, result) => {
        connection.release();
        if (error) throw error;
        resolve({ success: true, message: 'add ticket succeed' });
      });
    });
  });
};

const updateTicketById = (id, ticket) => {};

module.exports = {
  addTicket,
};
