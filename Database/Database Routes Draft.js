/* FOLLOWING ARE DRAFTS: final working copies of these routes are defined in all.js */

/* JAVASCRIPT: POST request for signing in a user and verifying if credentials are in database */
router.post('/login', function(req,res,next) {
    /* check if username and password are in body */
    if ('username' in req.body && 'password' in req.body) {
        /* connect to database */
        req.pool.getConnection(function(error,connection){
            if (error) {
                console.log(error);
                res.sendStatus(500);
                return;
            }
        }
        /* query */
        let query = "SELECT username,given_name,middle_name,last_name,email,contact_number
                                FROM users
                                WHERE username = ? AND password = SHA2(?,224);";
        connection.query(query,[req.body.username,req.body.password], function(error,rows,fields) {
            connected.release(); /* release connection */
            if (error) {
                console.log(error);
                res.sendStatus(500);
                return;
            }
            if (rows.length > 0) {
                req.session.user = rows[0];
                res.sendStatus(200); /* successful login */
            }
            else {
                res.sendStatus(401); /* bad login */
            }
        });
    } else {
        res.sendStatus(400); /* bad request */
    }
});

/* JAVASCRIPT: POST request for signing up a user */
router.post('/signup', function(req,res,next) {
    /* check if all necessary details are in body */
    if ('username' in req.body && 'password' in req.body && 'given_name' in req.body && 'middle_name' in req.body && 'last_name' in req.body && 'email' in req.body && 'contact_number' in req.body) {
        /* connect to database */
        req.pool.getConnection(function(error,connection){
            if (error) {
                console.log(error);
                res.sendStatus(500);
                return;
            }
        }
        /* first query (adding user to database) */
        let query = "INSERT INTO users (username,password,given_name,middle_name,last_name,email,contact_number)
                                VALUES(?,SHA2(?,224),?,?,?,?,?)";
        connection.query(query,[req.body.username,req.body.password,req.body.given_name,req.body.middle_name,req.body.last_name,req.body.email,req.body.contact_number], function(error,rows,fields) {
            if (error) {
                console.log(error);
                res.sendStatus(500);
                return;
            }
            /* second query (verifying user is in database, confirming sign up) */
            let query = "SELECT username,given_name,middle_name,last_name,email,contact_number
                                    FROM users
                                    WHERE username = ? AND password = SHA2(?,224);";
            connection.query(query,[req.body.username,req.body.password], function(error,rows,fields) {
                connected.release(); /* release connection */
                if (error) {
                    console.log(error);
                    res.sendStatus(500);
                    return;
                }
                if (rows.length > 0) {
                    req.session.user = rows[0];
                    res.sendStatus(200); /* successful */
                }
                else {
                    res.sendStatus(401); /* unsuccessful */
                }
            });
        });
    } else {
        res.sendStatus(400); /* bad request */
    }
});

/* JAVASCRIPT: POST request adding event to database */
router.post('/addEvent', function(req,res,next) {
    /* check if all event details are in body */
    if ('creator' in req.body && 'event_name' in req.body && 'event_description' in req.body
        && 'event_date' in req.body && 'event_time' in req.body && 'street_number' in req.body
        && 'street_name' in req.body && 'suburb' in req.body && 'postcode' in req.body
        && 'event_state' in req.body && 'event_country' in req.body) {
        /* connect to database */
        req.pool.getConnection(function(error,connection){
            if (error) {
                console.log(error);
                res.sendStatus(500);
                return;
            }
        }
        /* query */
        let query = "INSERT INTO events (creator,event_name,event_description,event_date,event_time,
                                        street_number,street_name,suburb,postcode,event_state,event_country)
                                        VALUES(?,?,?,?,?,?,?,?,?,?,?);";
        connection.query(query,[req.body.creator,req.body.event_name,req.body.event_description,req.body.event_date,
                                req.body.event_time,req.body.street_number,req.body.street_name,req.body.suburb,
                                req.body.postcode,req.body.event_state,req.body.event_country], function(error,rows,fields) {
            if (error) {
                console.log(error);
                res.sendStatus(500);
                return;
            }
            /* second query (verifying event is in database, confirming addition) */
            let query = "SELECT creator,event_name
                                    FROM events
                                    WHERE creator = ? AND event_name = ?;";
            connection.query(query,[req.body.creator,req.body.event_name], function(error,rows,fields) {
                connected.release(); /* release connection */
                if (error) {
                    console.log(error);
                    res.sendStatus(500);
                    return;
                }
                if (rows.length > 0) {
                    res.sendStatus(200); /* successful */
                }
                else {
                    res.sendStatus(401); /* unsuccessful */
                }
            });
        });
    } else {
        res.sendStatus(400); /* bad request */
    }
});

/* JAVASCRIPT: POST request for retrieving event details from database */
router.post('/getEvent', function(req,res,next) {
    /* check if event name is in body */
    if ('event_name' in req.body) {
        /* connect to database */
        req.pool.getConnection(function(error,connection){
            if (error) {
                console.log(error);
                res.sendStatus(500);
                return;
            }
        }
        /* query */
        let query = "SELECT creator,event_name,event_description,event_date,event_time,street_number,street_name,suburb,postcode,event_state,event_country
                                FROM events
                                WHERE event_name = ?;";
        connection.query(query,[req.body.event_name], function(error,rows,fields) {
            connected.release(); /* release connection */
            if (error) {
                console.log(error);
                res.sendStatus(500);
                return;
            }
            if (rows.length > 0) {
                /* return event info */
                res.json(rows);
                res.sendStatus(200); /* successful search */
            }
            else {
                res.sendStatus(401); /* bad search, does not exist */
            }
        });
    } else {
        res.sendStatus(400); /* bad request */
    }
});

/* JAVASCRIPT: POST request for creating an event invite */
router.post('/sendInvite', function(req,res,next) {
    /* check if event name and user are in body */
    if ('event_name' in req.body && 'invited_guest' in req.body) {
        /* connect to database */
        req.pool.getConnection(function(error,connection){
            if (error) {
                console.log(error);
                res.sendStatus(500);
                return;
            }
        }
        /* query */
        let query = "INSERT INTO event_invite(event_name,invited_guest) VALUES(?,?);";
        connection.query(query,[req.body.event_name,req.body.invited_guest], function(error,rows,fields) {
            if (error) {
                console.log(error);
                res.sendStatus(500);
                return;
            }
            /* second query (verifying invite is in database, confirming addition) */
            let query = "SELECT event_name,invited_guest
                                    FROM event_invite
                                    WHERE event_name = ? AND invited_guest = ?;";
            connection.query(query,[req.body.event_name,req.body.invited_guest], function(error,rows,fields) {
                connected.release(); /* release connection */
                if (error) {
                    console.log(error);
                    res.sendStatus(500);
                    return;
                }
                if (rows.length > 0) {
                    res.sendStatus(200); /* successful */
                }
                else {
                    res.sendStatus(401); /* unsuccessful */
                }
            });
        });
    } else {
        res.sendStatus(400); /* bad request */
    }
});

/* JAVASCRIPT: POST request for user accepting invite (no need to decline invite, default response is decline) */
router.post('/acceptInvite', function(req,res,next) {
    /* check if event name and user and response are in body */
    if ('event_name' in req.body && 'invited_guest' in req.body) {
        /* connect to database */
        req.pool.getConnection(function(error,connection){
            if (error) {
                console.log(error);
                res.sendStatus(500);
                return;
            }
        }
        /* query */
        let query = "UPDATE event_invite
                        SET response = 1
                        WHERE event_name = ? AND invited_guest = ?;";
        connection.query(query,[req.body.event_name,req.body.invited_guest], function(error,rows,fields) {
            if (error) {
                console.log(error);
                res.sendStatus(500);
                return;
            }
            if (rows.length > 0) {
                res.sendStatus(200); /* successful */
            }
            else {
                res.sendStatus(401); /* unsuccessful */
            }
        });
    } else {
        res.sendStatus(400); /* bad request */
    }
});

/* JAVASCRIPT: POST request for verifying if user is invited to named event */
router.post('/checkInvited', function(req,res,next) {
    /* check if event name and user are in body */
    if ('event_name' in req.body && 'invited_guest' in req.body) {
        /* connect to database */
        req.pool.getConnection(function(error,connection){
            if (error) {
                console.log(error);
                res.sendStatus(500);
                return;
            }
        }
        /* query */
        let query = "SELECT event_name,invited_guest
                                FROM event_invite
                                WHERE event_name = ? AND invited_guest = ?;";
        connection.query(query,[req.body.event_name,req.body.invited_guest], function(error,rows,fields) {
            connected.release(); /* release connection */
            if (error) {
                console.log(error);
                res.sendStatus(500);
                return;
            }
            if (rows.length > 0) {
                res.sendStatus(200); /* successful */
            }
            else {
                res.sendStatus(401); /* unsuccessful*/
            }
        });
    } else {
        res.sendStatus(400); /* bad request */
    }
});

/* JAVASCRIPT: POST request for creating friendship between two users */
router.post('/createFriend', function(req,res,next) {
    /* check if two users are in body */
    if ('friend1' in req.body && 'friend2' in req.body) {
        /* connect to database */
        req.pool.getConnection(function(error,connection){
            if (error) {
                console.log(error);
                res.sendStatus(500);
                return;
            }
        }
        /* query */
        let query = "INSERT INTO friendship(friend1,friend2) VALUES(?,?);";
        connection.query(query,[req.body.friend1,req.body.friend2], function(error,rows,fields) {
            if (error) {
                console.log(error);
                res.sendStatus(500);
                return;
            }
            /* second query (verifying friendship is in database, confirming addition) */
            let query = "SELECT friend1,friend2
                                    FROM friendship
                                    WHERE (friend1 = ? AND friend2 = ?) OR (friend1 = ? AND friend2 = ?);";
            connection.query(query,[req.body.friend1,req.body.friend2,req.body.friend2,req.body.friend1], function(error,rows,fields) {
                connected.release(); /* release connection */
                if (error) {
                    console.log(error);
                    res.sendStatus(500);
                    return;
                }
                if (rows.length > 0) {
                    res.sendStatus(200); /* successful */
                }
                else {
                    res.sendStatus(401); /* unsuccessful */
                }
            });
        });
    } else {
        res.sendStatus(400); /* bad request */
    }
});

/* JAVASCRIPT: POST request for checking if friendship exists between two users */
router.post('/checkFriends', function(req,res,next) {
    /* check if two users are in body */
    if ('friend1' in req.body && 'friend2' in req.body) {
        /* connect to database */
        req.pool.getConnection(function(error,connection){
            if (error) {
                console.log(error);
                res.sendStatus(500);
                return;
            }
        }
        /* query */
        let query = "SELECT friend1,friend2
                        FROM friendship
                        WHERE (friend1 = ? AND friend2 = ?) OR (friend1 = ? AND friend2 = ?);";
        connection.query(query,[req.body.friend1,req.body.friend2,req.body.friend2,req.body.friend1], function(error,rows,fields) {
            connected.release(); /* release connection */
            if (error) {
                console.log(error);
                res.sendStatus(500);
                return;
            }
            if (rows.length > 0) {
                res.sendStatus(200); /* successful */
            }
            else {
                res.sendStatus(401); /* unsuccessful*/
            }
        });
    } else {
        res.sendStatus(400); /* bad request */
    }
});

/* JAVASCRIPT: POST request for making a user an admin */
router.post('/makeAdmin', function(req,res,next) {
    /* check if username is in body */
    if ('user' in req.body) {
        /* connect to database */
        req.pool.getConnection(function(error,connection){
            if (error) {
                console.log(error);
                res.sendStatus(500);
                return;
            }
        }
        /* query */
        let query = "INSERT INTO administrators(user) VALUES(?);";
        connection.query(query,[req.body.user], function(error,rows,fields) {
            if (error) {
                console.log(error);
                res.sendStatus(500);
                return;
            }
            /* second query (verifying admin is in database, confirming addition) */
            let query = "SELECT user,admin_id
                            FROM administrators
                            WHERE user = ?;";
            connection.query(query,[req.body.user], function(error,rows,fields) {
                connected.release(); /* release connection */
                if (error) {
                    console.log(error);
                    res.sendStatus(500);
                    return;
                }
                if (rows.length > 0) {
                    res.sendStatus(200); /* successful */
                }
                else {
                    res.sendStatus(401); /* unsuccessful */
                }
            });
        });
    } else {
        res.sendStatus(400); /* bad request */
    }
});

/* JAVASCRIPT: POST request for checking if user is admin */
router.post('/checkAdmin', function(req,res,next) {
    /* check if user is in body */
    if ('user1' in req.body) {
        /* connect to database */
        req.pool.getConnection(function(error,connection){
            if (error) {
                console.log(error);
                res.sendStatus(500);
                return;
            }
        }
        /* query */
        let query = "SELECT user,admin_id
                        FROM administrators
                        WHERE user = ?;";
        connection.query(query,[req.body.user], function(error,rows,fields) {
            connected.release(); /* release connection */
            if (error) {
                console.log(error);
                res.sendStatus(500);
                return;
            }
            if (rows.length > 0) {
                res.sendStatus(200); /* successful */
            }
            else {
                res.sendStatus(401); /* unsuccessful*/
            }
        });
    } else {
        res.sendStatus(400); /* bad request */
    }
});