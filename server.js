const app = require('./app');
const db = require('./models');

db.sequelize.sync({ alter: true }).then(() => {
  app.listen('3000');
});
