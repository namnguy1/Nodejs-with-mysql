// config.js
module.exports = {
  database: 'dating_app',
  username: 'root',
  password: '123456',
  host: 'localhost',
  dialect: 'mysql'
};

const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('dating_app', 'root', '123456', {
  host: 'localhost',
  dialect: 'mysql'
});

module.exports = sequelize;