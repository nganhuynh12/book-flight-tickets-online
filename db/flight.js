const db = require('./dbConnect');
const mysql = require('mysql');

const addFlight = (flight) => {
  return new Promise(async (resolve, reject) => {
    db.getConnection(async (error, connection) => {
      if (error) throw error;
      const sql =
        'INSERT INTO flight (startTime, arriveTime, startDestination, arriveDestination) VALUES (?, ?, ?, ?)';
      const query = mysql.format(sql, [
        flight.startTime,
        flight.arriveTime,
        flight.startLocation,
        flight.endLocation,
        // flight.planeId,
      ]);

      await connection.query(query, (err, result) => {
        connection.release();
        if (err) throw err;
        resolve({ success: true, message: 'add flight succeed' });
      });
    });
  });
};

module.exports = {
  addFlight,
};
