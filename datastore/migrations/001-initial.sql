CREATE TABLE posts (
    _id INTEGER PRIMARY KEY,
    title VARCHAR(24) NOT NULL,
    thumbnail_url TEXT NOT NULL,
    content TEXT NOT NULL,
    category VARCHAR(16) NOT NULL,
    published BOOLEAN NOT NULL DEFAULT false
);