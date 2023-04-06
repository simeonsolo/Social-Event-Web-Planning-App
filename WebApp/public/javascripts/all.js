/* function for logging in user */
function login(Username, Password) {
    /* obtain inputs */
    let user = {
        username: Username,
        password: Password,
    }
    /* send POST request */
    let xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            /* login success */
            b.ErrorMsgLogin = '';
            b.loginResponseFunc(JSON.parse(this.responseText));
        }
        else if (this.readyState == 4 && this.status >= 400) {
            /* login fail */
            //alert("Invalid username or password.");
            b.ErrorMsgLogin='Invalid username or password';
            b.User.Password='';
        }
    };
    xhttp.open("POST", "/login", true);
    xhttp.setRequestHeader("Content-type", "application/json");
    xhttp.send(JSON.stringify(user));
}

/* function that sends back all events specified user has created */
function getCreatedEvents(Username) {
    /* obtain inputs */
    let user = {
        username: Username
    }
    /* send POST request */
    let xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            /* user has created events */
            b.UsersCreatedEvents = JSON.parse(this.responseText);

            /* call function here ? */
        }
        else if (this.readyState == 4 && this.status >= 400) {
            /* user has not created any events */
        }
    };
    xhttp.open("POST", "/getCreatedEvents", true);
    xhttp.setRequestHeader("Content-type", "application/json");
    xhttp.send(JSON.stringify(user));
}

/* function that sends back all events specified user is invited to */
function getInvitedEvents(Username) {
    /* obtain inputs */
    let user = {
        username: Username
    }
    /* send POST request */
    let xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            /* user is invited to event/s */
            events = JSON.parse(this.responseText);
            /* call function here ? */
        }
        else if (this.readyState == 4 && this.status >= 400) {
            /* user is not invited to any events */
        }
    };
    xhttp.open("POST", "/getInvitedEvents", true);
    xhttp.setRequestHeader("Content-type", "application/json");
    xhttp.send(JSON.stringify(user));
}

/* function for checking if username is in database */
function checkUser(Username) {
    /* obtain inputs */
    let user = {
        username: Username
    }
    /* send POST request */
    let xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            /* does exist in database*/
            b.UsernameUsed = true;
            b.UsernameValid='Username in use';
        }
        else if (this.readyState == 4 && this.status >= 400) {
            /* does not exist in database */
           b.UsernameUsed = false;
           b.UsernameValid='Username available';
        }
    };
    xhttp.open("POST", "/checkUser", true);
    xhttp.setRequestHeader("Content-type", "application/json");
    xhttp.send(JSON.stringify(user));
}

/* function for logging in user via github */
function Githublogin() {
    /* obtain inputs */
    let user = {
        github_id: document.getElementsByName('github_id')[0].value
    }
    /* send POST request */
    let xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            /* login success */
            alert("Login Successful");
        }
        else if (this.readyState == 4 && this.status >= 400) {
            /* login fail */
            alert("Login Unsuccessful");

        }
    };
    xhttp.open("POST", "/Githublogin");
    xhttp.setRequestHeader("Content-type", "application/json");
    xhttp.send(JSON.stringify(user));
}

/* function for linking github id to user */
function linkGithub() {
    /* obtain inputs */
    let user = {
        username: document.getElementsByName('username')[0].value,
        password: document.getElementsByName('password')[0].value,
        github_id: document.getElementsByName('github_id')[0].value
    }
    /* send POST request */
    let xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            /* login success */
            alert("Successful link");
        }
        else if (this.readyState == 4 && this.status >= 400) {
            /* login fail */
            alert("Unsuccessful");

        }
    };
    xhttp.open("POST", "/linkGithub");
    xhttp.setRequestHeader("Content-type", "application/json");
    xhttp.send(JSON.stringify(user));
}

/* function for signing up user */
function signup(Username, Password, Given_Name, Middle_Name, Last_Name, Email, Contact_Number) {
    /* obtain inputs */
    let user = {
        username: Username,
        password: Password,
        given_name: Given_Name,
        middle_name: Middle_Name,
        last_name: Last_Name,
        email: Email,
        contact_number: Contact_Number,
    }
    /* send POST request */
    let xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            /* signup success */
            b.signupResponseFunc(JSON.parse(this.responseText));
        } else if (this.readyState == 4 && this.status >= 400) {
            /* signup fail */
            alert("Signup Unsuccessful");
        }
    };
    xhttp.open("POST", "/signup");
    xhttp.setRequestHeader("Content-type", "application/json");
    xhttp.send(JSON.stringify(user));
}

