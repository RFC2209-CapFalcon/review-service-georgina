const { Sequelize } = require('sequelize');
const sequelize = require('./dbConnect.js');
const {Review} = require('./index.js');

const Photo = sequelize.define('photos', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  review_id: {
    type: Sequelize.INTEGER,
    allowNull:false
  },
  url: {
    type: Sequelize.TEXT,
    allowNull:false
  }
});

module.exports = Photo;