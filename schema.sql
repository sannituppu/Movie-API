-- Active: 1734431780238@@127.0.0.1@5432@postgres
CREATE TABLE genres (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL
);

CREATE TABLE movies (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    year INT NOT NULL,
    genre_name VARCHAR(255) NOT NULL
);

CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(255) UNIQUE NOT NULL,
    name VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    year_of_birth INT NOT NULL
);

CREATE TABLE reviews (
    id SERIAL PRIMARY KEY,
    movie_id INT REFERENCES movies(id) ON DELETE CASCADE,
    username VARCHAR(255) REFERENCES users(username) ON DELETE CASCADE,
    stars INT NOT NULL CHECK (stars BETWEEN 1 AND 5),
    review_text TEXT
);

CREATE TABLE favorites (
    id SERIAL PRIMARY KEY,
    username VARCHAR(255) REFERENCES users(username) ON DELETE CASCADE,
    movie_id INT REFERENCES movies(id) ON DELETE CASCADE
);

INSERT INTO Genres (name) VALUES
('drama'), 
('comedy'),
('scifi'),
('fantasy'),
('action'),
('thriller');

INSERT INTO Movies (name, year, genre_name) VALUES
('Inception', 2010, 'action'),
('The Terminator', 1984, 'action'),
('Tropic Thunder', 2008, 'comedy'),
('Borat', 2006, 'comedy'),
('Interstellar', 2014, 'drama'),
('Joker', 2019, 'drama');

INSERT INTO users (username, name, password, year_of_birth) VALUES 
    ('reimarii', 'Reima Riihimäki', 'qwerty123', 1986),
    ('lizzy', 'Lisa Simpson', 'abcdef', 1991),
    ('boss', 'Ben Bossy', 'salasana', 1981);

SELECT * FROM genres;

SELECT * FROM movies;

SELECT * FROM users;