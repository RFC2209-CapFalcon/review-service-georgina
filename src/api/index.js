require('dotenv').config();
const express = require("express");
const path = require("path");
const{ GetReviews, GetReviewsMeta, PostReview, PutHelpful, PutReport} = require('./helpers/index.js');

const app = express();
app.use(express.json());

app.get('/reviews', (req, res) => {
  GetReviews(req, res);
});

app.get('/reviews/meta', (req, res)=> {
  GetReviewsMeta(req,res);
})

app.post('/reviews', (req, res)=> {
  PostReview(req,res);
})

app.put('/reviews/:review_id/helpful',(req,res) => {
  PutHelpful(req,res);
})

app.put('/reviews/:review_id/report',(req,res) => {
  PutReport(req,res);
})


app.listen(process.env.PORT);
console.log(`Listening at http://localhost:${process.env.PORT}`);
