const { Sequelize } = require('sequelize');
require('dotenv').config({path:'../../../.env'});
const moment = require('moment')


const sequelize = new Sequelize(
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


const Review = sequelize.define('reviews', {
  id: {
    type:  Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true
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

Review.hasMany(Photo, { as: 'photos', foreignKey: 'review_id', targetKey: 'id'});
Review.hasMany(Characteristic_Review,{as:'characteristics_reviews', foreignKey:'review_id', targetKey:'id'});
Characteristic.hasMany(Characteristic_Review,{as:'characteristics_reviews', foreignKey:'characteristic_id', targetKey:'id'});
Characteristic_Review.belongsTo(Characteristic, {as: 'characteristics', foreignKey:'characteristic_id'});

module.exports = {
  Review,
  Photo,
  Characteristic,
  Characteristic_Review,
};
