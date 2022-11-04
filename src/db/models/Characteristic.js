const { Sequelize } = require('sequelize');
const sequelize = require('./dbConnect.js');
const {Review , Characteristic_Review} = require('./index.js');

const Characteristic = sequelize.define('characteristics', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  product_id: {
    type: Sequelize.INTEGER,
    allowNull:false
  },
  name: {
    type: Sequelize.STRING,
    allowNull:false
  }
});

module.exports = Characteristic;