/* function for adding event to database */
function addEvent(Creator, Name, Description, Date, Time, Street_Number, Street_Name, Suburb, Postcode, State, Country) {
    /* obtain inputs */
    let event = {
        creator: Creator,
        event_name: Name,
        event_description: Description,
        event_date: Date,
        event_time: Time,
        street_number: Street_Number,
        street_name: Street_Name,
        suburb: Suburb,
        postcode: Postcode,
        event_state: State,
        event_country: Country,
    }
    /* send POST request */
    let xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            /* success */
            b.addEventResponseFunc(JSON.parse(this.responseText));
        } else if (this.readyState == 4 && this.status >= 400) {
            /* fail */
            alert("Event addition Unsuccessful");
        }
    };
    xhttp.open("POST", "/addEvent");
    xhttp.setRequestHeader("Content-type", "application/json");
    xhttp.send(JSON.stringify(event));
}

/* function for searching event name and receiving event details */
function getEvent(Event_Name) {
    /* obtain inputs */
    let event = {
        event_name: Event_Name
    }
    /* send POST request */
    let xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            /* success */
            event_info = JSON.parse(this.responseText); /* holds all event information, decide what to do with this? */
            alert("Event search Successful");
        } else if (this.readyState == 4 && this.status >= 400) {
            /* fail */
            alert("Event search Unsuccessful");
        }
    };
    xhttp.open("GET", "/getEvent");
    xhttp.setRequestHeader("Content-type", "application/json");
    xhttp.send(JSON.stringify(event));
}

/* function for sending event invite */
function sendInvite(Event_Name, Invited_Guest) {
    /* obtain inputs */
    let invite = {
        event_name: Event_Name,
        invited_guest: Invited_Guest
    }
    /* send POST request */
    let xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            /* success */
            alert("Event invite sent");
        } else if (this.readyState == 4 && this.status >= 400) {
            /* fail */
            alert("Event invite failed");
        }
    };
    xhttp.open("POST", "/sendInvite");
    xhttp.setRequestHeader("Content-type", "application/json");
    xhttp.send(JSON.stringify(invite));
}

/* function for user to accept invite */
function acceptInvite(Event_Name, Invited_Guest) {
    /* obtain inputs */
    let invite = {
        event_name: Event_Name,
        invited_guest: Invited_Guest
    }
    /* send POST request */
    let xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            /* success */
            alert("Event invite accepted");
        } else if (this.readyState == 4 && this.status >= 400) {
            /* fail */
            alert("Event invite failed. Must not be invited");
        }
    };
    xhttp.open("POST", "/acceptInvite");
    xhttp.setRequestHeader("Content-type", "application/json");
    xhttp.send(JSON.stringify(invite));
}

/* function for checking if specified user is invited to specified event */
function checkInvited(Event_Name, Invited_Guest) {
    /* obtain inputs */
    let invite = {
        event_name: Event_Name,
        invited_guest: Invited_Guest
    }
    /* send POST request */
    let xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            /* success */
            alert("You are invited to this event");
        } else if (this.readyState == 4 && this.status >= 400) {
            /* fail */
            alert("You are not invited to this event");
        }
    };
    xhttp.open("POST", "/checkInvited");
    xhttp.setRequestHeader("Content-type", "application/json");
    xhttp.send(JSON.stringify(invite));
}

/* function for creating friendship between two users */
function createFriend(Friend1, Friend2) {
    /* obtain inputs */
    let friendship = {
        friend1: Friend1,
        friend2: Friend2
    }
    /* send POST request */
    let xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            /* success */
            alert("Friendship created!");
        } else if (this.readyState == 4 && this.status >= 400) {
            /* fail */
            alert("Friendship creation failed");
        }
    };
    xhttp.open("POST", "/createFriend");
    xhttp.setRequestHeader("Content-type", "application/json");
    xhttp.send(JSON.stringify(friendship));
}

/* function for checking if friendship exists between two users */
function checkFriends(Friend1, Friend2) {
    /* obtain inputs */
    let friendship = {
        friend1: Friend1,
        friend2: Friend2
    }
    /* send POST request */
    let xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            /* success */
            alert("Friendship exists!");
        } else if (this.readyState == 4 && this.status >= 400) {
            /* fail */
            alert("Friendship does not exist!");
        }
    };
    xhttp.open("POST", "/checkFriends");
    xhttp.setRequestHeader("Content-type", "application/json");
    xhttp.send(JSON.stringify(friendship));
}

