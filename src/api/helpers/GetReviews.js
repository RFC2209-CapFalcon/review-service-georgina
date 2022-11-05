const {Review, Photo} = require('../../db/models/index.js')

const GetReviews = async (req, res) => {

  const productId = Number(req.query.product_id);
  const page = req.query.page || 0;
  const count = Number(req.query.count) || 5;

  var attributes = [['id','review_id'],'rating','summary','recommend','response','body','date','reviewer_name','helpfulness'];

  const reviews = await Review.findAll({
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

  res.send(
    {
    'product':productId
    ,'page':page
    ,'count': count
    ,'result':reviews
  });

}

module.exports = GetReviews;

