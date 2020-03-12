BEGIN;

TRUNCATE
  users
  RESTART IDENTITY CASCADE;

INSERT INTO users (username, password) VALUES
('demo', 'demopass');

COMMIT;
