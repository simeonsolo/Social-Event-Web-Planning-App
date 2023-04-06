/* checking if specified user is in database */
SELECT username,given_name,middle_name,last_name,email,contact_number
    FROM users
    WHERE username = ? AND password = SHA2(?,224);

/* signing up a user */
INSERT INTO users (username,password,given_name,middle_name,last_name,email,contact_number)
    VALUES(?,SHA2(?,224),?,?,?,?,?);

/* adding event to database */
INSERT INTO events (creator,event_name,event_description,event_date,event_time,
                    street_number,street_name,suburb,postcode,event_state,event_country)
    VALUES(?,?,?,?,?,?,?,?,?,?,?);

/* retrieving event details from database */
SELECT creator,event_name,event_description,event_date,event_time,street_number,street_name,suburb,postcode,event_state,event_country
    FROM events
    WHERE event_name = ?;

/* sending an event invite */
INSERT INTO event_invite(event_name,invited_guest)
    VALUES(?,?);

/* check if user is in database */
SELECT username
    FROM users
    WHERE username = ?;

/* getting list of events that user is invited to */
SELECT creator,events.event_name,event_description,event_date,event_time,street_number,street_name,suburb,postcode,event_state,event_country
        FROM events
        INNER JOIN event_invite
        ON events.event_name = event_invite.event_name
        WHERE event_invite.invited_guest = ?

/* user accepting event invite */
UPDATE event_invite
    SET response = 1
    WHERE event_name = ? AND invited_guest = ?;

/* checking if user is invited to event */
SELECT event_name,invited_guest
    FROM event_invite
    WHERE event_name = ? AND invited_guest = ?;

/* creating friendship between two users */
INSERT INTO friendship(friend1,friend2)
    VALUES(?,?);

/* checking if friendship exists */
SELECT friend1,friend2
    FROM friendship
    WHERE (friend1 = ? AND friend2 = ?) OR (friend1 = ? AND friend2 = ?);

/* making user admin */
INSERT INTO administrators(user)
    VALUES(?);

/* checking if user is admin */
SELECT user,admin_id
    FROM administrators
    WHERE user = ?;

/* retrieving all events made by a user */
SELECT creator,event_name,event_description,event_date,event_time,street_number,street_name,suburb,postcode,event_state,event_country
    FROM events
    WHERE creator = ?;