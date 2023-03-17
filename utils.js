const mysql = require('mysql');

const genInsertQuery = (tableName, insertValues) => {
  const columns = [];
  const values = [];
  for (const column in insertValues) {
    columns.push(column);
    values.push(insertValues[column]);
  }

  const sql = `INSERT INTO ${tableName} (${columns.join(', ')}) VALUES (${Array(
    columns.length
  )
    .fill('?')
    .join(', ')})`;

  return mysql.format(sql, values);
};

module.exports = {
  genInsertQuery,
};
