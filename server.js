const express = require("express");
const path = require("path");
const session = require("express-session");
// Our passport implementation
const passport = require("./server/db/config/passport")
// PORT and Models
const PORT = process.env.PORT || 3001;
const db = require("./server/db/db");
const models = require("./server/db/models/")
// Routes
const routes = require("./server/routes");

let app = express();


//Chat
var socket = require("socket.io");


// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

const bodyParser = require("body-parser");

app.use(express.json());

//allowing our server to keep track of the user's auth status with session
app.use(session({ secret: "keyboard cat", resave: true, saveUninitialized: true }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(passport.initialize());
app.use(passport.session());

app.use(routes);


//creates user logins
const admin = {
  email: "admin@mail.com",
  password: "password",
  name: "admin account",
  userType: "admin",
  firstLog: false
}
const advisor = {
  email: "advisor@mail.com",
  password: "password",
  name: "advisor account",
  userType: "advisor",
  firstLog: false,
  // schoolId: 99,
}
const staff = {
  email: "staff@mail.com",
  password: "password",
  name: "staff account",
  userType: "staff",
  firstLog: false,
  committeeId: 1,
}
const delegate = {
  email: "delegate@mail.com",
  password: "password",
  name: "delegate account",
  userType: "delegate",
  firstLog: false,
  schoolId: 1,
  committeeId: 1,
  country: "none"
}
const delegate2 = {
  email: "delegate2@mail.com",
  password: "password",
  name: "delegate account",
  userType: "delegate",
  firstLog: false,
  schoolId: 1,
  committeeId: 1,
  country: "none"
}
const delegate3 = {
  email: "delegate3@mail.com",
  password: "password",
  name: "delegate account",
  userType: "delegate",
  firstLog: false,
  schoolId: 1,
  committeeId: 1,
  country: "none"
}
const delegate4 = {
  email: "delegate4@mail.com",
  password: "password",
  name: "delegate account",
  userType: "delegate",
  firstLog: false,
  schoolId: 1,
  committeeId: 1,
  country: "none"
}

server = app.listen(PORT, function () {
  console.log(`🌎 ==> API server now on port ${PORT}!`);
});

io = socket(server);

io.on('connection', (socket) => {
  console.log(socket.id);

  socket.on('SEND_MESSAGE', function(data){
      io.emit('RECEIVE_MESSAGE', data);
  })
});

//When force sync is set to true it will wipe the DB and create the accounts below. If you need to 
//rest the db, change force to true and uncomment the items in the function below.
db.sync({ force: false }).then(function () {
  // models.School.create({name: "None"})
  // models.Committee.create({name: "None"})
  // models.User.create(admin).catch(err=> console.log(err))
  // models.User.create(advisor).catch(err=> console.log(err))
  // models.User.create(staff).catch(err=> console.log(err))
  // models.User.create(delegate).catch(err=> console.log(err))
  // models.User.create(delegate2).catch(err=> console.log(err))
  // models.User.create(delegate3).catch(err=> console.log(err))
  // models.User.create(delegate4).catch(err=> console.log(err))
});

// Send every request to the React app
// Define any API routes before this runs
app.get("*", function (req, res) {
  res.sendFile(path.join(__dirname, "./client/build/index.html"));
});