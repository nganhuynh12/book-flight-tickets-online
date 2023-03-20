const db = require('./dbConnect');
const mysql = require('mysql');

const addPlane = (plane) => {
  return new Promise((resolve, reject) => {
    db.getConnection(async (error, connection) => {
      if (error) throw error;
      const sql = 'INSERT INTO plane (name, numOfSeat) VALUES (?, ?) ';
      const query = mysql.format(sql, [plane.name, plane.numOfSeat]);

      await connection.query((error, result) => {
        connection.release();
        if (error) throw error;
        resolve({ success: true, message: 'add plane succeed' });
      });
    });
  });
};
