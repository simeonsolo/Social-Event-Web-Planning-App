var express = require('express');
var router = express.Router();

/* POST request for signing in a user and verifying if credentials are in database */
router.post('/login', function(req,res,next) {
  /* check if username and password are in body */
  console.log(req.body)
  if ('username' in req.body && 'password' in req.body) {
      /* connect to database */
      req.pool.getConnection(function(error,connection){
          if (error) {
              console.log(error);
              res.sendStatus(500);
              return;
          }
      /* query */
      let query = "SELECT username,given_name,middle_name,last_name,email,contact_number FROM users WHERE username = ? AND password = SHA2(?,224);";
      connection.query(query,[req.body.username,req.body.password], function(error,rows,fields) {
          connection.release(); /* release connection */
          if (error) {
              console.log(error);
              res.sendStatus(500);
              return;
          }
          console.log(rows);
          if (rows.length > 0) {
              req.session.user = rows[0]; /* setting session */
              res.json(rows); /* sending back details */
          }
          else {
              res.sendStatus(401); /* bad login */
          }
      });
    });
  } else {
      res.sendStatus(400); /* bad request */
  }
});

/* POST request for signing in a user and verifying if credentials are in database */
router.post('/checkUser', function(req,res,next) {
    /* check if username and password are in body */
    console.log(req.body)
    if ('username' in req.body) {
        /* connect to database */
        req.pool.getConnection(function(error,connection){
            if (error) {
                console.log(error);
                res.sendStatus(500);
                return;
            }
        /* query */
        let query = "SELECT username FROM users WHERE username = ?;";
        connection.query(query,[req.body.username], function(error,rows,fields) {
            connection.release(); /* release connection */
            if (error) {
                console.log(error);
                res.sendStatus(500);
                return;
            }
            console.log(rows);
            if (rows.length > 0) {
                res.sendStatus(200); // sucessful
            }
            else {
                res.sendStatus(401); // unsuccessful
            }
        });
      });
    } else {
        res.sendStatus(400); /* bad request */
    }
  });

