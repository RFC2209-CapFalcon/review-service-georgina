const { Sequelize } = require('sequelize');
require('dotenv').config({path:'../../../.env'});


const dbConnect = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASS,
  {
    host:process.env.DB_HOST,
    dialect: 'postgres',
    define: {
      timestamps: false
    }
  });

module.exports = dbConnect;
