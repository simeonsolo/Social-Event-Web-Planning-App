# Social-Event-Web-Planning-App

RUNNING THE WORK:

1. starting the database (with a new, empty database)

-> in the root directory:
    sql_start
    mysql --host=127.0.0.1
    USE CombinedCalendars;
    DROP DATABASE CombinedCalendars;
    exit;
    mysql --host=127.0.0.1 < Database/CombinedCalendars.sql

2. starting the server

-> in the WebApp directory:
    npm start
    port 8080 for site
