// config.js
const { Sequelize } = require('sequelize');

// Database configuration
const dbConfig = {
  database: 'dating_app',
  username: 'root',
  password: '123456',
  host: 'localhost',
  dialect: 'mysql'
};

// Initialize Sequelize with the database configuration
const sequelize = new Sequelize(dbConfig.database, dbConfig.username, dbConfig.password, {
  host: dbConfig.host,
  dialect: dbConfig.dialect
});

// Export the sequelize instance and the database configuration
module.exports = {
  dbConfig,
  sequelize
};