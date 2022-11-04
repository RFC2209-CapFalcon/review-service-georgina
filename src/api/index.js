require('dotenv').config();
const express = require("express");
const path = require("path");
const { Sequelize } = require('sequelize');

const {Review, Photo, Characteristic,  Characteristic_Review} = require('../db/models/Sequelize.js')

// Establishes connection to the database on server start
const db = require("../db/models/Sequelize.js");

const app = express();
app.use(express.json());

app.get('/reviews', (req, res) => {
  const productId = req.query.product_id;
  var attributes = [['id','review_id'],'rating','summary','recommend','response','body','date','reviewer_name','helpfulness'];

  Review.findAll({
    attributes: attributes,
    where:{product_id: Number(productId)},
    include: [{
      model: Photo,
      as: 'photos',
      attributes: ['id', 'url'],
    }]
  })
  .then((result)=> {
    if(result) {
      res.send({
        'product':productId
        ,'result':result});
    } else {
      throw result;
    }
  })
  .catch((err)=> {
    res.send(err);
  })
});

app.get('/reviews/meta', (req, res)=> {
  const productId = req.query.product_id;
  Review.findAll({
    attributes: ['rating','recommend'],
    where:{product_id: Number(productId)},
    include:[{
      model:Characteristic_Review,
      as:'characteristics_reviews',
      attributes:[['characteristic_id','id'],'value'],
      include:[{
        model: Characteristic,
        as: 'characteristics',
        attributes: ['id','name']
      }]
    }]
  })
  .then((data)=> {
    var meta = {
      product_id:productId,
      ratings:{},
      recommended:{},
      characteristics:{}
    };

    var chara = {}

    data.forEach((d)=> {

      if(!meta.ratings[d.dataValues.rating]) {
        meta.ratings[d.dataValues.rating] = 1;
      } else {
        meta.ratings[d.dataValues.rating] += 1;
      }

      if(!meta.recommended[d.dataValues.recommend]) {
        meta.recommended[d.dataValues.recommend] =1;
      } else {
        meta.recommended[d.dataValues.recommend] += 1;
      }
      for(let i in d.dataValues.characteristics_reviews) {
        var characteristic_name = d.dataValues.characteristics_reviews[i].dataValues.characteristics.dataValues.name;
        var rating = d.dataValues.characteristics_reviews[i].dataValues.value;
        var id = d.dataValues.characteristics_reviews[i].dataValues.id;

        if(!chara[characteristic_name]) {
          chara[characteristic_name] = {
            id : id,
            total:rating,
            count:1
          }
        } else {
          chara[characteristic_name].total += rating;
          chara[characteristic_name].count += 1;
        }
      }
    })
    for(let i in chara) {
      meta.characteristics[i]= {};
      meta.characteristics[i].id = chara[i].id;
      meta.characteristics[i].value = (chara[i].total/chara[i].count).toFixed(4);
    }
    res.send(meta);
  })
})



app.listen(process.env.PORT);
console.log(`Listening at http://localhost:${process.env.PORT}`);
