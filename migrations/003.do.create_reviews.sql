CREATE TABLE reviews (
  reviews_id INTEGER PRIMARY KEY GENERATED BY DEFAULT AS IDENTITY,
  movies_id INTEGER REFERENCES movies(movies_id),
  review_author TEXT,
  review_url TEXT,
  review_text TEXT
);