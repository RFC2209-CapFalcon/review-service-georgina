CREATE TABLE IF NOT EXISTS reviews (
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
);

CREATE TABLE IF NOT EXISTS photos (
  id SERIAL PRIMARY KEY,
  review_id INT NOT NULL,
  url TEXT NOT NULL,
    FOREIGN KEY(review_id)
    REFERENCES reviews(id)
    ON DELETE SET NULL
);

CREATE TABLE IF NOT EXISTS characteristics (
  id SERIAL PRIMARY KEY,
  product_id INT NOT NULL,
  name TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS characteristics_reviews (
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
);


/*  Execute this file from the command line by typing:
 *    psql postgres -U georgina < src/db/schema.sql
 *  to create the database and the tables.*/
