const {Review} = require('../../db/models/index.js')

const PutReport = (req, res) => {
  const review_id = Number(req.params.review_id);
  Review.findOne({
    attributes:['reported','date']
    ,where:{id : review_id}})
  .then((result)=> {
    var reported = result.dataValues.reported;
    Review.update({reported: true,date: result.dataValues.date},{where:{id: review_id}})
    .then((result)=> {
      res.send(null,204);
    })
})
}

module.exports = PutReport;

