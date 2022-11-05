const {Review} = require('../../db/models/index.js')

const PutHelpful = (req, res) => {
  const review_id = Number(req.params.review_id);
  Review.findOne({
    attributes:['helpfulness','date']
    ,where:{id : review_id}})
  .then((result)=> {
    var helpfulness = result.dataValues.helpfulness + 1;
    Review.update({helpfulness: helpfulness,date: result.dataValues.date},{where:{id: review_id}})
    .then((result)=> {
      res.send(result);
    })
})
}

module.exports = PutHelpful;

