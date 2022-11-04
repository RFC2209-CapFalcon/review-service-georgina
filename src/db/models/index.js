const Review = require('./Review.js');
const Photo = require('./Photo.js');
const Characteristic = require('./Characteristic.js');
const Characteristic_Review = require('./Characteristic_Review.js');

Characteristic.hasMany(Characteristic_Review,{as:'characteristics_reviews', foreignKey:'characteristic_id', targetKey:'id'});
Characteristic_Review.belongsTo(Characteristic, {as:'characteristics', foreignKey:'characteristic_id'});
Review.hasMany(Photo, { as: 'photos', foreignKey: 'review_id', targetKey: 'id'});
Review.hasMany(Characteristic_Review,{as:'characteristics_reviews', foreignKey:'review_id', targetKey:'id'});

module.exports = {
  Review
  ,Photo
  ,Characteristic
  ,Characteristic_Review
}