CREATE TABLE genres (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL
);

CREATE TABLE movies (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    year INT NOT NULL,
    genre_id INT REFERENCES genres(id) ON DELETE SET NULL
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
    user_id INT REFERENCES users(id) ON DELETE CASCADE,
    stars INT NOT NULL CHECK (stars BETWEEN 1 AND 5),
    review_text TEXT
);

CREATE TABLE favorites (
    id SERIAL PRIMARY KEY,
    user_id INT REFERENCES users(id) ON DELETE CASCADE,
    movie_id INT REFERENCES movies(id) ON DELETE CASCADE
);

INSERT INTO Genres (name) VALUES
('drama'), 
('comedy'),
('scifi'),
('fantasy'),
('action'),
('thriller');

INSERT INTO Movies (name, year, genre_id) VALUES
('Inception', 2010, (SELECT id FROM Genres WHERE name = 'action')),
('The Terminator', 1984, (SELECT id FROM Genres WHERE name = 'action')),
('Tropic Thunder', 2008, (SELECT id FROM Genres WHERE name = 'comedy')),
('Borat', 2006, (SELECT id FROM Genres WHERE name = 'comedy')),
('Interstellar', 2014, (SELECT id FROM Genres WHERE name = 'drama')),
('Joker', 2019, (SELECT id FROM Genres WHERE name = 'drama'));

INSERT INTO users (username, name, password, year_of_birth) VALUES 
    ('reimarii', 'Reima Riihimäki', 'qwerty123', 1986),
    ('lizzy', 'Lisa Simpson', 'abcdef', 1991),
    ('boss', 'Ben Bossy', 'salasana', 1981);

SELECT * FROM genres;

SELECT * FROM movies;

SELECT * FROM users;