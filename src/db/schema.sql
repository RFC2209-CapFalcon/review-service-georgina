DROP SCHEMA sdc_reviews CASCADE;

CREATE SCHEMA sdc_reviews;

CREATE TABLE sdc_reviews.reviews (
  review_id INT GENERATED ALWAYS AS IDENTITY,
  rating INT NOT NULL,
  summary  TEXT NOT NULL,
  body TEXT  NOT NULL,
  recommend BOOLEAN DEFAULT false,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(100) NOT NULL,
  date DATE NOT NULL,
  response TEXT DEFAULT null,
  helpfulness INT DEFAULT 0,
  product_id INT NOT NULL,
  PRIMARY KEY(review_id)
);

CREATE TABLE sdc_reviews.photos (
  photo_id INT GENERATED ALWAYS AS IDENTITY,
  url TEXT NOT NULL NOT NULL,
  review_id INT NOT NULL NOT NULL,
   PRIMARY KEY(photo_id),
    FOREIGN KEY(review_id)
    REFERENCES sdc_reviews.reviews(review_id)
    ON DELETE SET NULL

);

CREATE TABLE sdc_reviews.characteristics (
  characteristic_id INT GENERATED ALWAYS AS IDENTITY,
  product_id INT NOT NULL,
  type TEXT NOT NULL,
  value DECIMAL NOT NULL,
  PRIMARY KEY(characteristic_id)
);

CREATE TABLE sdc_reviews.characteristics_details (
  characteristics_details_id INT GENERATED ALWAYS AS IDENTITY,
  characteristic_id INT NOT NULL,
  review_id INT NOT NULL,
  characteristic_name TEXT NOT NULL,
  characteristic_rating INT NOT NULL,
  PRIMARY KEY(characteristics_details_id),
  FOREIGN KEY(review_id)
  REFERENCES sdc_reviews.reviews(review_id)
      ON DELETE SET NULL,
  FOREIGN KEY(characteristic_id)
  REFERENCES sdc_reviews.characteristics(characteristic_id)
      ON DELETE SET NULL
);


/*  Execute this file from the command line by typing:
 *    psql postgres -U georgina < src/db/schema.sql
 *  to create the database and the tables.*/
