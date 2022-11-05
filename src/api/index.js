require('dotenv').config();
const express = require("express");
const path = require("path");
const{ GetReviews, GetReviewsMeta, PostReview, PutHelpful, PutReport} = require('./helpers/index.js');

const app = express();
app.use(express.json());

app.get('/reviews', async (req, res) => {
  await GetReviews(req, res);
});

app.get('/reviews/meta', async (req, res)=> {
  await GetReviewsMeta(req,res);
})

app.post('/reviews', async (req, res)=> {
  await PostReview(req,res);
})

app.put('/reviews/:review_id/helpful', async (req,res) => {
  await PutHelpful(req,res);
})

app.put('/reviews/:review_id/report', async(req,res) => {
  await PutReport(req,res);
})


app.listen(process.env.PORT);
console.log(`Listening at http://localhost:${process.env.PORT}`);

module.exports = app