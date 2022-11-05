const {Review} = require('../../db/models/index.js')

const PutHelpful = async (req, res) => {
  const review_id = Number(req.params.review_id);
  const review = await Review.findByPk(review_id);
  review.helpfulness += 1
  const updateResult = await review.save();
  res.send(null, 204)
}

module.exports = PutHelpful;

