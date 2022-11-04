DROP SCHEMA sdc_reviews CASCADE;
DROP DATABASE IF EXISTS review;

CREATE SCHEMA sdc_reviews;
CREATE DATABASE review;

CREATE TABLE reviews (
  id INT,
  product_id INT NOT NULL,
  rating INT NOT NULL,
  date DATE NOT NULL,
  summary  TEXT NOT NULL,
  body TEXT  NOT NULL,
  recommend BOOLEAN DEFAULT false,
  reported BOOLEAN DEFAULT false,
  reviewer_name VARCHAR(255) NOT NULL,
  reviewer_email VARCHAR(100) NOT NULL,
  response TEXT DEFAULT null,
  helpfulness INT DEFAULT 0,
  PRIMARY KEY(id)
);

CREATE TABLE photos (
  id INT,
  review_id INT NOT NULL,
  url TEXT NOT NULL,
  PRIMARY KEY(id),
    FOREIGN KEY(review_id)
    REFERENCES reviews(id)
    ON DELETE SET NULL
);

CREATE TABLE characteristics (
  id INT,
  product_id INT NOT NULL,
  name TEXT NOT NULL,
  PRIMARY KEY(id)
);

CREATE TABLE characteristics_reviews (
  id INT,
  characteristic_id INT NOT NULL,
  review_id INT NOT NULL,
  value INT NOT NULL,
  PRIMARY KEY(id),
  FOREIGN KEY(review_id)
  REFERENCES reviews(id)
      ON DELETE SET NULL,
  FOREIGN KEY(characteristic_id)
  REFERENCES characteristics(id)
      ON DELETE SET NULL
);


/*  Execute this file from the command line by typing:
 *    psql postgres -U georgina < src/db/schema.sql
 *  to create the database and the tables.*/
