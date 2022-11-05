const {Review} = require('../../db/models/index.js')

const PutReport = async (req, res) => {
  const review_id = Number(req.params.review_id);
  const review = await Review.findByPk(review_id);
  review.reported = true;
  await review.save();
  res.send(null,204);
}

module.exports = PutReport;