/* function for making a user an admin */
function makeAdmin(User) {
    /* obtain inputs */
    let administrator = {
        user: User
    }
    /* send POST request */
    let xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            /* success */
            alert("Administrator created");
        } else if (this.readyState == 4 && this.status >= 400) {
            /* fail */
            alert("Administrator creation failed");
        }
    };
    xhttp.open("POST", "/makeAdmin");
    xhttp.setRequestHeader("Content-type", "application/json");
    xhttp.send(JSON.stringify(administrator));
}

/* function for checking if user is an admin */
function checkAdmin(User) {
    /* obtain inputs */
    let administrator = {
        user: User
    }
    /* send POST request */
    let xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            /* success */
            alert("User is administrator");
        } else if (this.readyState == 4 && this.status >= 400) {
            /* fail */
            alert("User is not administrator");
        }
    };
    xhttp.open("POST", "/checkAdmin");
    xhttp.setRequestHeader("Content-type", "application/json");
    xhttp.send(JSON.stringify(administrator));
}

const Page = [
    { name:'MainNL', num:1, index:0},
    { name:'SignUp', num:2 },
    { name:'SignIn', num:3 },
    { name:'MyAccount', num:4 },
    { name:'ViewEvents', num:5, index: 4},
    { name:'CreateEvents', num:6, index: 5},
    { name:'AdminPage', num:7},
    { name:'Calendar', num:8, index: 7}
];

