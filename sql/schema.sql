-- Create Database
CREATE DATABASE IF NOT EXISTS multiplex_db;
USE multiplex_db;

-- =======================
-- USERS TABLE
-- =======================
CREATE TABLE users (
    user_id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    full_name VARCHAR(100) NOT NULL,
    phone VARCHAR(15) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    role ENUM('customer', 'admin', 'employee') DEFAULT 'customer',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- =======================
-- MOVIES TABLE
-- =======================
CREATE TABLE movies (
    movie_id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(100) NOT NULL,
    description TEXT,
    genre VARCHAR(50),
    duration_minutes INT NOT NULL,
    release_date DATE,
    status ENUM('now_showing', 'coming_soon', 'ended') DEFAULT 'coming_soon',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- =======================
-- SHOWS / SCREENINGS TABLE
-- =======================
CREATE TABLE shows (
    show_id INT AUTO_INCREMENT PRIMARY KEY,
    movie_id INT NOT NULL,
    show_time DATETIME NOT NULL,
    screen_no INT NOT NULL,
    ticket_price DECIMAL(10,2) NOT NULL,
    total_seats INT NOT NULL,
    available_seats INT NOT NULL,
    FOREIGN KEY (movie_id) REFERENCES movies(movie_id) ON DELETE CASCADE
);

-- =======================
-- BOOKINGS TABLE
-- =======================
CREATE TABLE bookings (
    booking_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    show_id INT NOT NULL,
    booking_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    seats_booked INT NOT NULL,
    total_amount DECIMAL(10,2) NOT NULL,
    booking_code CHAR(5) NOT NULL, -- Random 5-letter code for m-ticket
    status ENUM('booked', 'cancelled') DEFAULT 'booked',
    FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE,
    FOREIGN KEY (show_id) REFERENCES shows(show_id) ON DELETE CASCADE
);

-- =======================
-- PAYMENTS TABLE
-- =======================
CREATE TABLE payments (
    payment_id INT AUTO_INCREMENT PRIMARY KEY,
    booking_id INT NOT NULL,
    amount DECIMAL(10,2) NOT NULL,
    payment_method ENUM('credit_card', 'debit_card', 'net_banking', 'upi', 'cash') NOT NULL,
    payment_status ENUM('pending', 'completed', 'failed') DEFAULT 'completed',
    payment_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (booking_id) REFERENCES bookings(booking_id) ON DELETE CASCADE
);

-- =======================
-- FEEDBACK TABLE
-- =======================
CREATE TABLE feedback (
    feedback_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    message TEXT NOT NULL,
    submitted_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE
);

-- =======================
-- CONTACT MESSAGES TABLE
-- =======================
CREATE TABLE contact_messages (
    contact_id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL,
    phone VARCHAR(15),
    message TEXT NOT NULL,
    submitted_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- =======================
-- INDEXES FOR PERFORMANCE
-- =======================
CREATE INDEX idx_show_movie ON shows(movie_id);
CREATE INDEX idx_booking_user ON bookings(user_id);
CREATE INDEX idx_booking_show ON bookings(show_id);
CREATE INDEX idx_payment_booking ON payments(booking_id);


-- =======================
-- USERS
-- =======================
INSERT INTO users (username, password_hash, full_name, phone, email, role)
VALUES
('john_doe', 'hashed_password1', 'John Doe', '9876543210', 'john@example.com', 'customer'),
('jane_smith', 'hashed_password2', 'Jane Smith', '9123456780', 'jane@example.com', 'customer'),
('admin_user', 'hashed_admin_pass', 'Admin User', '9000000000', 'admin@example.com', 'admin'),
('counter_emp', 'hashed_employee_pass', 'Counter Employee', '9111111111', 'employee@example.com', 'employee');

-- =======================
-- MOVIES
-- =======================
INSERT INTO movies (title, description, genre, duration_minutes, release_date, status)
VALUES
('Avengers: Endgame', 'Superheroes unite to defeat Thanos.', 'Action', 181, '2019-04-26', 'now_showing'),
('Inception', 'A thief enters people\'s dreams to steal secrets.', 'Sci-Fi', 148, '2010-07-16', 'now_showing'),
('Avatar 2', 'Epic science fiction sequel set on Pandora.', 'Adventure', 190, '2022-12-16', 'coming_soon'),
('The Dark Knight', 'Batman battles the Joker in Gotham.', 'Action', 152, '2008-07-18', 'ended');

-- =======================
-- SHOWS
-- =======================
INSERT INTO shows (movie_id, show_time, screen_no, ticket_price, total_seats, available_seats)
VALUES
(1, '2025-08-08 15:00:00', 1, 250.00, 100, 100),
(1, '2025-08-08 20:00:00', 1, 300.00, 100, 100),
(2, '2025-08-08 18:00:00', 2, 220.00, 80, 80),
(3, '2025-08-10 17:00:00', 3, 350.00, 120, 120);

-- =======================
-- BOOKINGS
-- =======================
INSERT INTO bookings (user_id, show_id, seats_booked, total_amount, booking_code, status)
VALUES
(1, 1, 2, 500.00, 'ABCD1', 'booked'),
(2, 2, 3, 900.00, 'EFGH2', 'booked'),
(1, 3, 1, 220.00, 'IJKL3', 'cancelled');

-- =======================
-- PAYMENTS
-- =======================
INSERT INTO payments (booking_id, amount, payment_method, payment_status)
VALUES
(1, 500.00, 'credit_card', 'completed'),
(2, 900.00, 'upi', 'completed'),
(3, 220.00, 'net_banking', 'failed');

-- =======================
-- FEEDBACK
-- =======================
INSERT INTO feedback (user_id, message)
VALUES
(1, 'Loved the sound and picture quality!'),
(2, 'Booking process was super easy.'),
(1, 'Please add more snacks options.');

-- =======================
-- CONTACT MESSAGES
-- =======================
INSERT INTO contact_messages (name, email, phone, message)
VALUES
('Michael Scott', 'michael@dundermifflin.com', '9998887776', 'Do you have corporate booking offers?'),
('Pam Beesly', 'pam@dundermifflin.com', '9876543211', 'Can I book tickets for next month?'),
('Jim Halpert', 'jim@dundermifflin.com', '9123456789', 'Lost my booking code, please help.');
