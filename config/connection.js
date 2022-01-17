const Sequelize = require('sequelize');

require('dotenv').config();

// connect to data base 
const sequelize = new Sequelize(process.env.JAWSDB_URL)
// , process.env.DB_USER, process.env.DB_PW, {
//     host: 'localhost',
//     dialect: 'mysql',
//     port: 3306
//   });
  
  module.exports = sequelize;