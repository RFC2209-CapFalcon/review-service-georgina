const { Sequelize } = require('sequelize');
const sequelize = require('./dbConnect.js');
const {Characteristic} = require('./index.js');

const Characteristic_Review = sequelize.define('characteristics_reviews', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  characteristic_id: {
    type: Sequelize.INTEGER,
    allowNull:false
  },
  review_id: {
    type: Sequelize.INTEGER,
    allowNull:false
  },
  value: {
    type: Sequelize.INTEGER,
    allowNull:false
  }
});

module.exports = Characteristic_Review;