var b = new Vue({
    el: '#app',
    data: {
        log: false,
        newy: true,
        Shake: false,
        admin: false,
        valid: false,
        UsersCreatedEvents: [],
        UsernameUsed: false,
        PageArray: Page,
        EditAcc: false,
        ShowPass: false,
        User: {
            Email: '',
            Phone: '',
            Password: '',
            FirstName: '',
            MiddleName: '',
            LastName: '',
            Username: '',
            GithubID: '',
        },
        EmailRules: [v => !!v || "Email is required", v => !v || /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) || 'Please enter a valid email'],
        PhoneRules: [v => !!v || "Phone number is required", v=> !v || /^[0-9]{8,10}$/.test(v) || "Please enter a valid phone number"],
        ConPassword: '',
        PasswordRules: [v => !!v || "Password is required", v=> v.length >=6 || "Password must be atleast 6 characters"],
        ErrorMsgLogin:'',
        ErrorMsgSignup:'',
        ErrorMsgEvents:'',
        UsernameValid:'',
        NameRules: [v => !!v || "Name is required", v => v.length < 64 || "Must be less than 64 chars"],
        UsernameRules: [v=> !!v || "Username is required"],
        CurrentPage: Page[0],
        EventValid: false,
        TodaysDate: new Date().toISOString().substr(0, 10),
        SignupAccept: true,
        EventAccept: true,
        Event: {
            Title: '',
            Description: '',
            Street: '',
            StreetNumber: '',
            Suburb: '',
            Postcode: '',
            State: '',
            Country: '',
            StartTime: '00:00',
            EndTime: '01:00',
            SelectedEventDates: [new Date().toISOString().substr(0, 10)],
        },
        EventRules: {
            Title: [v => !!v || "Title is required", v => v.length < 64 || "Must be less than 64 chars"],
            Description: [v => !!v || "Description is required", v => v.length < 256 || "Must be less than 256 chars"],
            StreetNumber: [v => !!v || "Street number is required", v  => !v || /^[0-9]{1,6}$/.test(v) || 'Number has to be between 0 and 999999'],
            Street: [v => !!v || "Street is required", v => v.length < 64 || "Must be less than 64 chars"],
            Suburb: [v => !!v || "Suburb is required", v => v.length < 32 || "Must be less than 32 chars"],
            Postcode: [v => !!v || "Postcode is required", v => !v || /^[0-9]{1,16}$/.test(v) || "Must be a number less then 16 digits long"],
            State: [v => !!v || "State is required", v => v.length < 64 || "Must be less than 64 chars"],
            Country: [v => !!v || "Country is required", v => v.length < 32 || "Must be less than 32 chars"],
        },
        googleCalendarEvents: [],
        MyEvents: [],
        loginResponse: '',
    },
    methods: {
        ChangeShake() {
            this.Shake = true;
            setTimeout(() => {this.Shake = false}, 700)
        },
        AddEvents() {
            let cloneEvent = JSON.parse(JSON.stringify(this.Event));
            this.MyEvents.push(cloneEvent);
            if(this.CurrentPage.num == 6)
            {
            console.log(this.Event.SelectedEventDates[0]);
            addEvent(this.User.Username, this.Event.Title, this.Event.Description, this.Event.SelectedEventDates[0], this.Event.StartTime, this.Event.StreetNumber, this.Event.Street, this.Event.Suburb, this.Event.Postcode, this.Event.State, this.Event.Country);
            this.clearEvent()
            }
        },
        Usernamecheck()
        {

            checkUser(this.User.Username);
        },
        addEventResponseFunc(input) {
            console.log('event', input);
            this.Event = {
                Title: '',
                Description: '',
                StreetNumber: '',
                Street: '',
                Suburb: '',
                Postcode: '',
                State: '',
                Country: '',
                StartTime: '00:00',
                EndTime: '00:00',
                SelectedEventDates: [Date().toISOString().substr(0, 10)],
            };
            this.CurrentPage = this.PageArray[4];
        },
        validateLogin() {
            ErrorMsgLogin = '';
            login(this.User.Username, this.User.Password);
        },
        loginResponseFunc(input) {
            if (input) {
                this.User.Username = input[0].username;

                this.User.FirstName = input[0].given_name;
                this.User.MiddleName = input[0].middle_name;
                this.User.LastName = input[0].last_name;
                this.User.Email = input[0].email;
                this.User.Phone = input[0].contact_number;
                this.log = true;
                this.CurrentPage = this.PageArray[0];

                getCreatedEvents(this.User.Username);
                newy=true;
            }
        },
        ViewAndCreateEvents()
        {
            this.CurrentPage = this.PageArray[4];
            console.log(this.UsersCreatedEvents);
            let i;
            if (false){
            for(i =0;i<this.UsersCreatedEvents.length;i++){
            this.Event.Title = this.UsersCreatedEvents[i].event_name;
            this.Event.Description = this.UsersCreatedEvents[i].event_description;
            this.Event.StreetNumber = this.UsersCreatedEvents[i].street_number;
            this.Event.Suburb = this.UsersCreatedEvents[i].suburb;
            this.Event.Postcode = this.UsersCreatedEvents[i].postcode;
            this.Event.Street = this.UsersCreatedEvents[i].street_name;
            this.Event.State = this.UsersCreatedEvents[i].event_state;
            this.Event.Country = this.UsersCreatedEvents[i].event_country;
            this.Event.StartTime = this.UsersCreatedEvents[i].event_time;
            this.Event.SelectedEventDates = this.UsersCreatedEvents[i].event_date;
            this.AddEvents()
            }}
            this.clearEvent()
            newy=false;
        },
        clearEvent(){
            this.Event.Title= '';
            this.Event.Description= '';
            this.Event.Street= '';
            this.Event.StreetNumber= '';
            this.Event.Suburb= '';
            this.Event.Postcode= '';
            this.Event.State= '';
            this.Event.Country= '';
            this.Event.StartTime= '00:00';
            this.Event.EndTime= '01:00';
            this.Event.SelectedEventDates=[new Date().toISOString().substr(0, 10)];
        },
        validateGithubLogin() {
            Githublogin(this.User.GithubID);
        },
        githubLoginResponseFunc(input) {
            if (input) {
                this.User.Username = input[0].username;
                this.User.FirstName = input[0].given_name;
                this.User.MiddleName = input[0].middle_name;
                this.User.LastName = input[0].last_name;
                this.User.Email = input[0].email;
                this.User.Phone = input[0].contact_number;
                this.log = true;
                this.CurrentPage = this.PageArray[0];
                newy=true;
            }
        },
        validateSignup() {
            this.ErrorMsgSignup='';
            this.SignupAccept = true;
            if (this.UsernameUsed)
            {
                this.SignupAccept = false;
            }
            if((!(/^[a-zA-Z].{0,63}$/).test(this.User.FirstName))) // first name is only letters and less then 64 characters
            {
                this.ErrorMsgSignup=this.ErrorMsgSignup + 'First name is invalid \n ';
                this.SignupAccept = false;
            }
            if((!(/^[a-zA-Z].{0,63}$/).test(this.User.MiddleName))) // middle name is only letters and less then 64 characters
            {
                this.ErrorMsgSignup=this.ErrorMsgSignup + 'Middle name is invalid \n ';
                this.SignupAccept = false;
            }
            if((!(/^[a-zA-Z].{0,63}$/).test(this.User.LastName))) // last name is only letters and less then 64 characters
            {
                this.ErrorMsgSignup=this.ErrorMsgSignup + 'Last name is invalid \n ';
                this.SignupAccept = false;
            }
            if (!(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3}).{0,255}$/.test(this.User.Email))) // email is valid and is less then 256 characters
            {
                this.ErrorMsgSignup=this.ErrorMsgSignup + 'Email is invalid \n ';
                this.SignupAccept = false;
            }
            if(!(/^[0-9]{8,10}$/.test(this.User.Phone))) // phone number is only numbers and is between 8 and 10 characters
            {
                this.ErrorMsgSignup=this.ErrorMsgSignup + 'Phone number is invalid \n ';
                this.SignupAccept = false;
            }
            if (!(/^(?=).{1,63}$/.test(this.User.Username))) // username is between 1 and 64 characters
            {
                this.ErrorMsgSignup=this.ErrorMsgSignup + 'Username is invalid \n ';
                this.SignupAccept = false;
            }
            if (this.User.Password != this.ConPassword) // checks that confirmation passowrd is the same as the main password
            {
                this.ErrorMsgSignup=this.ErrorMsgSignup + 'Passwords don\'t match \n ';
                this.User.Password='';
                this.ConPassword='';
                this.SignupAccept = false;
            }
            if (!(/^(?=).{6,63}$/.test(this.User.Password))) // checks that the password is between 6 and 64 characters
            {
                this.ErrorMsgSignup=this.ErrorMsgSignup + 'Password is invalid \n ';
                this.User.Password='';
                this.ConPassword='';
                this.SignupAccept = false;
            }
            if(this.SignupAccept && this.CurrentPage.num === 2)
            {
                signup(this.User.Username, this.User.Password, this.User.FirstName, this.User.MiddleName, this.User.LastName, this.User.Email, this.User.Phone);
                this.ConPassword='';
                newy=true;
            }
            if(this.SignupAccept && this.CurrentPage.num === 4)
            {
                //this is for the my account page
                this.EditAcc = false;
                this.ConPassword='';
            }
        },
        ValidateEvent()
        {
            this.ErrorMsgEvents='';
            this.EventAccept=true;
            if (!(/^(?=).{1,63}$/.test(this.Event.Title)))
            {
                this.ErrorMsgEvents=this.ErrorMsgEvents + 'Title invalid \n ';
                this.EventAccept = false;
            }
            if (!(/^(?=).{1,255}$/.test(this.Event.Description)))
            {
                this.ErrorMsgEvents=this.ErrorMsgEvents + 'Description invalid \n ';
                this.EventAccept = false;
            }
            if (!(/^[0-9].{0,7}$/.test(this.Event.StreetNumber)))
            {
                this.ErrorMsgEvents=this.ErrorMsgEvents + 'Street number invalid \n ';
                this.EventAccept = false;
            }
            if (!(/^[a-zA-Z].{0,63}$/.test(this.Event.Street)))
            {
                this.ErrorMsgEvents=this.ErrorMsgEvents + 'Street invalid \n ';
                this.EventAccept = false;
            }
            if (!(/^[a-zA-Z].{0,31}$/.test(this.Event.Suburb)))
            {
                this.ErrorMsgEvents=this.ErrorMsgEvents + 'Suburb invalid \n ';
                this.EventAccept = false;
            }
            if (!(/^[0-9].{0,16}$/.test(this.Event.Postcode)))
            {
                this.ErrorMsgEvents=this.ErrorMsgEvents + 'Postcode invalid \n ';
                this.EventAccept = false;
            }
            if (!(/^[a-zA-Z].{0,63}$/.test(this.Event.State)))
            {
                this.ErrorMsgEvents=this.ErrorMsgEvents + 'State invalid \n ';
                this.EventAccept = false;
            }
            if (!(/^[a-zA-Z].{0,31}$/.test(this.Event.Country)))
            {
                this.ErrorMsgEvents=this.ErrorMsgEvents + 'Country invalid \n ';
                this.EventAccept = false;
            }



            if (this.EventAccept)
            {
                this.AddEvents();
            }
        },
        ToMyAccount()
        {
            this.CurrentPage = this.PageArray[3];
            this.EditAcc = false;
            this.ErrorMsgSignup='';

        },
        signupResponseFunc(input) {
            if (input) {
                this.log = true;
                this.CurrentPage = this.PageArray[0];
            }
        },
        validateLogout() {
            Object.keys(this.User).forEach(key => {
                this.User[key] = '';
              });
            this.log = false;
            this.CurrentPage = this.PageArray[0];
        },
    },
    watcher: {
        CurrentPage() {
            if (CurrentPage.num === 5) {
                // Get Events and display them
            }
        }
    },
    vuetify: new Vuetify(),
    components: { 'vue-cal': vuecal },
    computed: {
        multipleDatesSelected() {
            if (this.Event.SelectedEventDates.length > 1) {
                return true;
            } else {
                return false;
            }
        },
    },
});
