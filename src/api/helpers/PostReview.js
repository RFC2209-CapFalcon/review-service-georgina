const {Review, Characteristic_Review, Photo} = require('../../db/models/index.js')

const PostReview = async (req, res) => {

 console.log(req.body);
 var reqBody = req.body;

 //post in Review
 var newReview = {
   product_id: reqBody.product_id,
   rating: reqBody.rating,
   summary: reqBody.summary,
   body: reqBody.body,
   recommend: reqBody.recommend,
   reviewer_name: reqBody.name,
   reviewer_email: reqBody.email,
   helpfulness:0
   }

   newReview.date = Math.round((new Date()).getTime());

   const newReviewId = (await Review.build(newReview).save()).dataValues.id;

   //post in Photos
     if(reqBody.photos.length) {
       reqBody.photos.forEach( async (p)=> {
         var newPhoto = Photo.build({review_id: newReviewId, url: p});
         await newPhoto.save();
       })
     }

     //post in Characteristics review
     for (let i in reqBody.characteristics) {
       var newCharacReview = Characteristic_Review.build({
         characteristic_id: Number(i)
         ,review_id: newReviewId
         ,value: Number(reqBody.characteristics[i])
       });
       await newCharacReview.save()
     }
     res.send({newReviewId},201)
}

module.exports = PostReview;

