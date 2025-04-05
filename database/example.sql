-- Create the Database => Replace exampledatabase with the actual database name
CREATE DATABASE exampledatabase;

-- Use the Database
USE exampledatabase;

-- Create the Users Table
CREATE TABLE users (
  user_id INT NOT NULL AUTO_INCREMENT,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  password VARCHAR(255) NOT NULL,
  PRIMARY KEY (user_id),
  UNIQUE KEY email (email)
);

-- Create the Restaurants Table
CREATE TABLE restaurants (
  restaurant_id INT NOT NULL AUTO_INCREMENT,
  name VARCHAR(255) NOT NULL,
  location VARCHAR(255) NOT NULL,
  description TEXT DEFAULT NULL,
  rating FLOAT DEFAULT 0,
  PRIMARY KEY (restaurant_id)
);

-- Create the Reservations Table
CREATE TABLE reservations (
  reservation_id INT NOT NULL AUTO_INCREMENT,
  user_id INT NOT NULL,
  restaurant_id INT NOT NULL,
  date DATE NOT NULL,
  time TIME NOT NULL,
  people_count INT NOT NULL,
  PRIMARY KEY (reservation_id),
  KEY user_id (user_id),
  KEY restaurant_id (restaurant_id),
  CONSTRAINT reservations_ibfk_1 FOREIGN KEY (user_id) REFERENCES users (user_id) ON DELETE CASCADE,
  CONSTRAINT reservations_ibfk_2 FOREIGN KEY (restaurant_id) REFERENCES restaurants (restaurant_id) ON DELETE CASCADE
);

-- Seed Data to populate the restaurants table
INSERT INTO restaurants (restaurant_id, name, location, description, rating) VALUES
	(7, 'Ouzo & Olives', 'Athens, Greece', 'A traditional Greek restaurant offering a variety of ouzo and olive-based dishes.', 3.5),
	(8, 'Mythos Tavern', 'Santorini, Greece', 'A charming tavern serving classic Greek meals with breathtaking views of the caldera.', 4.2),
	(9, 'Aegean Breeze', 'Mykonos, Greece', 'A coastal restaurant serving fresh seafood with an amazing sea breeze and sunset views.', 3.4),
	(10, 'Kalamata Kitchen', 'Kalamata, Greece', 'A family-owned restaurant specializing in Kalamata olives, local dishes, and regional wines.', 4.5),
	(11, 'Souvlaki King', 'Thessaloniki, Greece', 'A fast-casual spot for delicious souvlaki and traditional Greek street food.', 3.5),
	(12, 'Zeus Feast', 'Crete, Greece', 'An ancient-themed restaurant offering a grand feast of Cretan specialties and Mediterranean flavors.', 4.7);

