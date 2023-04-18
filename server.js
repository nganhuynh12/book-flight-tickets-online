const app = require('./app');
const db = require('./models');

db.sequelize.sync({ force: true }).then(() => {
  app.listen('3000');
});
