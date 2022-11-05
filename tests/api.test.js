const supertest = require("supertest");
const app = require("../src/api/index.js");
const { Review, Photo, Characteristic_Review } = require('../src/db/models/index.js');

describe("Report", () => {

  var reviewId;

  const testPayload = {
      "product_id":66642,
      "rating":3,
      "summary":"API TESTING POST!!!!!!!!!!G",
      "body":"Again testing API GGGGGGGGGGGGg~~~~~~~",
    "recommend":true,
      "name":"gtestg",
    "email":"gtestg@gmail.com",
    "photos":["https://res.cloudinary.com/dwl50vubn/image/upload/v1662659153/orkmflq6ssqr63nw8cbo.png","https://preview.redd.it/y844ktbgwom41.jpg?auto=webp&s=c8cd48ed66c7330f77a9078a7fdc25f57cd6203a"],
    "characteristics": {
      "222779":5,
      "222780":5,
      "222781":3,
      "222782":3
    }
  }

  test("POST /reviews", async () => {
    const getMaxId = async () => {
     return (await Review.findOne({ attributes: ['id'], order: [ [ 'id', 'DESC' ]], limit:1 })).dataValues.id;
    }
    const oldMaxId = await getMaxId();
    const response = await supertest(app).post('/reviews').send(testPayload).expect(201);
    const newMaxId = await getMaxId();
    reviewId = newMaxId;
    const newReview = (await Review.findByPk(reviewId)).dataValues;
    console.log('newReview',newReview);
    const newPhotos = (await Photo.findAll({where:{review_id:newReview.id}})).map((p)=> {return p.dataValues.url});
    console.log('newPhotos',newPhotos)
    const newcharacteristics = {};
    const newcharacteristicsQueryResult = (await Characteristic_Review.findAll({where:{review_id:newReview.id}})).forEach((c)=> { newcharacteristics[c.dataValues.characteristic_id]= c.dataValues.value})
    console.log('newcharacteristics',newcharacteristics);

    expect(newMaxId).toBe(oldMaxId+1);
    expect(newReview.rating).toBe(testPayload.rating);
    expect(newReview.summary).toBe(testPayload.summary);
    expect(newReview.body).toBe(testPayload.body);
    expect(newReview.recommend).toBe(testPayload.recommend);
    expect(newReview.reviewer_name).toBe(testPayload.name);
    expect(newReview.reviewer_email).toBe(testPayload.email);
    expect(newPhotos.sort().toString()).toBe(testPayload.photos.sort().toString());
    expect(newcharacteristics.toString()).toBe(testPayload.characteristics.toString());
  });

  test("GET /reviews", async () => {
    const response = await supertest(app).get('/reviews').query({product_id:testPayload.product_id, count:5, page:0}).expect(200);
    expect(response.body.result.length).toBe(5);
  });

  test("PUT /reviews/:review_id/helpful", async () => {
    const review = await Review.findByPk(reviewId)
    const originalHelpfulness = review.helpfulness
    const response = await supertest(app).put(`/reviews/${reviewId}/helpful`).expect(204)
    const updatedReview = await Review.findByPk(reviewId)

    expect(Object.keys(response.body).length).toBe(0);
    expect(updatedReview.helpfulness).toEqual(originalHelpfulness+1);
    });

  test("PUT /reviews/:review_id/report", async () => {
    const review = await Review.findByPk(reviewId)
    const originalReport = review.reported
    const response = await supertest(app).put(`/reviews/${reviewId}/report`).expect(204)
    const updatedReview = await Review.findByPk(reviewId)

    expect(Object.keys(response.body).length).toBe(0);
    expect(originalReport).toBe(false);
    expect(updatedReview.reported).toEqual(true);
    });

});
