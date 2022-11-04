const {Review, Photo} = require('../../db/models/index.js')

const GetReviews = (req, res) => {

  const productId = req.query.product_id;
  const page = req.query.page;
  const count = req.query.count;

  var attributes = [['id','review_id'],'rating','summary','recommend','response','body','date','reviewer_name','helpfulness'];

  Review.findAll({
    attributes: attributes,
    where:{product_id: Number(productId)},
    include: [{
      model: Photo,
      as: 'photos',
      attributes: ['id', 'url'],
    }],
    limit: count,
    offset: page*count
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

}

module.exports = GetReviews;

