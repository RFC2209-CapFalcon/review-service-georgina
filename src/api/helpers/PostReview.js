const {Review, Characteristic_Review, Photo} = require('../../db/models/index.js')

const PostReview = (req, res) => {

 // console.log(req.body);
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
  //  console.log(newReview);
   const newPost = Review.build(newReview);
   newPost.save()

   //post in Photo
   .then((result) => {
    // console.log(result.dataValues);
     const newReviewId = result.dataValues.id;
     if(reqBody.photos.length) {
       reqBody.photos.forEach((p)=> {
         var newPhoto = Photo.build({review_id: newReviewId, url: p});
         newPhoto.save()
        //  .then((result)=> {
        //   console.log(result.dataValues);
        //  })
       })
     }

     //post in Characteristics review
     for(let i in reqBody.characteristics) {
       var newCharacReview = Characteristic_Review.build({
         characteristic_id: Number(i)
         ,review_id: newReviewId
         ,value: Number(reqBody.characteristics[i])
       });
       newCharacReview.save()
      //  .then((result)=> {
      //   console.log(result.dataValues);
      //  })
     }

     res.send('Created',201)
   })
}

module.exports = PostReview;

