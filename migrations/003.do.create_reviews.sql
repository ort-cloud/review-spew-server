CREATE TABLE reviews (
  reviews_id INTEGER PRIMARY KEY GENERATED BY DEFAULT AS IDENTITY,
  movies_id INTEGER REFERENCES movies(movies_id) NOT NULL,
  users_id INTEGER REFERENCES users(users_id) NOT NULL,
  review_author TEXT,
  review_url TEXT,
  review_text TEXT
);