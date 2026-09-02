-- Users Table --
CREATE TABLE users (
    email TEXT PRIMARY KEY,
    password TEXT NOT NULL
);

-- Posts Table --
CREATE TABLE posts (
    id SERIAL PRIMARY KEY,
    title VARCHAR(100) NOT NULL,
    blurb TEXT,
    content TEXT,
    user TEXT REFERENCES users(email)
);