/* POST request for signing in a user VIA GITHUB ID */
router.post('/Githublogin', function(req,res,next) {
    /* check if username and password are in body */
    if ('github_id' in req.body) {
        /* connect to database */
        req.pool.getConnection(function(error,connection){
            if (error) {
                console.log(error);
                res.sendStatus(500);
                return;
            }
        /* query */
        let query = "SELECT username,github_id,given_name,middle_name,last_name,email,contact_number FROM users WHERE github_id = ?";
        connection.query(query,[req.body.github_id], function(error,rows,fields) {
            connection.release(); /* release connection */
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
    });
    } else {
        res.sendStatus(400); /* bad request */
    }
  });

/* POST request for linking github to user */
router.post('/linkGithub', function(req,res,next) {
    /* check if username and password are in body */
    if ('username' in req.body && 'password' in req.body && 'github_id' in req.body) {
        /* connect to database */
        req.pool.getConnection(function(error,connection){
            if (error) {
                console.log(error);
                res.sendStatus(500);
                return;
            }
        /* query */
        let query = `UPDATE users
                        SET github_id = ?
                        WHERE username = ? AND password = SHA2(?,224);`;
        connection.query(query,[req.body.github_id,req.body.username,req.body.password], function(error,rows,fields) {
            connection.release(); /* release connection */
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

/* POST request for signing up a user */
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
      /* first query (adding user to database) */
      let query = "INSERT INTO users (username,password,given_name,middle_name,last_name,email,contact_number) VALUES(?,SHA2(?,224),?,?,?,?,?)";
      connection.query(query,[req.body.username,req.body.password,req.body.given_name,req.body.middle_name,req.body.last_name,req.body.email,req.body.contact_number], function(error,rows,fields) {
          if (error) {
              console.log(error);
              res.sendStatus(500);
              return;
          }
          /* second query (verifying user is in database, confirming sign up) */
          let query = "SELECT username,given_name,middle_name,last_name,email,contact_number FROM users WHERE username = ? AND password = SHA2(?,224);";
          connection.query(query,[req.body.username,req.body.password], function(error,rows,fields) {
              connection.release(); /* release connection */
              if (error) {
                  console.log(error);
                  res.sendStatus(500);
                  return;
              }
              if (rows.length > 0) {
                  req.session.user = rows[0]; /* setting session */
                  res.json(rows); /* sending back details */
              }
              else {
                  res.sendStatus(401); /* unsuccessful */
              }
          });
      });
    });
  } else {
      res.sendStatus(400); /* bad request */
  }
});

/* POST request adding event to database */
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
      /* query */
      let query = `INSERT INTO events (creator,event_name,event_description,event_date,event_time,
                                      street_number,street_name,suburb,postcode,event_state,event_country)
                                      VALUES(?,?,?,?,?,?,?,?,?,?,?);`;
      connection.query(query,[req.body.creator,req.body.event_name,req.body.event_description,req.body.event_date,
                              req.body.event_time,req.body.street_number,req.body.street_name,req.body.suburb,
                              req.body.postcode,req.body.event_state,req.body.event_country], function(error,rows,fields) {
          if (error) {
              console.log(error);
              res.sendStatus(500);
              return;
          }
          /* second query (verifying event is in database, confirming addition) */
          let query = `SELECT creator,event_name
                                  FROM events
                                  WHERE creator = ? AND event_name = ?;`;
          connection.query(query,[req.body.creator,req.body.event_name], function(error,rows,fields) {
              connection.release(); /* release connection */
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
    });
  } else {
      res.sendStatus(400); /* bad request */
  }
});

/* POST request for returning events user has created */
router.post('/getCreatedEvents', function(req,res,next) {
    /* check if event name is in body */
    if ('username' in req.body) {
        /* connect to database */
        req.pool.getConnection(function(error,connection){
            if (error) {
                console.log(error);
                res.sendStatus(500);
                return;
            }
        /* query */
        let query = `SELECT creator,event_name,event_description,event_date,event_time,street_number,street_name,suburb,postcode,event_state,event_country
                                FROM events
                                WHERE creator = ?;`;
        connection.query(query,[req.body.username], function(error,rows,fields) {
            connection.release(); /* release connection */
            if (error) {
                console.log(error);
                res.sendStatus(500);
                return;
            }
            if (rows.length > 0) {
                res.json(rows); /* event/s found, return event info */
            }
            else {
                res.sendStatus(401); /* no events exist */
            }
        });
      });
    } else {
        res.sendStatus(400); /* bad request */
    }
  });

  /* POST request for returning events user has been invited to */
router.post('/getInvitedEvents', function(req,res,next) {
    /* check if event name is in body */
    if ('username' in req.body) {
        /* connect to database */
        req.pool.getConnection(function(error,connection){
            if (error) {
                console.log(error);
                res.sendStatus(500);
                return;
            }
        /* query */
        let query = `SELECT creator,events.event_name,event_description,event_date,event_time,street_number,street_name,suburb,postcode,event_state,event_country
                                FROM events
                                INNER JOIN event_invite
                                ON events.event_name = event_invite.event_name
                                WHERE event_invite.invited_guest = ?`;
        connection.query(query,[req.body.username], function(error,rows,fields) {
            connection.release(); /* release connection */
            if (error) {
                console.log(error);
                res.sendStatus(500);
                return;
            }
            if (rows.length > 0) {
                res.json(rows); /* event/s found, return event info */
            }
            else {
                res.sendStatus(401); /* no events exist */
            }
        });
      });
    } else {
        res.sendStatus(400); /* bad request */
    }
  });

/* POST request for retrieving event details from database */
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
      /* query */
      let query = `SELECT creator,event_name,event_description,event_date,event_time,street_number,street_name,suburb,postcode,event_state,event_country
                              FROM events
                              WHERE event_name = ?;`;
      connection.query(query,[req.body.event_name], function(error,rows,fields) {
          connection.release(); /* release connection */
          if (error) {
              console.log(error);
              res.sendStatus(500);
              return;
          }
          if (rows.length > 0) {
              res.json(rows); /* return event info */
              //res.sendStatus(200); /* successful search */
          }
          else {
              res.sendStatus(401); /* bad search, does not exist */
          }
      });
    });
  } else {
      res.sendStatus(400); /* bad request */
  }
});

/* POST request for creating an event invite */
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
      /* query */
      let query = "INSERT INTO event_invite(event_name,invited_guest) VALUES(?,?);";
      connection.query(query,[req.body.event_name,req.body.invited_guest], function(error,rows,fields) {
          if (error) {
              console.log(error);
              res.sendStatus(500);
              return;
          }
          /* second query (verifying invite is in database, confirming addition) */
          let query = `SELECT event_name,invited_guest
                                  FROM event_invite
                                  WHERE event_name = ? AND invited_guest = ?;`;
          connection.query(query,[req.body.event_name,req.body.invited_guest], function(error,rows,fields) {
              connection.release(); /* release connection */
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
    });
  } else {
      res.sendStatus(400); /* bad request */
  }
});

/* POST request for user accepting invite (no need to decline invite, default response is decline) */
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
      /* query */
      let query = `UPDATE event_invite
                      SET response = 1
                      WHERE event_name = ? AND invited_guest = ?;`;
      connection.query(query,[req.body.event_name,req.body.invited_guest], function(error,rows,fields) {
        connection.release(); /* release connection */
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

/* POST request for verifying if user is invited to named event */
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
      /* query */
      let query = `SELECT event_name,invited_guest
                              FROM event_invite
                              WHERE event_name = ? AND invited_guest = ?;`;
      connection.query(query,[req.body.event_name,req.body.invited_guest], function(error,rows,fields) {
          connection.release(); /* release connection */
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
    });
  } else {
      res.sendStatus(400); /* bad request */
  }
});

