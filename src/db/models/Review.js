const { Sequelize } = require('sequelize');
const sequelize = require('./dbConnect.js');

const {Photo , Characteristic_Review, Characteristic} = require('./index.js');

const moment = require('moment')

const Review = sequelize.define('reviews', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  product_id: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  rating: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  date: {
    type: Sequelize.BIGINT,
    get() {
      return moment.unix(this.getDataValue('date').slice(0,10)).toISOString();
    },
    allowNull: false
  },
  summary: {
    type: Sequelize.TEXT,
    allowNull: false
  },
  body: {
    type: Sequelize.TEXT,
    allowNull: false
  },
  recommend: {
    type: Sequelize.BOOLEAN,
    allowNull: true
  },
  reported: {
    type: Sequelize.BOOLEAN,
    allowNull: true
  },
  reviewer_name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  reviewer_email: {
    type: Sequelize.STRING,
    allowNull: false
  },
  response: {
    type: Sequelize.TEXT,
    allowNull: true
  },
  helpfulness: {
    type: Sequelize.INTEGER,
    allowNull: false
  }
});


module.exports = Review;