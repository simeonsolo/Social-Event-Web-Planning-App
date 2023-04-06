CREATE DATABASE CombinedCalendars;
USE CombinedCalendars;

CREATE TABLE users (
    username VARCHAR(63) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    github_id VARCHAR(63),
    given_name VARCHAR(63),
    middle_name VARCHAR(63),
    last_name VARCHAR(63),
    email VARCHAR(255),
    contact_number VARCHAR(10),
    PRIMARY KEY (username)
);

CREATE TABLE events (
    creator VARCHAR(63) NOT NULL,
    event_name VARCHAR(100) UNIQUE NOT NULL,
    event_description VARCHAR(1000),
    event_date VARCHAR(100),
    event_time VARCHAR(100),
    street_number INT,
    street_name VARCHAR(100),
    suburb VARCHAR(100),
    postcode INT,
    event_state VARCHAR(100),
    event_country VARCHAR(100),
    PRIMARY KEY (event_name),
    FOREIGN KEY (creator) REFERENCES users(username) ON DELETE CASCADE
);

CREATE TABLE event_invite (
    event_name VARCHAR(63) NOT NULL,
    invited_guest VARCHAR(63) NOT NULL,
    response BOOLEAN DEFAULT(0),
    PRIMARY KEY (event_name, invited_guest),
    FOREIGN KEY (event_name) REFERENCES events(event_name) ON DELETE CASCADE,
    FOREIGN KEY (invited_guest) REFERENCES users(username) ON DELETE CASCADE
);

CREATE TABLE friendship (
    friend1 VARCHAR(63),
    friend2 VARCHAR(63),
    date_created DATETIME,
    PRIMARY KEY (friend1, friend2),
    FOREIGN KEY (friend1) REFERENCES users(username) ON DELETE CASCADE,
    FOREIGN KEY (friend2) REFERENCES users(username) ON DELETE CASCADE
);

CREATE TABLE administrators (
    admin_id INT NOT NULL AUTO_INCREMENT,
    user VARCHAR(63),
    PRIMARY KEY(admin_id),
    FOREIGN KEY (user) REFERENCES users(username) ON DELETE CASCADE
);

CREATE TABLE calendar_settings (
    id INT NOT NULL AUTO_INCREMENT,
    user VARCHAR(63),
    url_link VARCHAR(255),
    PRIMARY KEY (id),
    FOREIGN KEY (user) REFERENCES users(username) ON DELETE CASCADE
);

CREATE TABLE email_notification_settings (
    id INT NOT NULL AUTO_INCREMENT,
    user VARCHAR(63),
    user_responses BOOLEAN DEFAULT(0),
    event_availabilities BOOLEAN DEFAULT(0),
    event_finalisations BOOLEAN DEFAULT(0),
    event_cancellations BOOLEAN DEFAULT(0),
    PRIMARY KEY (id),
    FOREIGN KEY (user) REFERENCES users(username) ON DELETE CASCADE
);

CREATE TABLE external_account_links (
    id INT NOT NULL AUTO_INCREMENT,
    user VARCHAR(63),
    facebook_url VARCHAR(255) DEFAULT(NULL),
    instagram_url VARCHAR(255) DEFAULT(NULL),
    twitter_url VARCHAR(255) DEFAULT(NULL),
    PRIMARY KEY (id),
    FOREIGN KEY (user) REFERENCES users(username) ON DELETE CASCADE
);