CREATE TABLE users (
    user_id SERIAL PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    password TEXT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE posts (
    post_id SERIAL PRIMARY KEY,
    title VARCHAR(100) NOT NULL CHECK (LENGTH(title) >= 3),
    blurb VARCHAR(180) CHECK (LENGTH(blurb) >= 10),
    content TEXT,
    user_id INTEGER REFERENCES users(user_id) ON DELETE CASCADE
);