/* POST request for creating friendship between two users */
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
      /* query */
      let query = "INSERT INTO friendship(friend1,friend2) VALUES(?,?);";
      connection.query(query,[req.body.friend1,req.body.friend2], function(error,rows,fields) {
          if (error) {
              console.log(error);
              res.sendStatus(500);
              return;
          }
          /* second query (verifying friendship is in database, confirming addition) */
          let query = `SELECT friend1,friend2
                                  FROM friendship
                                  WHERE (friend1 = ? AND friend2 = ?) OR (friend1 = ? AND friend2 = ?);`;
          connection.query(query,[req.body.friend1,req.body.friend2,req.body.friend2,req.body.friend1], function(error,rows,fields) {
              connection.release(); /* release connection */
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
    });
  } else {
      res.sendStatus(400); /* bad request */
  }
});

/* POST request for checking if friendship exists between two users */
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
      /* query */
      let query = `SELECT friend1,friend2
                      FROM friendship
                      WHERE (friend1 = ? AND friend2 = ?) OR (friend1 = ? AND friend2 = ?);`;
      connection.query(query,[req.body.friend1,req.body.friend2,req.body.friend2,req.body.friend1], function(error,rows,fields) {
          connection.release(); /* release connection */
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
      /* query */
      let query = "INSERT INTO administrators(user) VALUES(?);";
      connection.query(query,[req.body.user], function(error,rows,fields) {
          if (error) {
              console.log(error);
              res.sendStatus(500);
              return;
          }
          /* second query (verifying admin is in database, confirming addition) */
          let query = `SELECT user,admin_id
                          FROM administrators
                          WHERE user = ?;`;
          connection.query(query,[req.body.user], function(error,rows,fields) {
              connection.release(); /* release connection */
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
    });
  } else {
      res.sendStatus(400); /* bad request */
  }
});

/* POST request for checking if user is admin */
router.post('/checkAdmin', function(req,res,next) {
  /* check if user is in body */
  if ('user' in req.body) {
      /* connect to database */
      req.pool.getConnection(function(error,connection){
          if (error) {
              console.log(error);
              res.sendStatus(500);
              return;
          }
      /* query */
      let query = `SELECT user,admin_id
                      FROM administrators
                      WHERE user = ?;`;
      connection.query(query,[req.body.user], function(error,rows,fields) {
          connection.release(); /* release connection */
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
    });
  } else {
      res.sendStatus(400); /* bad request */
  }
});

// GITHUB AUTHENTICATION

var passport = require('passport');
var GitHubStrategy = require('passport-github2').Strategy;

var GITHUB_CLIENT_ID = "12dd30705dca3a6d60b4";
var GITHUB_CLIENT_SECRET = "17a92b641dd0b8f20cefc766e359907853dc94d5";

// Use the GitHubStrategy within Passport.
//   Strategies in Passport require a `verify` function, which accept
//   credentials (in this case, an accessToken, refreshToken, and GitHub
//   profile), and invoke a callback with a user object.
passport.use(new GitHubStrategy({
  clientID: GITHUB_CLIENT_ID,
  clientSecret: GITHUB_CLIENT_SECRET,
  callbackURL: "https://group-project123-code50-104477936-wrjj57pjg35r7-8080.githubpreview.dev/githubsignin/callback"
},
function(accessToken, refreshToken, profile, done) {
  // asynchronous verification, for effect...
  process.nextTick(function () {

    // To keep the example simple, the user's GitHub profile is returned to
    // represent the logged-in user.  In a typical application, you would want
    // to associate the GitHub account with a user record in your database,
    // and return that user instead.
    return done(null, profile);
  });
}
));

router.get('/githubsignin', passport.initialize(), passport.authenticate('github', { scope: [ 'user:email' ], session: false }), function(req, res){ console.log('here') });

router.get('/githubsignin/callback', passport.initialize(), passport.authenticate('github', { failureRedirect: '/loginfailed.html', session: false }), function(req, res, next) {
  // successful login
  // req.user contains login details
  req.session.githubId = req.user.id;
  res.redirect('/');
});



// NODEMAILER
const nodemailer = require("nodemailer");

// async..await is not allowed in global scope, must use a wrapper
async function nodemailerMain(From, To, Subject, Text, Html) {
  // Generate test SMTP service account from ethereal.email
  // Only needed if you don't have a real mail account for testing
  let testAccount = await nodemailer.createTestAccount();

  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: testAccount.user, // generated ethereal user
      pass: testAccount.pass, // generated ethereal password
    },
  });

  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: From, // sender address
    to: To, // list of receivers
    subject: Subject, // Subject line
    text: Text, // plain text body
    html: Html, // html body
  });

  console.log("Message sent: %s", info.messageId);
  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

  // Preview only available when sending through an Ethereal account
  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
  // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
}

// Use to create mail
let mailInfo = {
    from: '"Combined Calendars" <CombinedCalendars@adelaide.edu.au>',
    to: 'test@hotmail.com',
    subject: "You are invited to a CC Event",
    text: "Please click on the link to accept this invite",
    html: "<b>HTML</b>",
}

nodemailerMain(mailInfo.from, mailInfo.to, mailInfo.subject, mailInfo.text, mailInfo.html).catch(console.error);



/* GET home page. */
router.get('/', function(req, res, next) {
  console.log('here', req.session.githubId);
  res.render('index', { title: 'Express' });
});

module.exports = router;

