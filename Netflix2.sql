CREATE DATABASE Netflix;
USE Netflix;

CREATE TABLE movies (
idMovies INT auto_increment primary key,
title VARCHAR (45) not null,
genre VARCHAR (45) not null,
image VARCHAR (1000) not null,
category VARCHAR (45) not null,
year SMALLINT
);

CREATE TABLE Users (
idUser INT auto_increment primary key,
user VARCHAR (45) not null,
password VARCHAR (45) not null,
name VARCHAR (45) not null,
email VARCHAR (45) not null,
plan_details VARCHAR (45) not null 
);

CREATE TABLE Actors(
idActor INT auto_increment primary key,
name VARCHAR (45) not null,
lastname VARCHAR (45) not null,
country VARCHAR (45) not null,
birthday DATE);

SELECT * FROM movies;
SELECT title, genre FROM movies WHERE year >1990;
SELECT * FROM movies WHERE category = "top 10";
SELECT * FROM movies WHERE category in ("top 10"); # nos vale con = y con in 

UPDATE movies SET year = 1997 WHERE idMovies = 2;

SELECT * FROM actors;
SELECT name FROM actors WHERE YEAR(birthday) BETWEEN 1950 and 1960;
SELECT name, lastname FROM actors WHERE country in ("estados unidos");

SELECT * FROM users WHERE plan_details = "standar";

SET SQL_SAFE_UPDATES = 0;
DELETE  FROM users WHERE name LIKE "m%";




