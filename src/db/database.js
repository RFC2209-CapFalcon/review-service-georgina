require('dotenv').config({path:'../../.env'});
const { Client } = require('pg');

const db = new Client ({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
});
db.connect();
db.query('SELECT NOW()', (err, res) => {
  if (!err) {
    console.log('Successfully select now()');
  } else {
    console.log(err.stack);
  }
})

db.query(`CREATE TABLE IF NOT EXISTS
  reviews (
    id SERIAL PRIMARY KEY,
    product_id INT NOT NULL,
    rating INT NOT NULL,
    date BIGINT NOT NULL,
    summary  TEXT NOT NULL,
    body TEXT  NOT NULL,
    recommend BOOLEAN DEFAULT false,
    reported BOOLEAN DEFAULT false,
    reviewer_name VARCHAR(255) NOT NULL,
    reviewer_email VARCHAR(100) NOT NULL,
    response TEXT DEFAULT null,
    helpfulness INT DEFAULT 0
)`,(err, res)=> {
  if (!err) {
    console.log('Created reviews table successfully');
  } else {
    console.log(err.stack)
  }
})


db.query(`CREATE TABLE IF NOT EXISTS
photos (
  id SERIAL PRIMARY KEY,
  review_id INT NOT NULL,
  url TEXT NOT NULL,
    FOREIGN KEY(review_id)
    REFERENCES reviews(id)
    ON DELETE SET NULL
)`,(err, res)=> {
  if (!err) {
    console.log('Created photo table successfully');
  } else {
    console.log(err.stack)
  }
})

db.query(`CREATE TABLE IF NOT EXISTS
characteristics (
  id SERIAL PRIMARY KEY,
  product_id INT NOT NULL,
  name TEXT NOT NULL
)`,(err, res)=> {
  if (!err) {
    console.log('Created characteristics table successfully');
  } else {
    console.log(err.stack)
  }
})

db.query(`CREATE TABLE IF NOT EXISTS
characteristics_reviews (
  id SERIAL PRIMARY KEY,
  characteristic_id INT NOT NULL,
  review_id INT NOT NULL,
  value INT NOT NULL,
  FOREIGN KEY(review_id)
  REFERENCES reviews(id)
      ON DELETE SET NULL,
  FOREIGN KEY(characteristic_id)
  REFERENCES characteristics(id)
      ON DELETE SET NULL
)`,(err, res)=> {
  if (!err) {
    console.log('Created characteristics_reviews table successfully');
  } else {
    console.log(err.stack)
  }
})