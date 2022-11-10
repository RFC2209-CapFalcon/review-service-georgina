const {Review, Photo} = require('../../db/models/index.js')

const GetReviews = async (req, res) => {

  const productId = Number(req.query.product_id);
  const page = req.query.page || 0;
  const count = Number(req.query.count) || 5;
  const sort = req.query.sort === 'newest' ? 'date' : req.query.sort === 'helpful' ? 'helpfulness': 'recommend'

  var attributes = [['id','review_id'],'rating','summary','recommend','response','body','date','reviewer_name','helpfulness'];
  const reviews = await Review.findAll({
    attributes: attributes,
    where:{product_id: Number(productId), reported:false},
    include: [{
      model: Photo,
      as: 'photos',
      attributes: ['id', 'url'],
    }],
    order: [[sort, 'DESC']],
    limit: count,
    offset: page*count
  })

  res.send({
    'product':productId
    ,'page':page
    ,'count': count
    ,'results':reviews
  });

}

module.exports = GetReviews;

